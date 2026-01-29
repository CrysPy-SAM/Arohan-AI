const ExamReadinessStep = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-6">
      {/* IELTS */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">IELTS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="ielts_status"
              value={formData.ielts_status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
            >
              <option value="Not Started">Not Started</option>
              <option value="Preparing">Preparing</option>
              <option value="Scheduled">Test Scheduled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Score (if completed)
            </label>
            <input
              type="number"
              name="ielts_score"
              value={formData.ielts_score}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
              placeholder="7.5"
              step="0.5"
              min="0"
              max="9"
              disabled={formData.ielts_status !== 'Completed'}
            />
          </div>
        </div>
      </div>

      {/* GRE */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">GRE</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="gre_status"
              value={formData.gre_status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
            >
              <option value="Not Started">Not Started</option>
              <option value="Preparing">Preparing</option>
              <option value="Scheduled">Test Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Not Required">Not Required</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Score (if completed)
            </label>
            <input
              type="number"
              name="gre_score"
              value={formData.gre_score}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
              placeholder="320"
              min="260"
              max="340"
              disabled={formData.gre_status !== 'Completed'}
            />
          </div>
        </div>
      </div>

      {/* SOP */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Statement of Purpose (SOP)</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            name="sop_status"
            value={formData.sop_status}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
          >
            <option value="Not Started">Not Started</option>
            <option value="Drafting">Drafting</option>
            <option value="Under Review">Under Review</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default ExamReadinessStep