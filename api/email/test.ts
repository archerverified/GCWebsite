import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendTestEmail } from '../_lib/email';

/**
 * Email Test Endpoint
 * 
 * Sends a test email to verify email configuration is working.
 * Protected by ADMIN_CONNECT_SECRET.
 * 
 * Usage:
 * GET /api/email/test?secret=<ADMIN_CONNECT_SECRET>
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Secret validation
  const adminSecret = process.env.ADMIN_CONNECT_SECRET;
  const providedSecret = req.query.secret;

  if (!adminSecret || providedSecret !== adminSecret) {
    return res.status(401).json({
      error: 'unauthorized',
      message: 'Invalid or missing secret.',
    });
  }

  // Check email configuration
  const requiredVars = ['RESEND_API_KEY', 'EMAIL_FROM', 'EMAIL_ADMIN_TO'];
  const missingVars = requiredVars.filter(v => !process.env[v]);

  if (missingVars.length > 0) {
    return res.status(500).json({
      error: 'config_error',
      message: 'Email service not fully configured.',
      missingVars,
    });
  }

  // Send test email
  const result = await sendTestEmail();

  if (!result.success) {
    return res.status(500).json({
      error: 'send_failed',
      message: 'Failed to send test email.',
      details: result.error,
    });
  }

  return res.status(200).json({
    success: true,
    message: `Test email sent to ${process.env.EMAIL_ADMIN_TO}`,
    emailId: result.id,
  });
}

