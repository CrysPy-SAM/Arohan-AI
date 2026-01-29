import { useState, useEffect } from 'react'
import { getShortlist, lockUniversity, removeFromShortlist } from '../../services/universityService'
import { Lock, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

const ShortlistManager = () => {
  const [shortlist, setShortlist] = useState({ dream: [], target: [], safe: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchShortlist()
  }, [])

  const fetchShortlist = async () => {
    try {
      const data = await getShortlist()
      setShortlist(data.data.grouped)
    } catch (error) {
      toast.error('Failed to load shortlist')
    } finally {
      setLoading(false)
    }
  }

  const handleLock = async (id) => {
    try {
      await lockUniversity(id)
      await fetchShortlist()
      toast.success('University locked!')
    } catch (error) {
      toast.error('Failed to lock university')
    }
  }

  const handleRemove = async (id) => {
    if (!confirm('Remove this university from shortlist?')) return
    try {
      await removeFromShortlist(id)
      await fetchShortlist()
      toast.success('Removed from shortlist')
    } catch (error) {
      toast.error('Failed to remove')
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      {Object.entries(shortlist).map(([category, universities]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 capitalize">
            {category} ({universities.length})
          </h3>
          <div className="space-y-3">
            {universities.map(item => (
              <div key={item.id} className="card flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-gray-900">{item.university.name}</h4>
                  <p className="text-sm text-gray-600">{item.university.country}</p>
                </div>
                <div className="flex gap-2">
                  {!item.is_locked && (
                    <>
                      <button
                        onClick={() => handleLock(item.id)}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                      >
                        <Lock className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  {item.is_locked && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      Locked
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShortlistManager