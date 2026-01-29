import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useUser } from '../../context/UserContext'
import { LogOut, User, Menu } from 'lucide-react'
import { useState } from 'react'
import logo from '../../assets/Arohan.png'


const Navbar = () => {
  const { user, logout } = useAuth()
  const { profile } = useUser()
  const [showMenu, setShowMenu] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <img 
  src={logo}
  alt="Arohan AI Logo"
  className="h-8 w-auto"
/>

<span className="ml-2 text-xl font-bold">Arohan-AI</span>

          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 font-medium">
              Dashboard
            </Link>
            <Link to="/ai-counsellor" className="text-gray-700 hover:text-primary-600 font-medium">
              AI Counsellor
            </Link>
            <Link to="/universities" className="text-gray-700 hover:text-primary-600 font-medium">
              Universities
            </Link>
            {profile?.is_completed && (
              <Link to="/application" className="text-gray-700 hover:text-primary-600 font-medium">
                Application
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user?.full_name}
                </span>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowMenu(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar