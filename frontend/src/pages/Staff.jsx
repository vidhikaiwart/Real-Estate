import { UserPlus, Award } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { usersAPI } from '../utils/api'
import { useAuth } from '../context/AuthContext'

const Staff = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchStaff()
  }, [])

  const fetchStaff = async () => {
    try {
      console.log('Fetching staff members...')
      console.log('Current user:', user)
      console.log('Token:', localStorage.getItem('token'))
      
      const data = await usersAPI.getAll()
      console.log('Staff data received:', data)
      setStaff(data)
      setError('')
    } catch (error) {
      console.error('Failed to fetch staff:', error)
      setError(error.message || 'Failed to load staff members')
    } finally {
      setLoading(false)
    }
  }

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return 'text-green-600'
    if (performance >= 75) return 'text-primary-600'
    return 'text-orange-600'
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-1">Manage your team and track performance</p>
        </div>
        {user?.role === 'admin' && (
          <button 
            onClick={() => navigate('/staff/add')}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-gray-900 rounded-lg font-medium hover:bg-primary-600 transition-colors"
          >
            <UserPlus size={20} />
            Add Staff
          </button>
        )}
      </div>

      {user?.role !== 'admin' && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
          <p className="font-medium">Admin Access Required</p>
          <p className="text-sm mt-1">Only administrators can view and manage staff members.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600">
              <Award size={20} />
            </div>
            <span className="text-sm font-medium text-gray-600">Top Performer</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900 mb-1">Coming Soon</p>
          <p className="text-sm text-gray-600">Performance tracking</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <p className="text-sm font-medium text-gray-600 mb-3">Total Staff</p>
          <p className="text-3xl font-semibold text-gray-900 mb-2">{staff.length}</p>
          <p className="text-sm text-gray-600">{staff.filter(s => s.isActive).length} Active</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <p className="text-sm font-medium text-gray-600 mb-3">Roles</p>
          <p className="text-3xl font-semibold text-gray-900 mb-2">{staff.filter(s => s.role === 'admin').length}</p>
          <p className="text-sm text-gray-600">Admins</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Team Members</h3>
        </div>
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading staff...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 inline-block">
              {error}
            </div>
            <p className="text-gray-600 text-sm">
              {error.includes('Failed to fetch') ? 'Please check your connection and try again.' : 'Only admins can view staff members.'}
            </p>
          </div>
        ) : staff.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No staff members found. Add your first team member!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {staff.map((member) => (
                  <tr key={member._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-medium">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-gray-900">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{member.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        member.role === 'admin' 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        member.isActive 
                          ? 'bg-green-50 text-green-700' 
                          : 'bg-red-50 text-red-700'
                      }`}>
                        {member.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                        Manage
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

export default Staff
