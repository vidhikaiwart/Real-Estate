require('dotenv').config();
const sgMail = require('@sendgrid/mail');

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const testEmailCampaign = async () => {
  console.log('=== Testing Email Campaign ===\n');
  
  // Check configuration
  console.log('1. Checking Configuration:');
  console.log('   SendGrid API Key:', process.env.SENDGRID_API_KEY ? '✓ Set' : '✗ Missing');
  console.log('   From Email:', process.env.SENDGRID_FROM_EMAIL);
  console.log('');

  // Test email address
  const testEmail = 'vidhikaiwart@gmail.com'; // Change this to your test email
  
  console.log('2. Sending Test Email...');
  console.log('   To:', testEmail);
  console.log('   From:', process.env.SENDGRID_FROM_EMAIL);
  console.log('');

  try {
    const msg = {
      to: testEmail,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Test Email Campaign - Real Estate CRM',
      text: 'This is a test email from your Real Estate CRM system.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #f4b400;">Test Email Campaign</h2>
          <p>This is a test email from your Real Estate CRM system.</p>
          <p>If you received this email, your email campaign feature is working correctly!</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">Real Estate CRM - Test Email</p>
        </div>
      `
    };

    const response = await sgMail.send(msg);
    console.log('✓ Email sent successfully!');
    console.log('   Status Code:', response[0].statusCode);
    console.log('   Message ID:', response[0].headers['x-message-id']);
    console.log('');
    console.log('3. Next Steps:');
    console.log('   - Check your inbox:', testEmail);
    console.log('   - Check spam/junk folder if not in inbox');
    console.log('   - Wait 1-2 minutes for delivery');
    console.log('');
    console.log('✓ Test completed successfully!');
  } catch (error) {
    console.error('✗ Email sending failed!');
    console.error('');
    console.error('Error Details:');
    console.error('   Message:', error.message);
    
    if (error.response) {
      console.error('   Status Code:', error.response.statusCode);
      console.error('   Body:', JSON.stringify(error.response.body, null, 2));
    }
    
    console.error('');
    console.error('Common Issues:');
    console.error('   1. Invalid API Key - Check SENDGRID_API_KEY in .env');
    console.error('   2. Unverified sender - Verify vidhikaiwart@gmail.com in SendGrid');
    console.error('   3. API Key permissions - Ensure "Mail Send" permission is enabled');
    console.error('   4. Rate limiting - Wait a few minutes and try again');
  }
};

// Run the test
testEmailCampaign();
