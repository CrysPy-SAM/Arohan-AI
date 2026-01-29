import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { login as loginApi, signup as signupApi, getCurrentUser } from '../services/authService'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const userData = await getCurrentUser()
          setUser(userData)
        } catch (error) {
          console.error('Auth check failed:', error)
          logout()
        }
      }
      setLoading(false)
    }
    
    checkAuth()
  }, [token])

  const login = async (credentials) => {
    try {
      const data = await loginApi(credentials)
      
      localStorage.setItem('token', data.token)
      setToken(data.token)
      setUser(data.user)
      
      toast.success('Login successful!')
      
      // Redirect based on profile completion
      if (!data.profile.is_completed) {
        navigate('/onboarding')
      } else {
        navigate('/dashboard')
      }
      
      return data
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      throw error
    }
  }

  const signup = async (userData) => {
    try {
      const data = await signupApi(userData)
      
      localStorage.setItem('token', data.token)
      setToken(data.token)
      setUser(data.user)
      
      toast.success('Account created successfully!')
      navigate('/onboarding')
      
      return data
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed'
      toast.error(message)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    toast.success('Logged out successfully')
    navigate('/')
  }

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!token
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}