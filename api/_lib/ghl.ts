/**
 * GoHighLevel lead forwarding.
 *
 * This is a SEAM, not an integration. It is deliberately inert until someone sets
 * GHL_WEBHOOK_URL in the Vercel project. With that variable unset, forwardToGoHighLevel()
 * makes zero network calls and returns immediately, so booking behavior is byte-identical
 * to what it was before this module existed.
 *
 * To turn it on:
 *   1. In GoHighLevel, build a workflow whose trigger is "Inbound Webhook" and copy its URL.
 *   2. Add GHL_WEBHOOK_URL to the Vercel project (Production + Preview) and redeploy.
 *   3. Optionally add GHL_WEBHOOK_SECRET; it is sent as the x-webhook-secret header so the
 *      workflow can reject anything that did not come from this site.
 *
 * Environment Variables (both optional):
 * - GHL_WEBHOOK_URL     Inbound webhook URL. Absent means "do nothing".
 * - GHL_WEBHOOK_SECRET  Shared secret sent as the x-webhook-secret header.
 */

const REQUEST_TIMEOUT_MS = 5000;

export interface GhlLead {
  name: string;
  email: string;
  phone: string;
  postalCode?: string;
  message?: string;
  /** Appointment date, YYYY-MM-DD. */
  appointmentDate: string;
  /** Appointment time, HH:MM (24h). */
  appointmentTime: string;
  /** Google Calendar event id, so a GHL record can be traced back to the invite. */
  calendarEventId?: string;
  smsConsent: boolean;
  /** Exact opt-in wording the customer was shown. */
  consentText?: string;
  /** ISO 8601 timestamp of when consent was given. */
  consentTimestamp?: string;
  /** Submitting IP, part of the A2P consent record. */
  consentIp?: string;
  /** Which page/channel produced this booking, e.g. "website" or "google-ads". */
  source?: string;
}

export type GhlForwardResult =
  | { forwarded: true }
  | { forwarded: false; reason: string };

/**
 * POST a booking to GoHighLevel. Never throws and never rejects: a CRM outage must not
 * cost the customer their appointment, so every failure is swallowed, logged, and
 * reported back as a reason string for the response payload.
 */
export async function forwardToGoHighLevel(
  lead: GhlLead
): Promise<GhlForwardResult> {
  const webhookUrl = process.env.GHL_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    return { forwarded: false, reason: 'not_configured' };
  }

  // GoHighLevel inbound webhooks map flat top-level keys onto contact fields, so keep
  // this payload flat and snake_case rather than nesting it.
  const payload = {
    first_name: lead.name.trim().split(/\s+/)[0] ?? lead.name,
    last_name: lead.name.trim().split(/\s+/).slice(1).join(' '),
    full_name: lead.name,
    email: lead.email,
    phone: lead.phone,
    postal_code: lead.postalCode ?? '',
    message: lead.message ?? '',
    appointment_date: lead.appointmentDate,
    appointment_time: lead.appointmentTime,
    calendar_event_id: lead.calendarEventId ?? '',
    sms_consent: lead.smsConsent,
    consent_text: lead.consentText ?? '',
    consent_timestamp: lead.consentTimestamp ?? '',
    consent_ip: lead.consentIp ?? '',
    // Carries the originating page/channel (e.g. "google-ads") so paid leads are
    // distinguishable in the CRM. Falls back to the original fixed string.
    source: lead.source
      ? `garagecowboy.com booking form (${lead.source})`
      : 'garagecowboy.com booking form',
    source_slug: lead.source ?? 'website',
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const secret = process.env.GHL_WEBHOOK_SECRET?.trim();
    if (secret) {
      headers['x-webhook-secret'] = secret;
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error('GHL webhook rejected the lead - status:', response.status);
      return { forwarded: false, reason: `http_${response.status}` };
    }

    return { forwarded: true };
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.error('GHL webhook timed out after', REQUEST_TIMEOUT_MS, 'ms');
      return { forwarded: false, reason: 'timeout' };
    }

    console.error(
      'GHL webhook error:',
      err instanceof Error ? err.message : 'Unknown error'
    );
    return { forwarded: false, reason: 'request_failed' };
  } finally {
    clearTimeout(timeout);
  }
}
