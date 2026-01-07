import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Google OAuth Start Endpoint
 * 
 * Initiates the OAuth 2.0 flow by redirecting the user to Google's consent screen.
 * 
 * Environment Variables Required:
 * - GOOGLE_CLIENT_ID: Your Google OAuth 2.0 Client ID
 * - GOOGLE_REDIRECT_URI: The callback URL (e.g., https://yourdomain.com/api/google/oauth/callback)
 * 
 * Optional:
 * - GOOGLE_OAUTH_SCOPES: Comma-separated list of scopes (defaults to email,profile)
 */

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  const scopes = process.env.GOOGLE_OAUTH_SCOPES || 'email,profile';

  if (!clientId || !redirectUri) {
    return res.status(500).json({
      error: 'OAuth not configured',
      message: 'Missing GOOGLE_CLIENT_ID or GOOGLE_REDIRECT_URI environment variables.',
    });
  }

  // Generate a random state parameter for CSRF protection
  const state = generateRandomState();

  // Build the authorization URL
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: scopes.split(',').map(s => s.trim()).join(' '),
    access_type: 'offline',
    prompt: 'consent',
    state,
  });

  const authUrl = `${GOOGLE_AUTH_URL}?${params.toString()}`;

  // Set the state in a cookie for verification in the callback
  res.setHeader('Set-Cookie', `oauth_state=${state}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600`);

  // Redirect the user to Google's consent screen
  res.redirect(302, authUrl);
}

/**
 * Generates a cryptographically random state string for CSRF protection.
 */
function generateRandomState(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

