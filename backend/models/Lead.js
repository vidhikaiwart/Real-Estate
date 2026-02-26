const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  propertyType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'followup', 'visit', 'negotiation', 'closed', 'lost'],
    default: 'new',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  source: {
    type: String
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Lead', leadSchema);
