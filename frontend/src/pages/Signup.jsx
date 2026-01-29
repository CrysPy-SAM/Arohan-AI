import { Link } from 'react-router-dom'
import SignupForm from '../components/auth/SignupForm'
import { GraduationCap } from 'lucide-react'

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <GraduationCap className="w-10 h-10 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">AI Counsellor</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600">
            Start your study abroad journey today
          </p>
        </div>

        <div className="card">
          <SignupForm />
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup