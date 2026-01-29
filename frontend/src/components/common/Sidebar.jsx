import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  MessageCircle, 
  School, 
  FileText, 
  User,
  CheckSquare 
} from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()

  const links = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/ai-counsellor', icon: MessageCircle, label: 'AI Counsellor' },
    { to: '/universities', icon: School, label: 'Universities' },
    { to: '/application', icon: FileText, label: 'Application' },
    { to: '/profile', icon: User, label: 'Profile' },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <div className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = location.pathname === link.to
          
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}

export default Sidebar