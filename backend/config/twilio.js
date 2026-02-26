const twilio = require('twilio');

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Send a single WhatsApp message
 * @param {string} to - Recipient phone number (with country code, e.g., +919691187862)
 * @param {string} message - Message content
 */
const sendWhatsAppMessage = async (to, message) => {
  try {
    // Clean and format phone number
    let cleanPhone = to.trim(); // Remove spaces
    
    // Add + if missing
    if (!cleanPhone.startsWith('+')) {
      cleanPhone = '+' + cleanPhone;
    }
    
    // Remove any spaces, dashes, or parentheses
    cleanPhone = cleanPhone.replace(/[\s\-\(\)]/g, '');
    
    console.log(`Sending to cleaned number: ${cleanPhone}`);
    
    const result = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${cleanPhone}`,
      body: message
    });

    console.log(`WhatsApp message sent to ${cleanPhone}, SID: ${result.sid}`);
    return { success: true, sid: result.sid };
  } catch (error) {
    console.error('Twilio WhatsApp Error:', error);
    throw error;
  }
};

/**
 * Send WhatsApp message using content template
 * @param {string} to - Recipient phone number (with country code)
 * @param {string} contentSid - Twilio content template SID
 * @param {object} variables - Template variables
 */
const sendWhatsAppTemplate = async (to, contentSid, variables) => {
  try {
    // Clean and format phone number
    let cleanPhone = to.trim();
    if (!cleanPhone.startsWith('+')) {
      cleanPhone = '+' + cleanPhone;
    }
    cleanPhone = cleanPhone.replace(/[\s\-\(\)]/g, '');
    
    const result = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${cleanPhone}`,
      contentSid: contentSid,
      contentVariables: JSON.stringify(variables)
    });

    console.log(`WhatsApp template sent to ${cleanPhone}, SID: ${result.sid}`);
    return { success: true, sid: result.sid };
  } catch (error) {
    console.error('Twilio WhatsApp Template Error:', error);
    throw error;
  }
};

/**
 * Send bulk WhatsApp messages
 * @param {Array} recipients - Array of recipient objects [{phone, name}]
 * @param {string} message - Message content
 */
const sendBulkWhatsAppMessages = async (recipients, message) => {
  try {
    const results = [];
    
    for (const recipient of recipients) {
      try {
        const result = await sendWhatsAppMessage(recipient.phone, message);
        results.push({
          phone: recipient.phone,
          name: recipient.name,
          success: true,
          sid: result.sid
        });
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        results.push({
          phone: recipient.phone,
          name: recipient.name,
          success: false,
          error: error.message
        });
      }
    }

    const successCount = results.filter(r => r.success).length;
    console.log(`Bulk WhatsApp: ${successCount}/${recipients.length} messages sent`);
    
    return { 
      success: true, 
      total: recipients.length,
      sent: successCount,
      failed: recipients.length - successCount,
      results 
    };
  } catch (error) {
    console.error('Bulk WhatsApp Error:', error);
    throw error;
  }
};

/**
 * Send bulk WhatsApp messages using template
 * @param {Array} recipients - Array of recipient objects [{phone, name, variables}]
 * @param {string} contentSid - Twilio content template SID
 */
const sendBulkWhatsAppTemplates = async (recipients, contentSid) => {
  try {
    const results = [];
    
    for (const recipient of recipients) {
      try {
        const result = await sendWhatsAppTemplate(
          recipient.phone, 
          contentSid, 
          recipient.variables || {}
        );
        results.push({
          phone: recipient.phone,
          name: recipient.name,
          success: true,
          sid: result.sid
        });
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        results.push({
          phone: recipient.phone,
          name: recipient.name,
          success: false,
          error: error.message
        });
      }
    }

    const successCount = results.filter(r => r.success).length;
    console.log(`Bulk WhatsApp Templates: ${successCount}/${recipients.length} messages sent`);
    
    return { 
      success: true, 
      total: recipients.length,
      sent: successCount,
      failed: recipients.length - successCount,
      results 
    };
  } catch (error) {
    console.error('Bulk WhatsApp Template Error:', error);
    throw error;
  }
};

module.exports = {
  sendWhatsAppMessage,
  sendWhatsAppTemplate,
  sendBulkWhatsAppMessages,
  sendBulkWhatsAppTemplates
};
