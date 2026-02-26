# Real Estate CRM - Complete Integration Guide

## 🔗 System Architecture

```
Frontend (React)          Backend (Node.js)           External Services
─────────────────         ─────────────────           ─────────────────
                                                      
http://localhost:3001     http://localhost:5000
                                                      
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│                 │       │                 │       │                 │
│  Login Page     │──────▶│  Auth Routes    │       │   MongoDB       │
│                 │       │  /api/auth      │──────▶│   Database      │
└─────────────────┘       └─────────────────┘       └─────────────────┘
                                                      
┌─────────────────┐       ┌─────────────────┐       
│                 │       │                 │       
│  Dashboard      │──────▶│  Lead Routes    │       
│                 │       │  /api/leads     │       
└─────────────────┘       └─────────────────┘       
                                                      
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│                 │       │                 │       │                 │
│  Email Campaign │──────▶│ Campaign Routes │──────▶│   SendGrid      │
│  Page           │       │ /api/campaigns  │       │   Email API     │
└─────────────────┘       └─────────────────┘       └─────────────────┘
                                                      
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│                 │       │                 │       │                 │
│ WhatsApp        │──────▶│ Campaign Routes │──────▶│   Twilio        │
│ Campaign Page   │       │ /api/campaigns  │       │   WhatsApp API  │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

## ✅ Integration Status

### Backend Services
- ✅ **Email Service** (`services/emailService.js`)
  - Connected to: `config/sendgrid.js`
  - Used by: `controllers/campaignController.js`
  - API: `POST /api/campaigns/email`

- ✅ **WhatsApp Service** (`services/whatsappService.js`)
  - Connected to: `config/twilio.js`
  - Used by: `controllers/campaignController.js`
  - API: `POST /api/campaigns/whatsapp`

### API Routes (All Connected)
```javascript
// Authentication
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me

// Leads
GET    /api/leads              (Admin: all, Staff: assigned)
POST   /api/leads              (Create new lead)
GET    /api/leads/:id          (Get single lead)
PUT    /api/leads/:id          (Update lead)
DELETE /api/leads/:id          (Admin only)

// Campaigns
POST   /api/campaigns/email    (Admin only - SendGrid)
POST   /api/campaigns/whatsapp (Admin only - Twilio)

// Email Testing
POST   /api/email/test         (Admin only)
POST   /api/email/welcome      (Admin only)
POST   /api/email/lead-notification
```

## 🎯 How Frontend Connects to Backend

### 1. Email Campaign Flow

**Frontend** (`EmailCampaign.jsx`):
```javascript
const response = await fetch('/api/campaigns/email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  body: JSON.stringify({
    subject: formData.subject,
    message: formData.message,
    leadIds: selectedLeads
  })
});
```

**Backend** (`campaignController.js`):
```javascript
exports.sendEmailCampaign = async (req, res) => {
  const { subject, message, leadIds } = req.body;
  const leads = await Lead.find({ _id: { $in: leadIds } });
  await sendBulkEmail(recipients, subject, message);
  // ↓ Uses SendGrid
};
```

**SendGrid** (`config/sendgrid.js`):
```javascript
await sgMail.send(messages);
// ↓ Sends actual emails
```

### 2. WhatsApp Campaign Flow

**Frontend** (`WhatsAppCampaign.jsx`):
```javascript
const response = await fetch('/api/campaigns/whatsapp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  body: JSON.stringify({
    message: formData.message,
    leadIds: selectedLeads
  })
});
```

**Backend** (`campaignController.js`):
```javascript
exports.sendWhatsAppCampaign = async (req, res) => {
  const { message, leadIds } = req.body;
  const leads = await Lead.find({ _id: { $in: leadIds } });
  await sendBulkWhatsAppMessages(leads, message);
  // ↓ Uses Twilio
};
```

**Twilio** (`config/twilio.js`):
```javascript
await client.messages.create({...});
// ↓ Sends actual WhatsApp messages
```

## 🚀 How to Use the Complete System

### Step 1: Start Both Servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev
# Running on http://localhost:5000

# Terminal 2 - Frontend
cd frontend
npm run dev
# Running on http://localhost:3001
```

### Step 2: Access the Application
Open browser: `http://localhost:3001`

### Step 3: Login/Register
- Register a new admin user
- Login with credentials

### Step 4: Add Leads
- Go to "Leads" page
- Click "Add Lead"
- Fill in lead details
- Save

### Step 5: Send Email Campaign
- Go to "Campaigns" page
- Click "Create Email Campaign"
- Select leads (checkboxes)
- Write subject and message
- Click "Send to X Leads"
- ✅ Emails sent via SendGrid!

### Step 6: Send WhatsApp Campaign
- Go to "Campaigns" page
- Click "Create WhatsApp Campaign"
- Select leads (checkboxes)
- Write message
- Click "Send to X Leads"
- ✅ WhatsApp messages sent via Twilio!

## 🔧 Configuration Files

All services are configured in `.env`:
```env
# Database
MONGODB_URI=mongodb+srv://...

# Authentication
JWT_SECRET=vidhi@123

# Email (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=your_verified_email@example.com

# WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_WHATSAPP_NUMBER=your_twilio_whatsapp_number
```

## ✅ Everything is Connected!

Your Real Estate CRM is fully integrated:
- Frontend ↔ Backend ✅
- Backend ↔ MongoDB ✅
- Backend ↔ SendGrid ✅
- Backend ↔ Twilio ✅

Just open `http://localhost:3001` and start using it!
