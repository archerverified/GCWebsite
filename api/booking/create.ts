import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendAdminBookingEmail, sendCustomerBookingEmail, type BookingPayload } from '../_lib/email';
import { forwardToGoHighLevel } from '../_lib/ghl';

/**
 * Booking Creation Endpoint
 *
 * Receives form submissions from the homepage booking form,
 * validates the data, and creates a Google Calendar event.
 *
 * Environment Variables Required:
 * - GOOGLE_OAUTH_CLIENT_ID
 * - GOOGLE_OAUTH_CLIENT_SECRET
 * - GOOGLE_REFRESH_TOKEN
 *
 * Optional:
 * - GOOGLE_CALENDAR_ID (defaults to "primary")
 * - GHL_WEBHOOK_URL / GHL_WEBHOOK_SECRET (see ../_lib/ghl.ts; unset means no CRM forward)
 */

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_CALENDAR_API = 'https://www.googleapis.com/calendar/v3/calendars';

interface BookingRequest {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  zipCode?: string;
  message?: string;
  /** A2P/10DLC consent record captured by the booking form. */
  smsConsent?: boolean;
  consentText?: string;
  consentTimestamp?: string;
  /** Which page/channel produced this booking, e.g. "website" or "google-ads". */
  source?: string;
}

interface ValidationErrors {
  [key: string]: string;
}

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

// Valid 15-minute time slots (8:00 AM to 8:00 PM), stored as HH:MM (24h)
const VALID_TIME_SLOTS = (() => {
  const startMinutes = 8 * 60;
  const endMinutes = 20 * 60;
  const step = 15;

  const slots: string[] = [];
  for (let mins = startMinutes; mins <= endMinutes; mins += step) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    slots.push(`${pad2(h)}:${pad2(m)}`);
  }
  return slots;
})();

function validateRequest(body: Partial<BookingRequest>): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!body.name?.trim()) {
    errors.name = 'Name is required';
  }

  if (!body.phone?.trim()) {
    errors.phone = 'Phone number is required';
  }

  if (!body.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!body.date?.trim()) {
    errors.date = 'Preferred date is required';
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date)) {
    errors.date = 'Date must be in YYYY-MM-DD format';
  }

  if (!body.time?.trim()) {
    errors.time = 'Preferred time is required';
  } else {
    // Normalize time to HH:MM format
    const normalizedTime = body.time.substring(0, 5);
    if (!VALID_TIME_SLOTS.includes(normalizedTime)) {
      errors.time = 'Time must be a 15-minute interval between 08:00 and 20:00 (e.g., 08:00, 08:15, 08:30)';
    }
  }

  // The form requires SMS consent before it will submit, so the server enforces the same
  // rule. Anything reaching here without it is not a booking we have a consent record for.
  if (body.smsConsent !== true) {
    errors.smsConsent = 'Please agree to receive text messages about your appointment';
  }

  return errors;
}

/** Best-effort client IP for the consent record. Vercel populates x-forwarded-for. */
function clientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return raw?.split(',')[0]?.trim() ?? '';
}

/**
 * Reduce a client-supplied source to a short, safe slug before it reaches the calendar
 * description or the CRM. This value is attacker-controllable, so it is never trusted
 * verbatim: anything unexpected collapses to the default rather than being rejected,
 * because a weird source label must not cost the customer their booking.
 */
function normalizeSource(raw: unknown): string {
  if (typeof raw !== 'string') return 'website';
  const slug = raw.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 32);
  return slug || 'website';
}

function combineDateAndTime(date: string, time: string): string {
  // Normalize time to HH:MM
  const normalizedTime = time.substring(0, 5);
  // Create ISO string in America/Chicago timezone
  // We'll create the date string and let Google handle timezone conversion
  return `${date}T${normalizedTime}:00`;
}

function addMinutes(dateTimeStr: string, minutes: number): string {
  const date = new Date(dateTimeStr);
  date.setMinutes(date.getMinutes() + minutes);
  return date.toISOString().replace('Z', '').substring(0, 19);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'method_not_allowed',
      message: 'Only POST requests are allowed',
    });
  }

  // Parse request body
  const body = req.body as Partial<BookingRequest>;

  // Validate request
  const validationErrors = validateRequest(body);
  if (Object.keys(validationErrors).length > 0) {
    return res.status(400).json({
      error: 'validation_failed',
      message: 'Please correct the errors below',
      fields: validationErrors,
    });
  }

  // Captured once, used in both the calendar consent record and the CRM forward.
  const consentIp = clientIp(req);
  const bookingSource = normalizeSource(body.source);

  // Get environment variables
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

  // Validate env vars
  const missingVars: string[] = [];
  if (!clientId) missingVars.push('GOOGLE_OAUTH_CLIENT_ID');
  if (!clientSecret) missingVars.push('GOOGLE_OAUTH_CLIENT_SECRET');
  if (!refreshToken) missingVars.push('GOOGLE_REFRESH_TOKEN');

  if (missingVars.length > 0) {
    return res.status(500).json({
      error: 'config_error',
      message: 'Booking system is not configured. Please contact support.',
    });
  }

  try {
    // Exchange refresh token for access token
    const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    if (!tokenResponse.ok) {
      return res.status(500).json({
        error: 'auth_error',
        message: 'Failed to authenticate with calendar service. Please try again later.',
      });
    }

    const tokenData = await tokenResponse.json() as { access_token: string };
    const accessToken = tokenData.access_token;

    // Build event datetime strings
    const startDateTime = combineDateAndTime(body.date!, body.time!);
    const endDateTime = addMinutes(startDateTime, 30);

    // Create calendar event
    const eventBody = {
      summary: `Garage Cowboy Inspection - ${body.name}`,
      description: `
Booking Details:
────────────────
Name: ${body.name}
Phone: ${body.phone}
Email: ${body.email}
Zip Code: ${body.zipCode || 'N/A'}

Message:
${body.message || 'No message provided'}

────────────────
SMS Consent: GRANTED${body.consentTimestamp ? ` at ${body.consentTimestamp}` : ''}${consentIp ? ` from ${consentIp}` : ''}
${body.consentText || ''}

────────────────
Booked via garagecowboy.com
Source: ${bookingSource}
      `.trim(),
      start: {
        dateTime: startDateTime,
        timeZone: 'America/Chicago',
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'America/Chicago',
      },
      attendees: [
        { email: body.email },
        { email: 'deno@garagecowboy.com' },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };

    const calendarUrl = `${GOOGLE_CALENDAR_API}/${encodeURIComponent(calendarId)}/events?sendUpdates=all`;

    const eventResponse = await fetch(calendarUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventBody),
    });

    if (!eventResponse.ok) {
      const errorStatus = eventResponse.status;
      let errorMessage = 'Failed to create calendar event';

      try {
        const errorData = await eventResponse.json() as { error?: { message?: string } };
        if (errorData?.error?.message) {
          // Don't expose raw Google errors to users
          console.error('Calendar API error:', errorData.error.message);
        }
      } catch {
        // Ignore JSON parse errors
      }

      return res.status(500).json({
        error: 'calendar_error',
        message: errorMessage,
        status: errorStatus,
      });
    }

    const eventData = await eventResponse.json() as {
      id: string;
      htmlLink: string;
      start: { dateTime: string };
      end: { dateTime: string };
    };

    // Send email notifications (non-blocking - don't fail booking if email fails)
    let emailStatus: 'sent' | 'failed' = 'sent';
    let emailErrorHint: string | null = null;

    const emailPayload: BookingPayload = {
      name: body.name!,
      phone: body.phone!,
      email: body.email!,
      date: body.date!,
      time: body.time!,
      zipCode: body.zipCode,
      message: body.message,
    };

    try {
      const [adminResult, customerResult] = await Promise.all([
        sendAdminBookingEmail(emailPayload, eventData.htmlLink),
        sendCustomerBookingEmail(emailPayload, eventData.htmlLink),
      ]);

      if (!adminResult.success || !customerResult.success) {
        emailStatus = 'failed';
        emailErrorHint = 'Email delivery may be delayed';
        console.error('Email send partial failure - admin:', adminResult.success, 'customer:', customerResult.success);
      } else {
        console.log('Emails sent successfully - eventId:', eventData.id);
      }
    } catch (emailErr) {
      emailStatus = 'failed';
      emailErrorHint = 'Email delivery may be delayed';
      console.error('Email send error:', emailErr instanceof Error ? emailErr.message : 'Unknown error');
    }

    // Forward the lead to GoHighLevel. Inert until GHL_WEBHOOK_URL is set, and it can
    // never fail the booking: a CRM outage must not cost the customer their appointment.
    const crm = await forwardToGoHighLevel({
      name: body.name!,
      email: body.email!,
      phone: body.phone!,
      postalCode: body.zipCode,
      message: body.message,
      appointmentDate: body.date!,
      appointmentTime: body.time!.substring(0, 5),
      calendarEventId: eventData.id,
      smsConsent: body.smsConsent === true,
      consentText: body.consentText,
      consentTimestamp: body.consentTimestamp,
      consentIp,
      source: bookingSource,
    });

    // Success response
    return res.status(200).json({
      success: true,
      message: 'Your appointment has been scheduled!',
      eventId: eventData.id,
      htmlLink: eventData.htmlLink,
      emailStatus,
      emailErrorHint,
      // Diagnostic only; the client ignores this.
      crmStatus: crm.forwarded ? 'forwarded' : crm.reason,
      appointment: {
        date: body.date,
        time: body.time,
        name: body.name,
      },
    });

  } catch (err) {
    console.error('Booking error:', err instanceof Error ? err.message : 'Unknown error');
    return res.status(500).json({
      error: 'server_error',
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
}

