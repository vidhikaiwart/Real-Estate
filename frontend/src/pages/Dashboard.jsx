import StatCard from '../components/StatCard'
import { Users, TrendingUp, UserCheck, Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { leadsAPI } from '../utils/api'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [recentLeads, setRecentLeads] = useState([])
  const [leadStats, setLeadStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    fetchDashboardData()
  }, [navigate])

  const fetchDashboardData = async () => {
    try {
      const leads = await leadsAPI.getAll()
      
      // Get recent 4 leads
      setRecentLeads(leads.slice(0, 4).map(lead => ({
        id: lead._id,
        name: lead.name,
        budget: lead.budget.toLocaleString(),
        status: lead.status
      })))

      // Calculate lead stats by status
      const statusCounts = leads.reduce((acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1
        return acc
      }, {})

      const stats = [
        { status: 'New', count: statusCounts.new || 0, color: 'bg-blue-500' },
        { status: 'Contacted', count: statusCounts.contacted || 0, color: 'bg-primary-500' },
        { status: 'Negotiation', count: statusCounts.negotiation || 0, color: 'bg-orange-500' },
        { status: 'Closed', count: statusCounts.closed || 0, color: 'bg-green-500' }
      ]
      setLeadStats(stats)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
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
      closed: 'bg-green-50 text-green-700'
    }
    return colors[status] || colors.new
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back{user ? `, ${user.name}` : ''}! Here's your overview</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-700 mb-2">{error}</p>
            {error.includes('login') && (
              <p className="text-sm text-red-600">Redirecting to login...</p>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Leads" 
              value={leadStats.reduce((sum, item) => sum + item.count, 0).toString()} 
              icon={Users}
              trend="+12% from last month"
            />
            <StatCard 
              title="Conversion Rate" 
              value="24.5%" 
              icon={TrendingUp}
              trend="+3.2% from last month"
            />
            <StatCard 
              title="Staff Performance" 
              value="87%" 
              icon={UserCheck}
              trend="Above target"
            />
            <StatCard 
              title="Followups Today" 
              value="18" 
              icon={Calendar}
              trend="5 completed"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Leads</h3>
                <button 
                  onClick={() => window.location.href = '/leads'}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  View All
                </button>
              </div>
              {recentLeads.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No leads yet</p>
              ) : (
                <div className="space-y-3">
                  {recentLeads.map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 rounded transition-colors cursor-pointer">
                      <div>
                        <p className="font-medium text-gray-900">{lead.name}</p>
                        <p className="text-sm text-gray-600">Budget: {lead.budget}</p>
                      </div>
                      <span className={`px-3 py-1 ${getStatusColor(lead.status)} text-sm rounded-full font-medium capitalize`}>
                        {lead.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Lead Status</h3>
                <span className="text-sm text-gray-600">Total: {leadStats.reduce((sum, item) => sum + item.count, 0)}</span>
              </div>
              <div className="space-y-4">
                {leadStats.map((item) => (
                  <div key={item.status} className="hover:bg-gray-50 p-2 rounded transition-colors">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700 font-medium">{item.status}</span>
                      <span className="text-gray-600">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className={`${item.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${leadStats.reduce((sum, i) => sum + i.count, 0) > 0 ? (item.count / leadStats.reduce((sum, i) => sum + i.count, 0)) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
