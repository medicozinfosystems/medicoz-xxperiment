import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: SendEmailOptions) {
  // If Resend is not configured, just log
  if (!resend || !process.env.RESEND_API_KEY) {
    console.log('[EMAIL - Not Configured] Would send email:');
    console.log('  To:', to);
    console.log('  Subject:', subject);
    console.log('  From:', from || 'The XXperiment <noreply@yourdomain.com>');
    return { success: false, error: 'Resend API key not configured' };
  }

  try {
    // TESTING MODE: Send all emails to verified address until domain is verified
    // Replace with actual recipient email once domain is verified at resend.com/domains
    const testMode = !process.env.RESEND_DOMAIN_VERIFIED;
    const testEmail = 'cto@medicoz.info'; // Your verified email in Resend
    
    const recipientEmail = testMode ? testEmail : (Array.isArray(to) ? to : [to]);
    
    if (testMode) {
      console.log(`[EMAIL - TEST MODE] Sending to ${testEmail} instead of ${to}`);
    }
    
    const { data, error } = await resend.emails.send({
      from: from || 'The XXperiment <onboarding@resend.dev>', // Update with your verified domain
      to: Array.isArray(recipientEmail) ? recipientEmail : [recipientEmail],
      subject: testMode ? `[TEST] ${subject}` : subject,
      html: testMode ? `
        <div style="background: #fff3cd; border: 2px solid #856404; padding: 15px; margin-bottom: 20px; border-radius: 8px;">
          <strong>🧪 TEST MODE:</strong> This email was intended for: <strong>${to}</strong>
          <br>
          <small>To send to real recipients, verify your domain at <a href="https://resend.com/domains">resend.com/domains</a></small>
        </div>
        ${html}
      ` : html,
    });

    if (error) {
      console.error('[EMAIL] Failed to send:', error);
      return { success: false, error };
    }

    console.log('[EMAIL] Sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('[EMAIL] Error:', error);
    return { success: false, error };
  }
}

// Email templates
export function createCommentNotificationEmail(
  recipientName: string,
  commenterName: string,
  postTitle: string,
  commentContent: string,
  postUrl: string
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #7f1e16 0%, #5a120e 100%); color: #e2d6c7; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e2d6c7; border-top: none; }
    .comment-box { background: #f5f5f5; padding: 15px; margin: 20px 0; border-left: 4px solid #7f1e16; border-radius: 4px; }
    .button { display: inline-block; background: #7f1e16; color: #e2d6c7; padding: 12px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #6b5751; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">The XXperiment</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">New Comment on Your Post</p>
    </div>
    <div class="content">
      <p>Hi ${recipientName},</p>
      <p><strong>${commenterName}</strong> just commented on your post:</p>
      <h3 style="color: #7f1e16;">"${postTitle}"</h3>
      <div class="comment-box">
        <p style="margin: 0;">${commentContent}</p>
      </div>
      <p style="text-align: center;">
        <a href="${postUrl}" class="button">View Discussion</a>
      </p>
      <p style="color: #6b5751; font-size: 14px; margin-top: 30px;">
        You're receiving this because you have email notifications enabled for The XXperiment forum.
      </p>
    </div>
    <div class="footer">
      <p>The XXperiment - Conversations that matter</p>
      <p style="margin-top: 10px;">
        <a href="${postUrl.replace(/\/forum.*/, '/profile')}" style="color: #7f1e16;">Manage notification preferences</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

export function createLikeNotificationEmail(
  recipientName: string,
  likerName: string,
  postTitle: string,
  postUrl: string
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #7f1e16 0%, #5a120e 100%); color: #e2d6c7; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e2d6c7; border-top: none; }
    .heart { font-size: 48px; text-align: center; margin: 20px 0; }
    .button { display: inline-block; background: #7f1e16; color: #e2d6c7; padding: 12px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #6b5751; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">The XXperiment</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone Liked Your Post</p>
    </div>
    <div class="content">
      <p>Hi ${recipientName},</p>
      <div class="heart">❤️</div>
      <p style="text-align: center;"><strong>${likerName}</strong> liked your post:</p>
      <h3 style="color: #7f1e16; text-align: center;">"${postTitle}"</h3>
      <p style="text-align: center;">
        <a href="${postUrl}" class="button">View Your Post</a>
      </p>
      <p style="color: #6b5751; font-size: 14px; margin-top: 30px;">
        You're receiving this because you have email notifications enabled for The XXperiment forum.
      </p>
    </div>
    <div class="footer">
      <p>The XXperiment - Conversations that matter</p>
      <p style="margin-top: 10px;">
        <a href="${postUrl.replace(/\/forum.*/, '/profile')}" style="color: #7f1e16;">Manage notification preferences</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

export function createEmailVerificationEmail(
  username: string,
  verificationUrl: string
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #7f1e16 0%, #5a120e 100%); color: #e2d6c7; padding: 40px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #ffffff; padding: 40px; border: 1px solid #e2d6c7; border-top: none; border-radius: 0 0 8px 8px; }
    .button { display: inline-block; background: #7f1e16; color: #e2d6c7 !important; padding: 15px 40px; text-decoration: none; border-radius: 25px; margin: 25px 0; font-weight: bold; font-size: 16px; }
    .button:hover { background: #6b1712; }
    .icon { font-size: 64px; text-align: center; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #6b5751; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 28px;">Welcome to The XXperiment!</h1>
      <p style="margin: 15px 0 0 0; opacity: 0.9; font-size: 16px;">Verify your email to get started</p>
    </div>
    <div class="content">
      <div class="icon">✉️</div>
      <p style="font-size: 16px;">Hi <strong>${username}</strong>,</p>
      <p style="font-size: 16px;">
        Thanks for joining The XXperiment community! We're excited to have you here.
      </p>
      <p style="font-size: 16px;">
        To complete your registration and start engaging in meaningful conversations, 
        please verify your email address by clicking the button below:
      </p>
      <p style="text-align: center;">
        <a href="${verificationUrl}" class="button">Verify Email Address</a>
      </p>
      <p style="color: #6b5751; font-size: 14px; margin-top: 30px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
        <strong>Security Note:</strong> This link will expire in 24 hours. 
        If you didn't create an account with The XXperiment, please ignore this email.
      </p>
      <p style="color: #6b5751; font-size: 13px; margin-top: 20px;">
        If the button doesn't work, copy and paste this link into your browser:<br>
        <a href="${verificationUrl}" style="color: #7f1e16; word-break: break-all;">${verificationUrl}</a>
      </p>
    </div>
    <div class="footer">
      <p>The XXperiment - Conversations that matter</p>
      <p style="margin-top: 10px;">
        Questions? Visit our <a href="${verificationUrl.replace(/\/auth.*/, '/forum')}" style="color: #7f1e16;">Community Forum</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

