import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Google OAuth Callback Endpoint
 * 
 * Handles the OAuth 2.0 callback from Google after user consent.
 * Exchanges the authorization code for access/refresh tokens and displays them.
 * 
 * Environment Variables Required:
 * - GOOGLE_OAUTH_CLIENT_ID: Your Google OAuth 2.0 Client ID
 * - GOOGLE_OAUTH_CLIENT_SECRET: Your Google OAuth 2.0 Client Secret
 * - GOOGLE_OAUTH_REDIRECT_URI: The callback URL (must match the one used in start.ts)
 * 
 * Query Parameters:
 * - debug=1: Returns diagnostic JSON instead of processing OAuth
 */

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code, state, error, debug } = req.query;

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI || process.env.GOOGLE_REDIRECT_URI;

  // Debug mode - return diagnostic info
  if (debug === '1') {
    const storedState = getCookieValue(req, 'gc_oauth_state');
    return res.status(200).json({
      debug: true,
      redirectUri,
      queryParams: {
        code: code ? `${String(code).substring(0, 10)}...` : null,
        state: state || null,
        error: error || null,
      },
      cookieStateExists: !!storedState,
      envVars: {
        GOOGLE_OAUTH_CLIENT_ID: clientId ? 'set' : 'missing',
        GOOGLE_OAUTH_CLIENT_SECRET: clientSecret ? 'set' : 'missing',
        GOOGLE_OAUTH_REDIRECT_URI: redirectUri ? 'set' : 'missing',
      },
    });
  }

  // Handle OAuth errors from Google
  if (error) {
    return res.status(400).json({
      error: 'oauth_error',
      message: `Google returned an error: ${error}`,
      googleError: error,
    });
  }

  // Validate required parameters
  if (!code || typeof code !== 'string') {
    return res.status(400).json({
      error: 'missing_code',
      message: 'Authorization code not provided by Google.',
    });
  }

  // Validate all required environment variables
  const missingVars: string[] = [];
  if (!clientId) missingVars.push('GOOGLE_OAUTH_CLIENT_ID');
  if (!clientSecret) missingVars.push('GOOGLE_OAUTH_CLIENT_SECRET');
  if (!redirectUri) missingVars.push('GOOGLE_OAUTH_REDIRECT_URI');

  if (missingVars.length > 0) {
    return res.status(500).json({
      error: 'config_error',
      message: 'OAuth not configured properly.',
      missingVars,
    });
  }

  // Verify state parameter (CSRF protection)
  const storedState = getCookieValue(req, 'gc_oauth_state');
  if (!storedState || storedState !== state) {
    return res.status(400).json({
      error: 'state_mismatch',
      message: 'CSRF state cookie missing or does not match. Try starting OAuth flow again.',
      storedState: storedState ? 'present' : 'missing',
      queryState: state ? 'present' : 'missing',
    });
  }

  try {
    // Exchange authorization code for tokens
    const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const errorStatus = tokenResponse.status;
      return res.status(500).json({
        error: 'token_exchange_failed',
        message: `Failed to exchange authorization code for tokens. Google returned status ${errorStatus}.`,
        status: errorStatus,
      });
    }

    const tokens = await tokenResponse.json() as {
      access_token: string;
      refresh_token?: string;
      expires_in: number;
      token_type: string;
      scope: string;
    };

    // Optionally fetch user info
    const userInfoResponse = await fetch(GOOGLE_USERINFO_URL, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    let userInfo: { email?: string; name?: string } | null = null;
    if (userInfoResponse.ok) {
      userInfo = await userInfoResponse.json();
    }

    // Clear the state cookie
    res.setHeader('Set-Cookie', 'gc_oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0');

    // Display success HTML with tokens
    const successHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OAuth Success - Garage Cowboy</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; padding: 40px 20px; margin: 0; }
    .container { background: white; border: 2px solid #28a745; border-radius: 8px; padding: 32px; max-width: 700px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    h1 { color: #28a745; margin: 0 0 24px 0; }
    .field { margin-bottom: 20px; }
    .label { font-weight: 600; color: #333; margin-bottom: 4px; }
    .value { background: #f8f9fa; padding: 12px; border-radius: 4px; font-family: monospace; word-break: break-all; border: 1px solid #dee2e6; }
    .highlight { background: #fff3cd; border-color: #ffc107; }
    .warning { background: #f8d7da; border-color: #f5c6cb; color: #721c24; }
    .next-steps { background: #e7f5ff; padding: 16px; border-radius: 4px; margin-top: 24px; }
    .next-steps h3 { margin: 0 0 8px 0; color: #0c5460; }
    .next-steps ol { margin: 0; padding-left: 20px; }
    .next-steps li { margin-bottom: 8px; }
    code { background: #e9ecef; padding: 2px 6px; border-radius: 3px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>✅ OAuth Success</h1>
    
    <div class="field">
      <div class="label">User</div>
      <div class="value">${userInfo?.email || 'Unknown'}</div>
    </div>
    
    <div class="field">
      <div class="label">Calendar ID</div>
      <div class="value">primary</div>
    </div>
    
    <div class="field">
      <div class="label">Refresh Token</div>
      <div class="value ${tokens.refresh_token ? 'highlight' : 'warning'}">${tokens.refresh_token || '⚠️ Not returned - You may need to revoke access at https://myaccount.google.com/permissions and try again'}</div>
    </div>
    
    <div class="field">
      <div class="label">Access Token</div>
      <div class="value">${tokens.access_token.substring(0, 30)}...</div>
    </div>
    
    <div class="field">
      <div class="label">Expires In</div>
      <div class="value">${tokens.expires_in} seconds</div>
    </div>
    
    <div class="field">
      <div class="label">Scopes Granted</div>
      <div class="value">${tokens.scope}</div>
    </div>
    
    ${tokens.refresh_token ? `
    <div class="next-steps">
      <h3>📋 Next Steps</h3>
      <ol>
        <li>Copy the <strong>Refresh Token</strong> above</li>
        <li>Go to <strong>Vercel Project Settings → Environment Variables</strong></li>
        <li>Add a new variable: <code>GOOGLE_REFRESH_TOKEN</code> with the copied value</li>
        <li>Redeploy your project</li>
      </ol>
    </div>
    ` : `
    <div class="next-steps" style="background: #fff3cd;">
      <h3>⚠️ No Refresh Token</h3>
      <ol>
        <li>Go to <a href="https://myaccount.google.com/permissions" target="_blank">Google Account Permissions</a></li>
        <li>Find and remove access for "Garage Cowboy" (or your app name)</li>
        <li>Return to <a href="/api/google/oauth/start">/api/google/oauth/start</a> and try again</li>
      </ol>
    </div>
    `}
  </div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(successHtml);

  } catch (err) {
    return res.status(500).json({
      error: 'server_error',
      message: 'An unexpected error occurred during OAuth callback.',
      details: err instanceof Error ? err.message : 'Unknown error',
    });
  }
}

/**
 * Extracts a cookie value from the request.
 */
function getCookieValue(req: VercelRequest, name: string): string | null {
  const cookies = req.headers.cookie;
  if (!cookies) return null;

  const match = cookies.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}
