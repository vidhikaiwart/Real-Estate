require('dotenv').config();
const https = require('https');

const checkEmailActivity = () => {
  console.log('=== Checking SendGrid Email Activity ===\n');
  
  const options = {
    hostname: 'api.sendgrid.com',
    path: '/v3/messages?limit=10',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json'
    }
  };

  const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      if (res.statusCode === 200) {
        const messages = JSON.parse(data);
        
        if (messages.messages && messages.messages.length > 0) {
          console.log(`Found ${messages.messages.length} recent messages:\n`);
          
          messages.messages.forEach((msg, index) => {
            console.log(`Message ${index + 1}:`);
            console.log(`  To: ${msg.to_email}`);
            console.log(`  From: ${msg.from_email}`);
            console.log(`  Subject: ${msg.subject}`);
            console.log(`  Status: ${msg.status}`);
            console.log(`  Message ID: ${msg.msg_id}`);
            console.log(`  Last Event: ${msg.last_event_time}`);
            console.log('');
          });
        } else {
          console.log('No recent messages found.');
        }
      } else {
        console.error('Error:', res.statusCode);
        console.error('Response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Request Error:', error.message);
  });

  req.end();
};

console.log('Note: This requires SendGrid API v3 access.');
console.log('If this doesn\'t work, check manually at:');
console.log('https://app.sendgrid.com/email_activity\n');

checkEmailActivity();
