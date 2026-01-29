import { GraduationCap, MapPin, DollarSign } from 'lucide-react'

const ProfileSummary = ({ profile }) => {
  if (!profile) return null

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Summary</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <GraduationCap className="w-5 h-5 text-primary-600 mt-1" />
          <div>
            <p className="text-sm text-gray-600">Target Degree</p>
            <p className="font-semibold text-gray-900">
              {profile.intended_degree} in {profile.field_of_study}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-primary-600 mt-1" />
          <div>
            <p className="text-sm text-gray-600">Preferred Countries</p>
            <p className="font-semibold text-gray-900">
              {profile.preferred_countries?.join(', ') || 'Not specified'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <DollarSign className="w-5 h-5 text-primary-600 mt-1" />
          <div>
            <p className="text-sm text-gray-600">Budget</p>
            <p className="font-semibold text-gray-900">
              ${profile.budget_min?.toLocaleString()} - ${profile.budget_max?.toLocaleString()}/year
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSummary