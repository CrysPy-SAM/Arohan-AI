const AcademicStep = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Education Level
          </label>
          <select
            name="education_level"
            value={formData.education_level}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
            required
          >
            <option value="">Select level</option>
            <option value="Bachelors">Bachelor's Degree</option>
            <option value="Masters">Master's Degree</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Degree Title
          </label>
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
            placeholder="B.Tech, B.Sc, etc."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Major/Specialization
          </label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
            placeholder="Computer Science, Mechanical, etc."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Graduation Year
          </label>
          <input
            type="number"
            name="graduation_year"
            value={formData.graduation_year}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
            min="2000"
            max="2030"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GPA (on 4.0 scale)
          </label>
          <input
            type="number"
            name="gpa"
            value={formData.gpa}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
            placeholder="3.5"
            step="0.01"
            min="0"
            max="4"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Convert your percentage to 4.0 scale</p>
        </div>
      </div>
    </div>
  )
}

export default AcademicStep