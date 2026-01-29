import { Link } from 'react-router-dom'
import { School, FileText, Calendar } from 'lucide-react'

const ActionButtons = () => {
  const actions = [
    { icon: School, label: 'Explore Universities', to: '/universities', color: 'primary' },
    { icon: FileText, label: 'View Application Guide', to: '/application', color: 'green' },
    { icon: Calendar, label: 'Check Deadlines', to: '/dashboard', color: 'purple' }
  ]

  return (
    <div className="grid md:grid-cols-3 gap-4 mt-6">
      {actions.map((action, index) => {
        const Icon = action.icon
        return (
          <Link
            key={index}
            to={action.to}
            className="card hover:shadow-md transition-shadow text-center"
          >
            <div className={`w-12 h-12 bg-${action.color}-100 rounded-lg flex items-center justify-center mx-auto mb-3`}>
              <Icon className={`w-6 h-6 text-${action.color}-600`} />
            </div>
            <p className="font-semibold text-gray-900">{action.label}</p>
          </Link>
        )
      })}
    </div>
  )
}

export default ActionButtons