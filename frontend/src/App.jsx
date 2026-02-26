import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Leads from './pages/Leads'
import AddLead from './pages/AddLead'
import Campaigns from './pages/Campaigns'
import EmailCampaign from './pages/EmailCampaign'
import WhatsAppCampaign from './pages/WhatsAppCampaign'
import Staff from './pages/Staff'
import AddStaff from './pages/AddStaff'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="leads" element={<Leads />} />
            <Route path="leads/add" element={<AddLead />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="campaigns/email" element={<EmailCampaign />} />
            <Route path="campaigns/whatsapp" element={<WhatsAppCampaign />} />
            <Route path="staff" element={<Staff />} />
            <Route path="staff/add" element={<AddStaff />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
