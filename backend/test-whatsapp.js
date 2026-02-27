require('dotenv').config();
const { sendWhatsAppMessage, sendWhatsAppTemplate } = require('./config/twilio');

const testWhatsApp = async () => {
  try {
    console.log('\n=== Testing WhatsApp Integration ===\n');
    console.log('Twilio Account SID:', process.env.TWILIO_ACCOUNT_SID);
    console.log('WhatsApp Number:', process.env.TWILIO_WHATSAPP_NUMBER);
    console.log('\n--- Test 1: Simple Message ---\n');
    
    // Test simple message
    const testNumber = '+1234567890'; // Replace with your test number
    
    await sendWhatsAppMessage(
      testNumber,
      'Hello! This is a test message from your Real Estate CRM. 🏠\n\nYour WhatsApp integration is working!'
    );
    
    console.log('✅ Simple message sent successfully!');
    
    console.log('\n--- Test 2: Template Message ---\n');
    
    // Test template message
    await sendWhatsAppTemplate(
      testNumber,
      'HXb5b62575e6e4ff6129ad7c8efe1f983e',
      { "1": "12/1", "2": "3pm" }
    );
    
    console.log('✅ Template message sent successfully!');
    console.log('\nCheck your WhatsApp for both messages.');
    
  } catch (error) {
    console.error('\n❌ Failed to send WhatsApp message');
    console.error('Error:', error.message);
    if (error.code) {
      console.error('Error Code:', error.code);
    }
    if (error.moreInfo) {
      console.error('More Info:', error.moreInfo);
    }
  }
};

testWhatsApp();
