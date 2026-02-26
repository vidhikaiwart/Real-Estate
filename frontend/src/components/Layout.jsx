import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, Mail, UserCog, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Layout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-primary-100 border-r border-primary-200 fixed h-screen left-0 top-0">
        <div className="p-6 pb-8 border-b border-primary-200 mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Real Estate CRM</h2>
          {user && (
            <p className="text-sm text-gray-600 mt-1">{user.name}</p>
          )}
        </div>
        <nav className="flex flex-col gap-1 px-4">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-[15px] transition-all ${
                isActive 
                  ? 'bg-primary-500 text-gray-900' 
                  : 'text-gray-700 hover:bg-primary-200 hover:text-gray-900'
              }`
            }
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink 
            to="/leads" 
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-[15px] transition-all ${
                isActive 
                  ? 'bg-primary-500 text-gray-900' 
                  : 'text-gray-700 hover:bg-primary-200 hover:text-gray-900'
              }`
            }
          >
            <Users size={20} />
            <span>Leads</span>
          </NavLink>
          <NavLink 
            to="/campaigns" 
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-[15px] transition-all ${
                isActive 
                  ? 'bg-primary-500 text-gray-900' 
                  : 'text-gray-700 hover:bg-primary-200 hover:text-gray-900'
              }`
            }
          >
            <Mail size={20} />
            <span>Campaigns</span>
          </NavLink>
          <NavLink 
            to="/staff" 
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-[15px] transition-all ${
                isActive 
                  ? 'bg-primary-500 text-gray-900' 
                  : 'text-gray-700 hover:bg-primary-200 hover:text-gray-900'
              }`
            }
          >
            <UserCog size={20} />
            <span>Staff</span>
          </NavLink>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-[15px] text-gray-700 hover:bg-primary-200 hover:text-gray-900 transition-all w-full"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 ml-64 p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
