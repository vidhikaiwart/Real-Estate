// API utility functions

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

// Leads API
export const leadsAPI = {
  getAll: async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Please login first to view leads')
    }
    
    const response = await fetch('/api/leads', {
      headers: getAuthHeaders()
    })
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Please login to view leads')
      }
      if (response.status === 403) {
        throw new Error('You do not have permission to view all leads')
      }
      throw new Error('Failed to fetch leads')
    }
    return response.json()
  },

  getMyLeads: async () => {
    const response = await fetch('/api/leads/my-leads', {
      headers: getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch my leads')
    return response.json()
  },

  getById: async (id) => {
    const response = await fetch(`/api/leads/${id}`, {
      headers: getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch lead')
    return response.json()
  },

  create: async (leadData) => {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(leadData)
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      console.error('Create lead error:', data)
      
      // Handle specific error cases
      if (response.status === 401) {
        throw new Error('Please login to create leads')
      }
      if (response.status === 403) {
        throw new Error('You do not have permission to create leads')
      }
      if (data.errors) {
        const errorMessages = data.errors.map(e => `${e.field}: ${e.message}`).join(', ')
        throw new Error(errorMessages)
      }
      
      throw new Error(data.message || 'Failed to create lead')
    }
    return response.json()
  },

  update: async (id, leadData) => {
    const response = await fetch(`/api/leads/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(leadData)
    })
    if (!response.ok) throw new Error('Failed to update lead')
    return response.json()
  },

  delete: async (id) => {
    const response = await fetch(`/api/leads/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to delete lead')
    return response.json()
  }
}

// Campaigns API
export const campaignsAPI = {
  sendEmail: async (subject, message, leadIds) => {
    const response = await fetch('/api/campaigns/email', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ subject, message, leadIds })
    })
    if (!response.ok) throw new Error('Failed to send email campaign')
    return response.json()
  },

  sendWhatsApp: async (message, leadIds) => {
    const response = await fetch('/api/campaigns/whatsapp', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ message, leadIds })
    })
    if (!response.ok) throw new Error('Failed to send WhatsApp campaign')
    return response.json()
  }
}

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (!response.ok) throw new Error('Login failed')
    return response.json()
  },

  register: async (name, email, password, role) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    })
    if (!response.ok) throw new Error('Registration failed')
    return response.json()
  },

  getMe: async () => {
    const response = await fetch('/api/auth/me', {
      headers: getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch user')
    return response.json()
  }
}

// Users API
export const usersAPI = {
  getAll: async () => {
    const response = await fetch('/api/users', {
      headers: getAuthHeaders()
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.message || 'Failed to fetch users')
    }
    return response.json()
  }
}
