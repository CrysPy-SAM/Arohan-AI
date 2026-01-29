const ProfileStrength = ({ profile }) => {
  if (!profile) return null

  const strengths = [
    { label: 'Academic', value: profile.academic_strength, color: 'blue' },
    { label: 'Exams', value: profile.exam_strength, color: 'green' },
    { label: 'Overall', value: profile.overall_readiness, color: 'purple' }
  ]

  const getColorClass = (color, type) => {
    const colors = {
      blue: type === 'bg' ? 'bg-blue-100' : 'text-blue-700',
      green: type === 'bg' ? 'bg-green-100' : 'text-green-700',
      purple: type === 'bg' ? 'bg-purple-100' : 'text-purple-700'
    }
    return colors[color]
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Strength</h2>
      <div className="space-y-4">
        {strengths.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <span className={`text-sm font-semibold ${getColorClass(item.color, 'text')}`}>
                {item.value || 'Not assessed'}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${getColorClass(item.color, 'bg').replace('100', '600')}`}
                style={{
                  width: item.value === 'Strong' ? '80%' : item.value === 'Average' ? '50%' : '20%'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {profile.improvement_areas?.length > 0 && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-sm font-semibold text-yellow-900 mb-2">Areas to Improve</h3>
          <ul className="text-sm text-yellow-800 space-y-1">
            {profile.improvement_areas.map((area, index) => (
              <li key={index}>• {area}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ProfileStrength