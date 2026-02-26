import { Mail, MessageSquare, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Campaigns = () => {
  const navigate = useNavigate()
  
  const [campaigns] = useState([
    { id: 1, name: 'Summer Sale Campaign', type: 'email', sent: 450, opened: 320, status: 'completed', date: '2024-01-15' },
    { id: 2, name: 'New Property Launch', type: 'whatsapp', sent: 280, opened: 245, status: 'active', date: '2024-01-20' },
    { id: 3, name: 'Follow-up Campaign', type: 'email', sent: 150, opened: 98, status: 'scheduled', date: '2024-01-25' },
  ])

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-50 text-green-700',
      completed: 'bg-blue-50 text-blue-700',
      scheduled: 'bg-primary-50 text-primary-700',
      draft: 'bg-gray-50 text-gray-700'
    }
    return colors[status] || colors.draft
  }

  const handleViewDetails = (campaign) => {
    alert(`Campaign: ${campaign.name}\nType: ${campaign.type}\nSent: ${campaign.sent}\nOpened: ${campaign.opened}\nStatus: ${campaign.status}`)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Campaigns</h1>
          <p className="text-gray-600 mt-1">Create and manage your marketing campaigns</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Email Campaigns</h3>
              <p className="text-sm text-gray-600">Send bulk emails to leads</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/campaigns/email')}
            className="w-full py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
          >
            Create Email Campaign
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
              <MessageSquare size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">WhatsApp Campaigns</h3>
              <p className="text-sm text-gray-600">Send messages via WhatsApp</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/campaigns/whatsapp')}
            className="w-full py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
          >
            Create WhatsApp Campaign
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">Recent Campaigns</h3>
          <span className="text-sm text-gray-600">{campaigns.length} campaigns</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Campaign Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Type</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Sent</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Opened</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{campaign.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {campaign.type === 'email' ? (
                        <Mail size={16} className="text-gray-500" />
                      ) : (
                        <MessageSquare size={16} className="text-gray-500" />
                      )}
                      <span className="text-gray-700 capitalize">{campaign.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{campaign.sent}</td>
                  <td className="px-6 py-4 text-gray-700">{campaign.opened}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleViewDetails(campaign)}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Campaigns
