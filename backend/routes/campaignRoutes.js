const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const auth = require('../middleware/auth');
const { canSendCampaign } = require('../middleware/rbac');

// All routes require authentication and admin role
router.use(auth);
router.use(canSendCampaign);

// Admin only - Send campaigns
router.post('/email', campaignController.sendEmailCampaign);
router.post('/whatsapp', campaignController.sendWhatsAppCampaign);

module.exports = router;
