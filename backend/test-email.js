require('dotenv').config();
const { sendEmail } = require('./config/sendgrid');

const testEmail = async () => {
  try {
    console.log('Sending test email...');
    console.log('From:', process.env.SENDGRID_FROM_EMAIL);
    console.log('To: vidhikaiwart@gmail.com');
    
    await sendEmail(
      'vidhikaiwart@gmail.com',
      'Test Email from Real Estate CRM',
      'This is a test email from your Real Estate CRM application.',
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #f4b400;">Test Email from Real Estate CRM</h2>
          <p>Hello!</p>
          <p>This is a test email from your Real Estate CRM application.</p>
          <p>If you received this email, your SendGrid integration is working correctly!</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">Real Estate CRM - Powered by SendGrid</p>
        </div>
      `
    );
    
    console.log('✅ Email sent successfully!');
    console.log('Check vidhikaiwart@gmail.com inbox');
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
    if (error.response) {
      console.error('SendGrid Error Details:', error.response.body);
    }
  }
};

testEmail();
