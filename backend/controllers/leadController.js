const Lead = require('../models/Lead');

// Get all leads (Admin only) with filters
exports.getAllLeads = async (req, res) => {
  try {
    const { status, minBudget, maxBudget, propertyType, source, assignedTo } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (minBudget || maxBudget) {
      filter.budget = {};
      if (minBudget) {
        filter.budget.$gte = Number(minBudget);
      }
      if (maxBudget) {
        filter.budget.$lte = Number(maxBudget);
      }
    }
    
    if (propertyType) {
      filter.propertyType = propertyType;
    }
    
    if (source) {
      filter.source = source;
    }
    
    if (assignedTo) {
      filter.assignedTo = assignedTo;
    }
    
    const leads = await Lead.find(filter).populate('assignedTo', 'name email');
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get leads assigned to current user (Staff) with filters
exports.getMyLeads = async (req, res) => {
  try {
    const { status, minBudget, maxBudget, propertyType, source } = req.query;
    
    // Build filter object
    const filter = { assignedTo: req.user._id };
    
    if (status) {
      filter.status = status;
    }
    
    if (minBudget || maxBudget) {
      filter.budget = {};
      if (minBudget) {
        filter.budget.$gte = Number(minBudget);
      }
      if (maxBudget) {
        filter.budget.$lte = Number(maxBudget);
      }
    }
    
    if (propertyType) {
      filter.propertyType = propertyType;
    }
    
    if (source) {
      filter.source = source;
    }
    
    const leads = await Lead.find(filter).populate('assignedTo', 'name email');
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single lead by ID
exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate('assignedTo', 'name email');
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new lead
exports.createLead = async (req, res) => {
  try {
    console.log('Creating lead with data:', req.body);
    console.log('User creating lead:', req.user ? req.user.email : 'No user');
    
    // Validate required fields
    const { name, phone, email, budget, propertyType } = req.body;
    if (!name || !phone || !email || !budget || !propertyType) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['name', 'phone', 'email', 'budget', 'propertyType']
      });
    }
    
    const lead = new Lead(req.body);
    await lead.save();
    console.log('Lead created successfully:', lead._id);
    res.status(201).json(lead);
  } catch (error) {
    console.error('Error creating lead:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      }));
      return res.status(400).json({ 
        message: 'Validation error',
        errors
      });
    }
    
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message,
      details: error.toString()
    });
  }
};

// Update lead
exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email');
    
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete lead (Admin only)
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
