const BudgetStep = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Budget (USD/year)
          </label>
          <input
            type="number"
            name="budget_min"
            value={formData.budget_min}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
            placeholder="20000"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Budget (USD/year)
          </label>
          <input
            type="number"
            name="budget_max"
            value={formData.budget_max}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
            placeholder="50000"
            min="0"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Funding Plan
          </label>
          <select
            name="funding_plan"
            value={formData.funding_plan}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
            required
          >
            <option value="">Select funding plan</option>
            <option value="Self-funded">Self-funded</option>
            <option value="Scholarship">Seeking Scholarship</option>
            <option value="Loan">Education Loan</option>
            <option value="Mixed">Mixed (Self + Scholarship/Loan)</option>
          </select>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Budget includes tuition fees and living expenses. 
          Consider additional costs for visa, travel, and health insurance.
        </p>
      </div>
    </div>
  )
}

export default BudgetStep