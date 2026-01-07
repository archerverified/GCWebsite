import { Resend } from 'resend';

/**
 * Email Helper Library
 * 
 * Provides functions to send booking notification emails using Resend.
 * 
 * Environment Variables Required:
 * - RESEND_API_KEY: Resend API key
 * - EMAIL_FROM: From address (e.g., "Garage Cowboy <no-reply@garagecowboy.com>")
 * - EMAIL_ADMIN_TO: Admin email to receive booking notifications
 * - EMAIL_REPLY_TO: Reply-to address for customer emails
 */

export interface BookingPayload {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  zipCode?: string;
  message?: string;
}

interface EmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY not configured');
    return null;
  }
  return new Resend(apiKey);
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function formatTime(timeStr: string): string {
  try {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  } catch {
    return timeStr;
  }
}

/**
 * Send booking notification email to admin
 */
export async function sendAdminBookingEmail(
  payload: BookingPayload,
  eventLink: string
): Promise<EmailResult> {
  const resend = getResendClient();
  if (!resend) {
    return { success: false, error: 'Email service not configured' };
  }

  const fromAddress = process.env.EMAIL_FROM || 'Garage Cowboy <no-reply@garagecowboy.com>';
  const adminEmail = process.env.EMAIL_ADMIN_TO || 'deno@garagecowboy.com';

  const formattedDate = formatDate(payload.date);
  const formattedTime = formatTime(payload.time);

  const subject = `🔔 New Booking: ${payload.name} - ${formattedDate} at ${formattedTime}`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="background: #FEC300; padding: 24px; text-align: center;">
      <h1 style="margin: 0; color: #303135; font-size: 24px;">🤠 New Booking Request</h1>
    </div>
    <div style="padding: 24px;">
      <h2 style="margin: 0 0 16px 0; color: #303135;">Appointment Details</h2>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666; width: 120px;">📅 Date</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; color: #303135; font-weight: 600;">${formattedDate}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">🕐 Time</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; color: #303135; font-weight: 600;">${formattedTime}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">👤 Name</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; color: #303135; font-weight: 600;">${payload.name}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">📱 Phone</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; color: #303135; font-weight: 600;">
            <a href="tel:${payload.phone}" style="color: #303135; text-decoration: none;">${payload.phone}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">📧 Email</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; color: #303135; font-weight: 600;">
            <a href="mailto:${payload.email}" style="color: #303135; text-decoration: none;">${payload.email}</a>
          </td>
        </tr>
        ${payload.zipCode ? `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">📍 Zip Code</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; color: #303135; font-weight: 600;">${payload.zipCode}</td>
        </tr>
        ` : ''}
      </table>

      ${payload.message ? `
      <div style="margin-top: 20px; padding: 16px; background: #f8f9fa; border-radius: 6px;">
        <h3 style="margin: 0 0 8px 0; color: #666; font-size: 14px;">💬 Customer Message</h3>
        <p style="margin: 0; color: #303135;">${payload.message}</p>
      </div>
      ` : ''}

      <div style="margin-top: 24px; text-align: center;">
        <a href="${eventLink}" style="display: inline-block; background: #FEC300; color: #303135; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">
          View in Calendar
        </a>
      </div>
    </div>
    <div style="background: #303135; padding: 16px; text-align: center;">
      <p style="margin: 0; color: #999; font-size: 12px;">
        This is an automated notification from garagecowboy.com
      </p>
    </div>
  </div>
</body>
</html>`;

  const textContent = `
New Booking Request
===================

Date: ${formattedDate}
Time: ${formattedTime}

Customer Details:
- Name: ${payload.name}
- Phone: ${payload.phone}
- Email: ${payload.email}
${payload.zipCode ? `- Zip Code: ${payload.zipCode}` : ''}

${payload.message ? `Message: ${payload.message}` : ''}

View in Calendar: ${eventLink}
`;

  try {
    const result = await resend.emails.send({
      from: fromAddress,
      to: adminEmail,
      replyTo: payload.email,
      subject,
      html: htmlContent,
      text: textContent,
    });

    if (result.error) {
      console.error('Admin email send error:', result.error.message);
      return { success: false, error: result.error.message };
    }

    return { success: true, id: result.data?.id };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Admin email exception:', errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Send booking confirmation email to customer
 */
export async function sendCustomerBookingEmail(
  payload: BookingPayload,
  eventLink: string
): Promise<EmailResult> {
  const resend = getResendClient();
  if (!resend) {
    return { success: false, error: 'Email service not configured' };
  }

  const fromAddress = process.env.EMAIL_FROM || 'Garage Cowboy <no-reply@garagecowboy.com>';
  const replyTo = process.env.EMAIL_REPLY_TO || 'deno@garagecowboy.com';

  const formattedDate = formatDate(payload.date);
  const formattedTime = formatTime(payload.time);

  const subject = `✅ Your Garage Cowboy Appointment - ${formattedDate}`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="background: #FEC300; padding: 24px; text-align: center;">
      <h1 style="margin: 0; color: #303135; font-size: 24px;">🤠 Garage Cowboy</h1>
      <p style="margin: 8px 0 0 0; color: #303135;">Appointment Confirmed!</p>
    </div>
    <div style="padding: 24px;">
      <p style="color: #303135; font-size: 16px; margin: 0 0 20px 0;">
        Hi ${payload.name.split(' ')[0]},
      </p>
      <p style="color: #303135; font-size: 16px; margin: 0 0 24px 0;">
        Your garage door inspection appointment has been scheduled. We look forward to helping you!
      </p>
      
      <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h2 style="margin: 0 0 16px 0; color: #303135; font-size: 18px;">📅 Appointment Details</h2>
        <p style="margin: 0 0 8px 0; color: #303135;">
          <strong>Date:</strong> ${formattedDate}
        </p>
        <p style="margin: 0 0 8px 0; color: #303135;">
          <strong>Time:</strong> ${formattedTime}
        </p>
        <p style="margin: 0; color: #303135;">
          <strong>Service:</strong> Free Garage Door Inspection
        </p>
      </div>

      <div style="text-align: center; margin-bottom: 24px;">
        <a href="${eventLink}" style="display: inline-block; background: #FEC300; color: #303135; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 600;">
          Add to Your Calendar
        </a>
      </div>

      <div style="border-top: 1px solid #eee; padding-top: 20px;">
        <h3 style="margin: 0 0 12px 0; color: #303135; font-size: 16px;">📞 Need to Reschedule?</h3>
        <p style="margin: 0; color: #666; font-size: 14px;">
          Call us at <a href="tel:+18172560122" style="color: #303135; font-weight: 600;">(817) 256-0122</a> 
          or reply to this email.
        </p>
      </div>
    </div>
    <div style="background: #303135; padding: 20px; text-align: center;">
      <p style="margin: 0 0 8px 0; color: white; font-weight: 600;">Garage Cowboy</p>
      <p style="margin: 0; color: #999; font-size: 12px;">
        Dallas-Fort Worth's Trusted Garage Door Experts
      </p>
      <p style="margin: 8px 0 0 0; color: #999; font-size: 12px;">
        <a href="https://garagecowboy.com" style="color: #FEC300; text-decoration: none;">garagecowboy.com</a>
      </p>
    </div>
  </div>
</body>
</html>`;

  const textContent = `
Garage Cowboy - Appointment Confirmed!

Hi ${payload.name.split(' ')[0]},

Your garage door inspection appointment has been scheduled. We look forward to helping you!

APPOINTMENT DETAILS
-------------------
Date: ${formattedDate}
Time: ${formattedTime}
Service: Free Garage Door Inspection

Add to your calendar: ${eventLink}

NEED TO RESCHEDULE?
-------------------
Call us at (817) 256-0122 or reply to this email.

---
Garage Cowboy
Dallas-Fort Worth's Trusted Garage Door Experts
https://garagecowboy.com
`;

  try {
    const result = await resend.emails.send({
      from: fromAddress,
      to: payload.email,
      replyTo,
      subject,
      html: htmlContent,
      text: textContent,
    });

    if (result.error) {
      console.error('Customer email send error:', result.error.message);
      return { success: false, error: result.error.message };
    }

    return { success: true, id: result.data?.id };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Customer email exception:', errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Send a test email to verify configuration
 */
export async function sendTestEmail(): Promise<EmailResult> {
  const resend = getResendClient();
  if (!resend) {
    return { success: false, error: 'RESEND_API_KEY not configured' };
  }

  const fromAddress = process.env.EMAIL_FROM || 'Garage Cowboy <no-reply@garagecowboy.com>';
  const adminEmail = process.env.EMAIL_ADMIN_TO || 'deno@garagecowboy.com';

  try {
    const result = await resend.emails.send({
      from: fromAddress,
      to: adminEmail,
      subject: '✅ Garage Cowboy Email Test',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h1 style="color: #FEC300;">🤠 Email Configuration Working!</h1>
          <p>This is a test email from your Garage Cowboy booking system.</p>
          <p>Timestamp: ${new Date().toISOString()}</p>
        </div>
      `,
      text: `Email Configuration Working!\n\nThis is a test email from your Garage Cowboy booking system.\n\nTimestamp: ${new Date().toISOString()}`,
    });

    if (result.error) {
      return { success: false, error: result.error.message };
    }

    return { success: true, id: result.data?.id };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
}

