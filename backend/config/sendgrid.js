const sgMail = require('@sendgrid/mail');

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Send a single email
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text content
 * @param {string} html - HTML content (optional)
 */
const sendEmail = async (to, subject, text, html = null) => {
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM_EMAIL, // Must be verified in SendGrid
      subject,
      text,
      ...(html && { html })
    };

    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
    return { success: true };
  } catch (error) {
    console.error('SendGrid Error:', error);
    if (error.response) {
      console.error('SendGrid Response:', error.response.body);
    }
    throw error;
  }
};

/**
 * Send bulk emails
 * @param {Array} recipients - Array of recipient objects [{email, name}]
 * @param {string} subject - Email subject
 * @param {string} text - Plain text content
 * @param {string} html - HTML content (optional)
 */
const sendBulkEmail = async (recipients, subject, text, html = null) => {
  try {
    const messages = recipients.map(recipient => ({
      to: recipient.email,
      from: process.env.SENDGRID_FROM_EMAIL, // Must be verified in SendGrid
      subject,
      text,
      ...(html && { html })
    }));

    await sgMail.send(messages);
    console.log(`Bulk email sent to ${recipients.length} recipients`);
    return { success: true, count: recipients.length };
  } catch (error) {
    console.error('SendGrid Bulk Email Error:', error);
    if (error.response) {
      console.error('SendGrid Response:', error.response.body);
    }
    throw error;
  }
};

module.exports = {
  sendEmail,
  sendBulkEmail
};
