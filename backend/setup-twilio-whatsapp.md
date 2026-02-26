# Twilio WhatsApp Integration Setup

## Step 1: Create Twilio Account

1. Go to: https://www.twilio.com/try-twilio
2. Sign up for a free account
3. Verify your email and phone number

## Step 2: Get Your Credentials

1. Go to Twilio Console: https://console.twilio.com/
2. Find your credentials:
   - **Account SID** (starts with AC...)
   - **Auth Token** (click to reveal)
3. Copy these values

## Step 3: Set Up WhatsApp Sandbox

1. Go to: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
2. Click "Try WhatsApp"
3. You'll see a sandbox number like: `+1 415 523 8886`
4. Follow instructions to join the sandbox:
   - Send a WhatsApp message to the sandbox number
   - Message format: `join <your-sandbox-code>`
   - Example: `join happy-elephant`

## Step 4: Configure Your Application

Update your `.env` file:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=+14155238886
```

## Step 5: Test the Integration

1. Make sure you've joined the WhatsApp sandbox
2. Update `test-whatsapp.js` with your phone number
3. Run: `node test-whatsapp.js`
4. Check your WhatsApp for the test message

## Important Notes

### Sandbox Limitations
- Only works with numbers that have joined the sandbox
- Messages expire after 24 hours of inactivity
- For production, you need to apply for WhatsApp Business API

### Production Setup
For production use:
1. Apply for WhatsApp Business API: https://www.twilio.com/whatsapp/request-access
2. Get your business verified
3. Use your own WhatsApp Business number
4. Update `TWILIO_WHATSAPP_NUMBER` with your business number

### Phone Number Format
Always use E.164 format:
- Include country code
- No spaces or special characters
- Example: `+919876543210` (India)
- Example: `+14155551234` (USA)

## Testing

To test WhatsApp integration:

```bash
cd backend
node test-whatsapp.js
```

## Current Status

✅ Twilio Package: Installed
✅ Configuration: Created
✅ Service Layer: Complete
✅ API Routes: Integrated
⚠️  Credentials: Need to be added
⚠️  Sandbox: Need to join

Your WhatsApp integration is ready - just add your Twilio credentials!
