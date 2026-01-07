import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Google Calendar Test Event Creation Endpoint
 * 
 * Production-safe smoke test that creates a test event on Google Calendar.
 * Protected by ADMIN_CONNECT_SECRET.
 * 
 * Environment Variables Required:
 * - ADMIN_CONNECT_SECRET: Secret for authorization
 * - GOOGLE_OAUTH_CLIENT_ID: OAuth client ID
 * - GOOGLE_OAUTH_CLIENT_SECRET: OAuth client secret
 * - GOOGLE_REFRESH_TOKEN: Refresh token from OAuth flow
 * 
 * Optional:
 * - GOOGLE_CALENDAR_ID: Calendar ID (defaults to "primary")
 * 
 * Usage:
 * GET /api/google/calendar/test-create?secret=<ADMIN_CONNECT_SECRET>
 */

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_CALENDAR_API = 'https://www.googleapis.com/calendar/v3/calendars';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Secret validation
  const adminSecret = process.env.ADMIN_CONNECT_SECRET;
  const providedSecret = req.query.secret;

  if (!adminSecret || providedSecret !== adminSecret) {
    return res.status(401).json({
      error: 'unauthorized',
      message: 'Invalid or missing secret.',
    });
  }

  // 2. Environment variables
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

  // Validate required env vars
  const missingVars: string[] = [];
  if (!clientId) missingVars.push('GOOGLE_OAUTH_CLIENT_ID');
  if (!clientSecret) missingVars.push('GOOGLE_OAUTH_CLIENT_SECRET');
  if (!refreshToken) missingVars.push('GOOGLE_REFRESH_TOKEN');

  if (missingVars.length > 0) {
    return res.status(500).json({
      error: 'config_error',
      message: 'Missing required environment variables.',
      missingVars,
    });
  }

  try {
    // 3. Token exchange - get access token from refresh token
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
      const errorStatus = tokenResponse.status;
      return res.status(500).json({
        error: 'token_exchange_failed',
        message: `Failed to exchange refresh token. Google returned status ${errorStatus}.`,
        status: errorStatus,
      });
    }

    const tokenData = await tokenResponse.json() as {
      access_token: string;
      expires_in: number;
      token_type: string;
    };

    const accessToken = tokenData.access_token;

    // 4. Create calendar event
    const now = new Date();
    const startTime = new Date(now.getTime() + 5 * 60 * 1000); // now + 5 minutes
    const endTime = new Date(now.getTime() + 35 * 60 * 1000); // now + 35 minutes

    const eventBody = {
      summary: 'GCWebsite Booking Test',
      description: 'Smoke test event from Vercel function.',
      start: {
        dateTime: startTime.toISOString(),
        timeZone: 'America/Chicago',
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'America/Chicago',
      },
    };

    const calendarUrl = `${GOOGLE_CALENDAR_API}/${encodeURIComponent(calendarId)}/events`;

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
      let errorMessage = `Google Calendar API returned status ${errorStatus}`;
      
      try {
        const errorData = await eventResponse.json() as { error?: { message?: string } };
        if (errorData?.error?.message) {
          errorMessage = errorData.error.message;
        }
      } catch {
        // Ignore JSON parse errors
      }

      return res.status(500).json({
        error: 'event_creation_failed',
        message: errorMessage,
        status: errorStatus,
      });
    }

    const eventData = await eventResponse.json() as {
      id: string;
      htmlLink: string;
      summary: string;
      start: { dateTime: string };
      end: { dateTime: string };
    };

    // 5. Success response
    return res.status(200).json({
      success: true,
      eventId: eventData.id,
      htmlLink: eventData.htmlLink,
      summary: eventData.summary,
      start: eventData.start.dateTime,
      end: eventData.end.dateTime,
      calendarId,
    });

  } catch (err) {
    return res.status(500).json({
      error: 'server_error',
      message: 'An unexpected error occurred.',
      details: err instanceof Error ? err.message : 'Unknown error',
    });
  }
}

