import Navbar from '../components/common/Navbar'
import AIChatInterface from '../components/ai-counsellor/AIChatInterface'
import ActionButtons from '../components/ai-counsellor/ActionButtons'

const AICounsellor = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Counsellor</h1>
            <p className="text-gray-600">Get instant, personalized guidance for your study abroad journey</p>
          </div>

          <AIChatInterface />
          <ActionButtons />
        </div>
      </div>
    </div>
  )
}

export default AICounsellor