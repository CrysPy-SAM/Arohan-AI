import Navbar from '../components/common/Navbar'
import ApplicationGuidance from '../components/application/ApplicationGuidance'
import DocumentChecklist from '../components/application/DocumentChecklist'
import Timeline from '../components/application/Timeline'

const ApplicationGuidancePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Application Guidance</h1>
        
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ApplicationGuidance />
            <Timeline />
          </div>
          <div>
            <DocumentChecklist />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationGuidancePage