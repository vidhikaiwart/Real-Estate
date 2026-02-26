import { Search, Filter, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { leadsAPI } from '../utils/api'

const Leads = () => {
  const navigate = useNavigate()
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    fetchLeads()
  }, [navigate])

  const fetchLeads = async () => {
    try {
      const data = await leadsAPI.getAll()
      setLeads(data)
    } catch (error) {
      console.error('Failed to fetch leads:', error)
      setError(error.message)
      if (error.message.includes('login')) {
        setTimeout(() => navigate('/login'), 2000)
      }
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-50 text-blue-700',
      contacted: 'bg-primary-50 text-primary-700',
      followup: 'bg-purple-50 text-purple-700',
      negotiation: 'bg-orange-50 text-orange-700',
      closed: 'bg-green-50 text-green-700',
      lost: 'bg-gray-50 text-gray-700'
    }
    return colors[status] || colors.new
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Leads</h1>
          <p className="text-gray-600 mt-1">Manage and track your leads</p>
        </div>
        <button 
          onClick={() => navigate('/leads/add')}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-gray-900 rounded-lg font-medium hover:bg-primary-600 transition-colors"
        >
          <Plus size={20} />
          Add Lead
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={20} />
            Filter
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No leads found. Create your first lead!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Contact</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Budget</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Property Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{lead.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{lead.email}</div>
                      <div className="text-sm text-gray-500">{lead.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-medium">{lead.budget.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-700">{lead.propertyType}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Leads
