import Navbar from '../components/common/Navbar'
import Dashboard from '../components/dashboard/Dashboard'

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Dashboard />
    </div>
  )
}

export default DashboardPage