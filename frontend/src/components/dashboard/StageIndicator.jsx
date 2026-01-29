import { CheckCircle, Circle } from 'lucide-react'

const StageIndicator = ({ currentStage }) => {
  const stages = [
    'Building Profile',
    'Discovering Universities',
    'Finalizing Universities',
    'Preparing Applications',
    'Submitting Applications'
  ]

  const currentIndex = stages.indexOf(currentStage)

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Journey</h2>
      <div className="space-y-3">
        {stages.map((stage, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex
          
          return (
            <div key={index} className="flex items-center gap-3">
              {isCompleted ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : isCurrent ? (
                <Circle className="w-6 h-6 text-primary-600 fill-current" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300" />
              )}
              <span
                className={`font-medium ${
                  isCurrent ? 'text-primary-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                {stage}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StageIndicator