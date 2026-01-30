import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { getProfile } from '../services/userService'

const UserContext = createContext(null)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchProfile()
    }
  }, [isAuthenticated, user])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const data = await getProfile()
      setProfile(data)
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = (newProfile) => {
    setProfile(newProfile)
  }

  const value = {
    profile,
    loading,
    fetchProfile,
    updateProfile,
    isProfileCompleted: profile?.is_completed || false,
    currentStage: profile?.current_stage || 'Building Profile',
    lockedUniversity: profile?.locked_university || null

  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}