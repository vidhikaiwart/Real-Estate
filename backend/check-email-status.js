require('dotenv').config();

console.log('\n=== SendGrid Configuration Check ===\n');
console.log('API Key:', process.env.SENDGRID_API_KEY ? 'Set (length: ' + process.env.SENDGRID_API_KEY.length + ')' : 'NOT SET');
console.log('From Email:', process.env.SENDGRID_FROM_EMAIL);
console.log('\n=== Next Steps ===\n');
console.log('1. Check SendGrid Activity Feed:');
console.log('   https://app.sendgrid.com/email_activity\n');
console.log('2. Verify sender email is verified:');
console.log('   https://app.sendgrid.com/settings/sender_auth/senders\n');
console.log('3. Check Gmail:');
console.log('   - Inbox');
console.log('   - Spam/Junk folder');
console.log('   - All Mail folder\n');
console.log('4. If sender not verified:');
console.log('   - You MUST verify vidhikaiwart@gmail.com');
console.log('   - Check your email for verification link from SendGrid');
console.log('   - Click the link to verify\n');
