const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const auth = require('../middleware/auth');
const { isAdmin, isStaff, canDelete, canAccessLead } = require('../middleware/rbac');

// All routes require authentication
router.use(auth);

// Admin only - Full access
router.get('/', isAdmin, leadController.getAllLeads);
router.post('/', isStaff, leadController.createLead);

// Staff can view assigned leads, Admin can view all
router.get('/my-leads', isStaff, leadController.getMyLeads);
router.get('/:id', canAccessLead, leadController.getLeadById);

// Staff can update status of assigned leads, Admin can update any
router.put('/:id', canAccessLead, leadController.updateLead);

// Admin only - Delete leads
router.delete('/:id', canDelete, leadController.deleteLead);

module.exports = router;
