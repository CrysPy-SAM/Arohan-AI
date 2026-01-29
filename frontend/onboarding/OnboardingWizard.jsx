import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { completeOnboarding } from '../../services/userService'
import toast from 'react-hot-toast'
import AcademicStep from './AcademicStep'
import StudyGoalStep from './StudyGoalStep'
import BudgetStep from './BudgetStep'
import ExamReadinessStep from './ExamReadinessStep'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const OnboardingWizard = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Academic
    education_level: '',
    degree: '',
    major: '',
    graduation_year: new Date().getFullYear(),
    gpa: '',
    
    // Study Goals
    intended_degree: '',
    field_of_study: '',
    target_intake_year: new Date().getFullYear() + 1,
    preferred_countries: [],
    
    // Budget
    budget_min: '',
    budget_max: '',
    funding_plan: '',
    
    // Exams
    ielts_status: 'Not Started',
    ielts_score: '',
    gre_status: 'Not Started',
    gre_score: '',
    sop_status: 'Not Started'
  })

  const steps = [
    { title: 'Academic Background', component: AcademicStep },
    { title: 'Study Goals', component: StudyGoalStep },
    { title: 'Budget Planning', component: BudgetStep },
    { title: 'Exam Readiness', component: ExamReadinessStep }
  ]

  const CurrentStepComponent = steps[currentStep].component

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await completeOnboarding(formData)
      toast.success('Profile created successfully!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Onboarding failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex-1 text-center ${
                  index <= currentStep ? 'text-primary-600' : 'text-gray-400'
                }`}
              >
                <div className={`text-sm font-medium ${index > 0 ? 'hidden sm:block' : ''}`}>
                  {step.title}
                </div>
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-primary-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {steps[currentStep].title}
          </h2>

          <CurrentStepComponent formData={formData} setFormData={setFormData} />

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Completing...' : 'Complete Profile'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingWizard