import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Google OAuth Start Endpoint
 * 
 * Initiates the OAuth 2.0 flow by redirecting the user to Google's consent screen.
 * 
 * Environment Variables Required:
 * - GOOGLE_OAUTH_CLIENT_ID: Your Google OAuth 2.0 Client ID
 * - GOOGLE_OAUTH_REDIRECT_URI: The callback URL (e.g., https://yourdomain.com/api/google/oauth/callback)
 * 
 * Optional:
 * - GOOGLE_OAUTH_SCOPES: Comma-separated list of scopes (defaults to email,profile,calendar.events)
 */

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI || process.env.GOOGLE_REDIRECT_URI;
  const scopes = process.env.GOOGLE_OAUTH_SCOPES || 'email,profile,https://www.googleapis.com/auth/calendar.events';

  // Validate all required environment variables
  const missingVars: string[] = [];
  if (!clientId) missingVars.push('GOOGLE_OAUTH_CLIENT_ID');
  if (!redirectUri) missingVars.push('GOOGLE_OAUTH_REDIRECT_URI');

  if (missingVars.length > 0) {
    const errorHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OAuth Configuration Error</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
    .error-box { background: white; border: 2px solid #dc3545; border-radius: 8px; padding: 24px 32px; max-width: 500px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    h1 { color: #dc3545; margin: 0 0 16px 0; font-size: 24px; }
    p { color: #333; margin: 0 0 12px 0; }
    code { background: #f8f9fa; padding: 2px 6px; border-radius: 4px; font-size: 14px; color: #d63384; }
    ul { text-align: left; margin: 16px 0; padding-left: 24px; }
    li { margin: 8px 0; }
  </style>
</head>
<body>
  <div class="error-box">
    <h1>⚠️ OAuth Not Configured</h1>
    <p>The following environment variables are missing:</p>
    <ul>
      ${missingVars.map(v => `<li><code>${v}</code></li>`).join('')}
    </ul>
    <p>Please add these to your Vercel project settings.</p>
  </div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    return res.status(500).send(errorHtml);
  }

  // Validate redirectUri format
  if (!redirectUri.startsWith('https://')) {
    return res.status(400).json({
      error: 'OAuth misconfigured',
      redirectUri,
      hint: 'Set GOOGLE_OAUTH_REDIRECT_URI to https://garagecowboy.com/api/google/oauth/callback and add it to Google Authorized Redirect URIs exactly.'
    });
  }

  if (!redirectUri.includes('/api/google/oauth/callback')) {
    return res.status(400).json({
      error: 'OAuth misconfigured',
      redirectUri,
      hint: 'Set GOOGLE_OAUTH_REDIRECT_URI to https://garagecowboy.com/api/google/oauth/callback and add it to Google Authorized Redirect URIs exactly.'
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
    include_granted_scopes: 'true',
    state,
  });

  const authUrl = `${GOOGLE_AUTH_URL}?${params.toString()}`;

  // Set the state in a cookie for verification in the callback
  res.setHeader('Set-Cookie', `gc_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);

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
