import OnboardingWizard from '../components/onboarding/OnboardingWizard'
import Navbar from '../components/common/Navbar'

const Onboarding = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <OnboardingWizard />
    </div>
  )
}

export default Onboarding