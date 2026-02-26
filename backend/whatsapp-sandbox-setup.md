# WhatsApp Sandbox Setup for Recipients

## Why Messages Aren't Being Received

Twilio WhatsApp Sandbox requires recipients to "opt-in" before they can receive messages. This is a security feature.

## Steps for Recipients to Join Sandbox

### For Chhaya (+916261327337):

1. **Open WhatsApp** on your phone

2. **Start a new chat** with this number:
   ```
   +1 415 523 8886
   ```

3. **Send this message** (get your code from Twilio console):
   ```
   join <your-sandbox-code>
   ```
   Example: `join happy-elephant`

4. **Wait for confirmation** - You'll receive a message like:
   ```
   ✅ You are all set! Your sandbox is ready to use.
   ```

5. **Now you can receive messages** from the Real Estate CRM!

## How to Find Your Sandbox Code

1. Go to: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
2. Look for "Your Sandbox" section
3. You'll see: "To connect, send 'join <code>' to +1 415 523 8886"
4. Copy that code

## Important Notes

- **Sandbox Limitations:**
  - Only works with numbers that have joined
  - Messages expire after 24 hours of inactivity
  - Need to rejoin if expired

- **For Production:**
  - Apply for WhatsApp Business API
  - No sandbox required
  - Can send to any number
  - More reliable delivery

## Current Status

✅ Twilio Integration: Working
✅ Messages Being Sent: Yes
❌ Messages Being Received: Only by sandbox members

**Solution:** Have all recipients join the sandbox OR upgrade to WhatsApp Business API for production use.
