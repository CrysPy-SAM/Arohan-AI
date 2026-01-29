const Timeline = () => {
  const timeline = [
    { month: 'Month 1-2', task: 'Research & Shortlist Universities' },
    { month: 'Month 3-4', task: 'Prepare Documents & Test Scores' },
    { month: 'Month 5-6', task: 'Write SOP & Get Recommendations' },
    { month: 'Month 7-8', task: 'Submit Applications' },
    { month: 'Month 9-10', task: 'Wait for Decisions & Apply for Visa' }
  ]

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Application Timeline</h3>
      <div className="space-y-4">
        {timeline.map((item, index) => (
          <div key={index} className="flex gap-4">
            <div className="w-24 text-sm font-semibold text-primary-600">
              {item.month}
            </div>
            <div className="flex-1 text-gray-700">
              {item.task}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline