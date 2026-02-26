const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  messageId: {
    type: String,
    required: true
  }
}, { _id: false });

const whatsAppLogSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  direction: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
}, { _id: false });

const logSchema = new mongoose.Schema({
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
    required: true
  },
  emailLog: emailLogSchema,
  whatsAppLog: whatsAppLogSchema
}, {
  timestamps: true
});

module.exports = mongoose.model('Log', logSchema);
