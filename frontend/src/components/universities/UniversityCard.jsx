import { MapPin, DollarSign, Star, Plus, Check } from 'lucide-react'

const UniversityCard = ({ university, onAdd, isShortlisted }) => {
  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{university.name}</h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{university.country}</span>
          </div>
        </div>
        {university.ranking && (
          <div className="flex items-center gap-1 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium">
            <Star className="w-4 h-4" />
            <span>#{university.ranking}</span>
          </div>
        )}
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-700">
          <DollarSign className="w-4 h-4" />
          <span>${university.tuition_fee_min?.toLocaleString()} - ${university.tuition_fee_max?.toLocaleString()}/year</span>
        </div>
        <div className="text-gray-600">
          <p>Min GPA: {university.min_gpa}</p>
          <p>Min IELTS: {university.min_ielts}</p>
          <p>Acceptance Rate: {(university.acceptance_rate * 100).toFixed(1)}%</p>
        </div>
      </div>

      <button
        onClick={() => onAdd(university)}
        disabled={isShortlisted}
        className={`mt-4 w-full py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
          isShortlisted
            ? 'bg-green-100 text-green-700 cursor-not-allowed'
            : 'bg-primary-600 text-white hover:bg-primary-700'
        }`}
      >
        {isShortlisted ? (
          <>
            <Check className="w-5 h-5" />
            Shortlisted
          </>
        ) : (
          <>
            <Plus className="w-5 h-5" />
            Add to Shortlist
          </>
        )}
      </button>
    </div>
  )
}

export default UniversityCard