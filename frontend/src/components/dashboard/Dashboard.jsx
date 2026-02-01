import { useUser } from '../../context/UserContext'
import ProfileSummary from './ProfileSummary'
import ProfileStrength from './ProfileStrength'
import StageIndicator from './StageIndicator'
import TodoList from './TodoList'
import { Brain, School, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { profile, loading } = useUser()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!profile?.is_completed) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="card text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Complete Your Profile
          </h2>
          <p className="text-gray-600 mb-6">
            Please complete your onboarding to access the dashboard
          </p>
          <Link to="/onboarding" className="btn-primary inline-block">
            Complete Onboarding
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-600">
          Here's your study abroad journey progress
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link 
          to="/ai-counsellor" 
          className="card hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">AI Counsellor</h3>
              <p className="text-sm text-gray-600">Get instant guidance</p>
            </div>
          </div>
        </Link>

        <Link 
          to="/universities" 
          className="card hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <School className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Universities</h3>
              <p className="text-sm text-gray-600">Explore options</p>
            </div>
          </div>
        </Link>

        <Link 
          to="/application" 
          className="card hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Applications</h3>
              <p className="text-sm text-gray-600">Track progress</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Main Content Grid*/}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <StageIndicator currentStage={profile.current_stage} />
          <TodoList />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <ProfileSummary profile={profile} />
          <ProfileStrength profile={profile} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard