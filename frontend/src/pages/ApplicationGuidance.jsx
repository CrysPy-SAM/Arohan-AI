import { FileText, CheckCircle } from 'lucide-react'
import { useUser } from '../context/UserContext'
import { Navigate } from 'react-router-dom'


const ApplicationGuidance = () => {
  const steps = [
    { title: 'Complete Application Form', status: 'pending' },
    { title: 'Write Statement of Purpose', status: 'pending' },
    { title: 'Obtain Letters of Recommendation', status: 'pending' },
    { title: 'Submit Test Scores', status: 'pending' },
    { title: 'Pay Application Fee', status: 'pending' }
  ]
  const { lockedUniversity } = useUser()

if (!lockedUniversity) {
  return <Navigate to="/universities" replace />
}


  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-8 h-8 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900">Application Checklist</h2>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
            <CheckCircle className="w-6 h-6 text-gray-400" />
            <span className="font-medium text-gray-900">{step.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ApplicationGuidance