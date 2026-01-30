import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import ProtectedRoute from './components/common/ProtectedRoute'

// Pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import AICounsellor from './pages/AICounsellor'
import Universities from './pages/Universities'
import ApplicationGuidance from './pages/ApplicationGuidance'
import Profile from './pages/Profile'

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route path="/onboarding" element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/ai-counsellor" element={
            <ProtectedRoute>
              <AICounsellor />
            </ProtectedRoute>
          } />
          
          <Route path="/universities" element={
            <ProtectedRoute>
              <Universities />
            </ProtectedRoute>
          } />
          
          <Route path="/application" element={
            <ProtectedRoute>
              <ApplicationGuidance />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          {/* 404 Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </UserProvider>
    </AuthProvider>
  )
}

export default App 