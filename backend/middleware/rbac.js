// Role-based access control middleware

// Check if user is admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
};

// Check if user is staff or admin
exports.isStaff = (req, res, next) => {
  if (req.user.role !== 'staff' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Staff or Admin only.' });
  }
  next();
};

// Check delete permission (admin only)
exports.canDelete = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Only admins can delete.' });
  }
  next();
};

// Check bulk email/campaign permission (admin only)
exports.canSendCampaign = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Only admins can send campaigns.' });
  }
  next();
};

// Check if user can access lead (staff can only access assigned leads)
exports.canAccessLead = async (req, res, next) => {
  try {
    const Lead = require('../models/Lead');
    const leadId = req.params.id;
    
    // Admin has full access
    if (req.user.role === 'admin') {
      return next();
    }
    
    // Staff can only access assigned leads
    const lead = await Lead.findById(leadId);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    
    if (lead.assignedTo && lead.assignedTo.toString() === req.user._id.toString()) {
      return next();
    }
    
    return res.status(403).json({ message: 'Access denied. You can only access your assigned leads.' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
