const StudyGoalStep = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCountryChange = (country) => {
    const countries = formData.preferred_countries.includes(country)
      ? formData.preferred_countries.filter(c => c !== country)
      : [...formData.preferred_countries, country]
    setFormData({ ...formData, preferred_countries: countries })
  }

  const availableCountries = ['USA', 'UK', 'Canada', 'Australia', 'Germany']

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Degree
          </label>
          <select
            name="intended_degree"
            value={formData.intended_degree}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
            required
          >
            <option value="">Select degree</option>
            <option value="Masters">Master's</option>
            <option value="PhD">PhD</option>
            <option value="MBA">MBA</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Field of Study
          </label>
          <input
            type="text"
            name="field_of_study"
            value={formData.field_of_study}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
            placeholder="Computer Science, Business, etc."
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Intake Year
          </label>
          <select
            name="target_intake_year"
            value={formData.target_intake_year}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
            required
          >
            {[0, 1, 2].map(offset => {
              const year = new Date().getFullYear() + offset
              return <option key={year} value={year}>{year}</option>
            })}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Preferred Countries (select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableCountries.map(country => (
              <button
                key={country}
                type="button"
                onClick={() => handleCountryChange(country)}
                className={`px-4 py-3 rounded-lg border-2 transition-all ${
                  formData.preferred_countries.includes(country)
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudyGoalStep