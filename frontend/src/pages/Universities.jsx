import { useState } from 'react'
import Navbar from '../components/common/Navbar'
import UniversityList from '../components/universities/UniversityList'
import ShortlistManager from '../components/universities/ShortlistManager'

const Universities = () => {
  const [view, setView] = useState('explore')

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Universities</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setView('explore')}
              className={`px-6 py-2 rounded-lg font-medium ${
                view === 'explore'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => setView('shortlist')}
              className={`px-6 py-2 rounded-lg font-medium ${
                view === 'shortlist'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              My Shortlist
            </button>
          </div>
        </div>

        {view === 'explore' ? <UniversityList /> : <ShortlistManager />}
      </div>
    </div>
  )
}

export default Universities