import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Search } from 'lucide-react'
import { leadsAPI, campaignsAPI } from '../utils/api'

const EmailCampaign = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    leadIds: []
  })
  const [leads, setLeads] = useState([])
  const [selectedLeads, setSelectedLeads] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Fetch leads from API
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const data = await leadsAPI.getAll()
        setLeads(data)
      } catch (error) {
        console.error('Failed to fetch leads:', error)
        setError('Failed to load leads')
      }
    }
    fetchLeads()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const toggleLeadSelection = (leadId) => {
    setSelectedLeads(prev => {
      if (prev.includes(leadId)) {
        return prev.filter(id => id !== leadId)
      } else {
        return [...prev, leadId]
      }
    })
  }

  const selectAllLeads = () => {
    const filteredLeadIds = filteredLeads.map(lead => lead._id)
    setSelectedLeads(filteredLeadIds)
  }

  const deselectAllLeads = () => {
    setSelectedLeads([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (selectedLeads.length === 0) {
      setError('Please select at least one lead')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const data = await campaignsAPI.sendEmail(
        formData.subject,
        formData.message,
        selectedLeads
      )

      console.log('Email campaign response:', data)
      setSuccess(`Email campaign sent successfully to ${data.count || selectedLeads.length} leads!`)
      setTimeout(() => {
        navigate('/campaigns')
      }, 1500)
    } catch (err) {
      setError(err.message || 'Failed to send email campaign')
    } finally {
      setLoading(false)
    }
  }

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="mb-8">
        <button 
          onClick={() => navigate('/campaigns')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Campaigns
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600">
            <Mail size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Email Campaign</h1>
            <p className="text-gray-600 mt-1">Send bulk emails to selected leads</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Campaign Details</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter email subject"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="10"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Enter your email message..."
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading || selectedLeads.length === 0}
                  className="px-6 py-2.5 bg-primary-500 text-gray-900 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : `Send to ${selectedLeads.length} Lead${selectedLeads.length !== 1 ? 's' : ''}`}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/campaigns')}
                  className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Lead Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Select Leads</h3>
              <span className="text-sm text-gray-600">{selectedLeads.length} selected</span>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                placeholder="Search leads..."
              />
            </div>

            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={selectAllLeads}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={deselectAllLeads}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredLeads.map((lead) => (
                <label
                  key={lead._id}
                  className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedLeads.includes(lead._id)}
                    onChange={() => toggleLeadSelection(lead._id)}
                    className="mt-1 w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{lead.name}</p>
                    <p className="text-xs text-gray-600 truncate">{lead.email}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailCampaign
