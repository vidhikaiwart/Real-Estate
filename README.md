# Real Estate CRM Application

A full-stack Customer Relationship Management (CRM) system designed for real estate businesses to manage leads, track conversions, and run marketing campaigns.

## 🏗️ Architecture

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Context API
- **UI Components**: Custom components with Lucide icons

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: SendGrid
- **WhatsApp Service**: Twilio

---

## 🚀 How It Works

### 1. User Authentication Flow

```
User → Login/Register → JWT Token → Stored in localStorage → Used for API requests
```

**Process:**
1. User enters credentials on Login/Register page
2. Backend validates credentials and generates JWT token
3. Token is sent to frontend and stored in localStorage
4. All subsequent API requests include this token in Authorization header
5. Backend middleware validates token before processing requests

**Files Involved:**
- `frontend/src/pages/Login.jsx` - Login UI
- `frontend/src/pages/Register.jsx` - Registration UI
- `frontend/src/context/AuthContext.jsx` - Auth state management
- `backend/controllers/authController.js` - Auth logic
- `backend/middleware/auth.js` - Token validation

---

### 2. Role-Based Access Control (RBAC)

**Two User Roles:**

#### Admin
- Full access to all features
- Can create, view, update, and delete leads
- Can assign leads to staff members
- Can send bulk email and WhatsApp campaigns
- Can manage staff members

#### Staff
- Limited access
- Can only view leads assigned to them
- Can update lead status
- Cannot delete leads
- Cannot send bulk campaigns

**Implementation:**
- `backend/middleware/rbac.js` - Role checking middleware
- Middleware functions: `isAdmin`, `isStaff`, `canDelete`, `canSendCampaign`

---

### 3. Lead Management System

**Lead Lifecycle:**
```
New → Contacted → Follow-up → Visit → Negotiation → Closed/Lost
```

**Lead Data Structure:**
```javascript
{
  name: String,
  phone: String,
  email: String,
  budget: Number,
  propertyType: String,
  status: Enum,
  assignedTo: User Reference,
  source: String,
  notes: String,
  timestamps: true
}
```

**Operations:**
1. **Create Lead**: Admin/Staff can add new leads with all details
2. **View Leads**: Admin sees all, Staff sees only assigned leads
3. **Update Lead**: Change status, add notes, reassign
4. **Delete Lead**: Admin only
5. **Filter Leads**: By status, budget, property type, source

**Files:**
- `backend/models/Lead.js` - Lead schema
- `backend/controllers/leadController.js` - CRUD operations
- `frontend/src/pages/Leads.jsx` - Lead list view
- `frontend/src/pages/AddLead.jsx` - Lead creation form

---

### 4. Campaign Management

#### Email Campaigns (via SendGrid)

**Flow:**
```
Admin → Select Leads → Compose Email → Send → SendGrid → Recipients
```

**Process:**
1. Admin navigates to Email Campaign page
2. Selects leads from database
3. Writes subject and message
4. Clicks send
5. Backend sends request to SendGrid API
6. SendGrid delivers emails to recipients
7. Activity tracked in SendGrid dashboard

**Features:**
- Bulk email sending (1000+ recipients)
- Custom subject and message
- Lead selection by filters
- Email templates support

**Files:**
- `backend/services/emailService.js` - SendGrid integration
- `backend/config/sendgrid.js` - SendGrid configuration
- `frontend/src/pages/EmailCampaign.jsx` - Campaign UI

#### WhatsApp Campaigns (via Twilio)

**Flow:**
```
Admin → Select Leads → Compose Message → Send → Twilio → WhatsApp → Recipients
```

**Process:**
1. Admin navigates to WhatsApp Campaign page
2. Selects leads with phone numbers
3. Writes message
4. Clicks send
5. Backend sends to Twilio API
6. Twilio delivers via WhatsApp
7. Recipients receive messages

**Important Notes:**
- Recipients must join Twilio sandbox first (for testing)
- Phone numbers must include country code (+1234567890)
- Rate limiting: 1 message per second
- Template messages supported

**Files:**
- `backend/services/whatsappService.js` - Twilio integration
- `backend/config/twilio.js` - Twilio configuration
- `frontend/src/pages/WhatsAppCampaign.jsx` - Campaign UI

---

### 5. Dashboard & Analytics

**Dashboard Features:**
- Total leads count
- Lead status distribution
- Recent leads overview
- Conversion rate metrics
- Staff performance indicators

**Data Flow:**
```
Dashboard → API Request → Backend → MongoDB → Aggregate Data → Return to Frontend → Display Charts
```

**Files:**
- `frontend/src/pages/Dashboard.jsx` - Dashboard UI
- `frontend/src/components/StatCard.jsx` - Metric cards

---

### 6. Staff Management

**Admin Functions:**
- View all staff members
- Add new staff (register with role)
- View staff details (name, email, role, status)
- Assign leads to staff

**Files:**
- `frontend/src/pages/Staff.jsx` - Staff list
- `frontend/src/pages/AddStaff.jsx` - Add staff form
- `backend/routes/userRoutes.js` - User management routes

---

## 📡 API Architecture

### Request Flow
```
Frontend → API Call → Backend Route → Middleware (Auth + RBAC) → Controller → Database → Response
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

#### Leads
- `GET /api/leads` - Get all leads (Admin) or assigned leads (Staff)
- `POST /api/leads` - Create new lead
- `GET /api/leads/:id` - Get single lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead (Admin only)

#### Campaigns
- `POST /api/campaigns/email` - Send email campaign
- `POST /api/campaigns/whatsapp` - Send WhatsApp campaign

#### Users
- `GET /api/users` - Get all users (Admin only)

---

## 🔐 Security Features

1. **Password Hashing**: bcryptjs with salt rounds
2. **JWT Authentication**: Secure token-based auth
3. **Token Expiration**: 7 days validity
4. **CORS Protection**: Configured allowed origins
5. **Input Validation**: Mongoose schema validation
6. **Role-Based Access**: Middleware protection on routes
7. **Environment Variables**: Sensitive data in .env

---

## 🗄️ Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: Enum ['admin', 'staff'],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Leads Collection
```javascript
{
  name: String,
  phone: String,
  email: String,
  budget: Number,
  propertyType: String,
  status: Enum,
  assignedTo: ObjectId (User),
  source: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 14+
- MongoDB Atlas account
- SendGrid account (for email)
- Twilio account (for WhatsApp)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with backend URL
npm run dev
```

### Environment Variables

**Backend (.env):**
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
SENDGRID_API_KEY=your_sendgrid_key
SENDGRID_FROM_EMAIL=your_verified_email
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_WHATSAPP_NUMBER=your_twilio_number
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:5000
```

---

## 🎯 User Journey

### Admin Journey
1. Login with admin credentials
2. View dashboard with all metrics
3. Add new leads or import from sources
4. Assign leads to staff members
5. Create and send email/WhatsApp campaigns
6. Track lead progress and conversions
7. Manage staff members

### Staff Journey
1. Login with staff credentials
2. View dashboard with assigned leads
3. See only leads assigned to them
4. Update lead status as they progress
5. Add notes and follow-up reminders
6. Cannot delete leads or send campaigns

---

## 📱 Frontend Pages

1. **Login** - User authentication
2. **Register** - New user registration
3. **Dashboard** - Overview and metrics
4. **Leads** - Lead list with filters
5. **Add Lead** - Create new lead
6. **Campaigns** - Campaign overview
7. **Email Campaign** - Send bulk emails
8. **WhatsApp Campaign** - Send bulk WhatsApp
9. **Staff** - Staff member list
10. **Add Staff** - Register new staff

---

## 🔄 Data Flow Example: Creating a Lead

1. User fills form in `AddLead.jsx`
2. Form data validated on frontend
3. API call to `POST /api/leads` via `leadsAPI.create()`
4. Request includes JWT token in header
5. Backend `auth` middleware validates token
6. Backend `isStaff` middleware checks role
7. `leadController.createLead()` processes request
8. Mongoose validates data against Lead schema
9. Lead saved to MongoDB
10. Success response sent to frontend
11. User redirected to Leads page
12. New lead appears in list

---

## 🚨 Error Handling

- Frontend displays user-friendly error messages
- Backend returns appropriate HTTP status codes
- Validation errors show specific field issues
- Authentication errors redirect to login
- Permission errors show access denied message

---

## 📊 Technology Stack Summary

**Frontend:**
- React 18, Vite, Tailwind CSS, React Router, Context API

**Backend:**
- Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs

**External Services:**
- SendGrid (Email), Twilio (WhatsApp), MongoDB Atlas (Database)

**Development Tools:**
- Git, npm, nodemon, ESLint

---

## 🎨 UI/UX Features

- Clean, modern interface with yellow theme
- Responsive design for all devices
- Loading states for async operations
- Success/error notifications
- Form validation with helpful messages
- Intuitive navigation with sidebar
- Role-based UI (shows/hides features based on role)

---

## 📝 License

This project is for educational and commercial use.

---

## 👥 Support

For issues or questions, please refer to the documentation or contact the development team.
