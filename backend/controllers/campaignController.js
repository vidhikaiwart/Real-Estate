const Lead = require('../models/Lead');
const { sendBulkEmail } = require('../config/sendgrid');
const { sendBulkWhatsAppMessages } = require('../config/twilio');

// Send email campaign (Admin only)
exports.sendEmailCampaign = async (req, res) => {
  try {
    const { subject, message, leadIds } = req.body;
    
    // Get leads to send email to
    const leads = await Lead.find({ _id: { $in: leadIds } });
    
    if (leads.length === 0) {
      return res.status(400).json({ message: 'No leads found' });
    }

    // Prepare recipients
    const recipients = leads.map(lead => ({
      email: lead.email,
      name: lead.name
    }));

    // Send emails via SendGrid
    try {
      await sendBulkEmail(recipients, subject, message);
      
      res.json({
        message: 'Email campaign sent successfully',
        count: leads.length,
        leads: leads.map(l => ({ id: l._id, email: l.email, name: l.name }))
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      res.status(500).json({ 
        message: 'Failed to send emails', 
        error: emailError.message 
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Send WhatsApp campaign (Admin only)
exports.sendWhatsAppCampaign = async (req, res) => {
  try {
    const { message, leadIds } = req.body;
    
    console.log('WhatsApp Campaign Request:');
    console.log('- Message:', message);
    console.log('- Lead IDs:', leadIds);
    
    // Validate input
    if (!message || !leadIds || leadIds.length === 0) {
      return res.status(400).json({ 
        message: 'Message and lead IDs are required',
        received: { message: !!message, leadIds: leadIds?.length || 0 }
      });
    }
    
    // Get leads to send WhatsApp to
    const leads = await Lead.find({ _id: { $in: leadIds } });
    
    console.log(`Found ${leads.length} leads in database`);
    
    if (leads.length === 0) {
      return res.status(400).json({ 
        message: 'No leads found with provided IDs',
        searchedIds: leadIds.length,
        foundLeads: 0
      });
    }

    // Check if leads have phone numbers
    const leadsWithPhone = leads.filter(lead => lead.phone);
    console.log(`${leadsWithPhone.length} leads have phone numbers`);
    
    if (leadsWithPhone.length === 0) {
      return res.status(400).json({ 
        message: 'None of the selected leads have phone numbers',
        totalLeads: leads.length,
        leadsWithPhone: 0
      });
    }

    // Send WhatsApp messages via Twilio
    try {
      console.log('Sending WhatsApp messages...');
      const result = await sendBulkWhatsAppMessages(leadsWithPhone, message);
      
      console.log('WhatsApp campaign result:', result);
      
      res.json({
        message: 'WhatsApp campaign sent successfully',
        total: result.total,
        sent: result.sent,
        failed: result.failed,
        leads: leadsWithPhone.map(l => ({ id: l._id, phone: l.phone, name: l.name }))
      });
    } catch (whatsappError) {
      console.error('WhatsApp sending failed:', whatsappError);
      res.status(500).json({ 
        message: 'Failed to send WhatsApp messages', 
        error: whatsappError.message,
        details: whatsappError.toString()
      });
    }
  } catch (error) {
    console.error('WhatsApp campaign error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
