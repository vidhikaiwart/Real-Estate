const { sendEmail, sendBulkEmail } = require('../config/sendgrid');

/**
 * Send welcome email to new user
 */
const sendWelcomeEmail = async (userEmail, userName) => {
  const subject = 'Welcome to Real Estate CRM';
  const text = `Hi ${userName},\n\nWelcome to Real Estate CRM! Your account has been created successfully.\n\nBest regards,\nReal Estate CRM Team`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #f4b400;">Welcome to Real Estate CRM</h2>
      <p>Hi ${userName},</p>
      <p>Welcome to Real Estate CRM! Your account has been created successfully.</p>
      <p>You can now log in and start managing your leads.</p>
      <p>Best regards,<br>Real Estate CRM Team</p>
    </div>
  `;

  return await sendEmail(userEmail, subject, text, html);
};

/**
 * Send lead notification email
 */
const sendLeadNotification = async (userEmail, leadName) => {
  const subject = 'New Lead Assigned';
  const text = `A new lead "${leadName}" has been assigned to you.`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #f4b400;">New Lead Assigned</h2>
      <p>A new lead <strong>${leadName}</strong> has been assigned to you.</p>
      <p>Please check your dashboard for more details.</p>
      <p>Best regards,<br>Real Estate CRM Team</p>
    </div>
  `;

  return await sendEmail(userEmail, subject, text, html);
};

/**
 * Send campaign email to multiple leads
 */
const sendCampaignEmails = async (leads, subject, message) => {
  const recipients = leads.map(lead => ({
    email: lead.email,
    name: lead.name
  }));

  // Convert plain text message to HTML if needed
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="white-space: pre-wrap;">${message}</div>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
      <p style="color: #666; font-size: 12px;">Real Estate CRM</p>
    </div>
  `;

  return await sendBulkEmail(recipients, subject, message, html);
};

/**
 * Send single email to a lead
 */
const sendLeadEmail = async (leadEmail, leadName, subject, message) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <p>Hi ${leadName},</p>
      <div style="white-space: pre-wrap;">${message}</div>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
      <p style="color: #666; font-size: 12px;">Real Estate CRM</p>
    </div>
  `;

  return await sendEmail(leadEmail, subject, message, html);
};

module.exports = {
  sendWelcomeEmail,
  sendLeadNotification,
  sendCampaignEmails,
  sendLeadEmail
};
