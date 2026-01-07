import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Google OAuth Callback Endpoint
 * 
 * Handles the OAuth 2.0 callback from Google after user consent.
 * Exchanges the authorization code for access/refresh tokens.
 * 
 * Environment Variables Required:
 * - GOOGLE_OAUTH_CLIENT_ID: Your Google OAuth 2.0 Client ID
 * - GOOGLE_OAUTH_CLIENT_SECRET: Your Google OAuth 2.0 Client Secret
 * - GOOGLE_OAUTH_REDIRECT_URI: The callback URL (must match the one used in start.ts)
 * 
 * Optional:
 * - OAUTH_SUCCESS_REDIRECT: URL to redirect after successful auth (defaults to /)
 * - OAUTH_ERROR_REDIRECT: URL to redirect after failed auth (defaults to /?error=oauth)
 */

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code, state, error } = req.query;

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI;
  const successRedirect = process.env.OAUTH_SUCCESS_REDIRECT || '/';
  const errorRedirect = process.env.OAUTH_ERROR_REDIRECT || '/?error=oauth';

  // Handle OAuth errors from Google
  if (error) {
    console.error('OAuth error from Google:', error);
    return res.redirect(302, `${errorRedirect}&reason=${encodeURIComponent(String(error))}`);
  }

  // Validate required parameters
  if (!code || typeof code !== 'string') {
    console.error('Missing authorization code');
    return res.redirect(302, `${errorRedirect}&reason=missing_code`);
  }

  // Validate all required environment variables
  const missingVars: string[] = [];
  if (!clientId) missingVars.push('GOOGLE_OAUTH_CLIENT_ID');
  if (!clientSecret) missingVars.push('GOOGLE_OAUTH_CLIENT_SECRET');
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

  // Verify state parameter (CSRF protection)
  const storedState = getCookieValue(req, 'oauth_state');
  if (!storedState || storedState !== state) {
    console.error('State mismatch - possible CSRF attack');
    return res.redirect(302, `${errorRedirect}&reason=state_mismatch`);
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
      const errorData = await tokenResponse.text();
      console.error('Token exchange failed:', errorData);
      return res.redirect(302, `${errorRedirect}&reason=token_exchange_failed`);
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

    let userInfo = null;
    if (userInfoResponse.ok) {
      userInfo = await userInfoResponse.json();
    }

    // Clear the state cookie
    res.setHeader('Set-Cookie', 'oauth_state=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');

    // Log successful authentication (in production, you'd store tokens securely)
    console.log('OAuth successful for user:', userInfo?.email || 'unknown');

    // For now, we'll store minimal info in a session cookie
    // In production, use a proper session store or JWT
    if (userInfo?.email) {
      const sessionData = JSON.stringify({
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        authenticated: true,
        expiresAt: Date.now() + tokens.expires_in * 1000,
      });
      
      // Base64 encode the session data (in production, sign this with a secret)
      const encodedSession = Buffer.from(sessionData).toString('base64');
      
      res.setHeader('Set-Cookie', [
        'oauth_state=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
        `gc_session=${encodedSession}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${tokens.expires_in}`,
      ]);
    }

    // Redirect to success page
    res.redirect(302, successRedirect);

  } catch (err) {
    console.error('OAuth callback error:', err);
    return res.redirect(302, `${errorRedirect}&reason=server_error`);
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
