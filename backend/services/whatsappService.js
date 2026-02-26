const { sendWhatsAppMessage, sendBulkWhatsAppMessages } = require('../config/twilio');

/**
 * Send welcome WhatsApp message to new lead
 */
const sendWelcomeWhatsApp = async (phone, name) => {
  const message = `Hi ${name}! 👋\n\nThank you for your interest in our real estate services. We're excited to help you find your dream property!\n\nOur team will contact you shortly.\n\nBest regards,\nReal Estate CRM Team`;
  
  return await sendWhatsAppMessage(phone, message);
};

/**
 * Send lead notification via WhatsApp
 */
const sendLeadNotificationWhatsApp = async (phone, leadName) => {
  const message = `🔔 New Lead Assigned!\n\nLead: ${leadName}\n\nPlease check your dashboard for more details.\n\nReal Estate CRM`;
  
  return await sendWhatsAppMessage(phone, message);
};

/**
 * Send campaign WhatsApp messages to multiple leads
 */
const sendCampaignWhatsApp = async (leads, message) => {
  const recipients = leads.map(lead => ({
    phone: lead.phone,
    name: lead.name
  }));

  return await sendBulkWhatsAppMessages(recipients, message);
};

/**
 * Send follow-up reminder via WhatsApp
 */
const sendFollowUpReminder = async (phone, leadName, date) => {
  const message = `📅 Follow-up Reminder\n\nLead: ${leadName}\nScheduled: ${date}\n\nDon't forget to follow up with this lead!\n\nReal Estate CRM`;
  
  return await sendWhatsAppMessage(phone, message);
};

module.exports = {
  sendWelcomeWhatsApp,
  sendLeadNotificationWhatsApp,
  sendCampaignWhatsApp,
  sendFollowUpReminder
};
