const { sendEmail } = require('../config/sendgrid');
const emailService = require('../services/emailService');
const User = require('../models/User');

// Send test email
exports.sendTestEmail = async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({ 
        message: 'Please provide to, subject, and message' 
      });
    }

    await sendEmail(to, subject, message);

    res.json({
      success: true,
      message: 'Test email sent successfully',
      to
    });
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ 
      message: 'Failed to send test email', 
      error: error.message 
    });
  }
};

// Send welcome email to new user
exports.sendWelcomeEmail = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await emailService.sendWelcomeEmail(user.email, user.name);

    res.json({
      success: true,
      message: 'Welcome email sent successfully',
      to: user.email
    });
  } catch (error) {
    console.error('Welcome email error:', error);
    res.status(500).json({ 
      message: 'Failed to send welcome email', 
      error: error.message 
    });
  }
};

// Send lead notification
exports.sendLeadNotification = async (req, res) => {
  try {
    const { userId, leadName } = req.body;

    if (!userId || !leadName) {
      return res.status(400).json({ 
        message: 'User ID and lead name are required' 
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await emailService.sendLeadNotification(user.email, leadName);

    res.json({
      success: true,
      message: 'Lead notification sent successfully',
      to: user.email
    });
  } catch (error) {
    console.error('Lead notification error:', error);
    res.status(500).json({ 
      message: 'Failed to send lead notification', 
      error: error.message 
    });
  }
};

module.exports = exports;
