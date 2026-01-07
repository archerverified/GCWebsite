import type { VercelRequest, VercelResponse } from '@vercel/node';

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
}

interface ValidationErrors {
  [key: string]: string;
}

// Valid 30-minute time slots (8 AM to 6 PM)
const VALID_TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00',
];

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
      errors.time = 'Time must be a 30-minute interval (e.g., 08:00, 08:30, 09:00)';
    }
  }

  return errors;
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
      summary: `Garage Cowboy Inspection — ${body.name}`,
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
Booked via garagecowboy.com
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

    // Success response
    return res.status(200).json({
      success: true,
      message: 'Your appointment has been scheduled!',
      eventId: eventData.id,
      htmlLink: eventData.htmlLink,
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

