const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/rbac');

// All routes require authentication
router.use(auth);

// Test email endpoint (Admin only)
router.post('/test', isAdmin, emailController.sendTestEmail);

// Send welcome email (Admin only)
router.post('/welcome', isAdmin, emailController.sendWelcomeEmail);

// Send lead notification (Admin and Staff)
router.post('/lead-notification', emailController.sendLeadNotification);

module.exports = router;
