const DocumentChecklist = () => {
  const documents = [
    'Academic Transcripts',
    'Degree Certificate',
    'IELTS/TOEFL Score Report',
    'GRE Score Report (if required)',
    'Statement of Purpose',
    'Letters of Recommendation (2-3)',
    'Resume/CV',
    'Passport Copy',
    'Financial Documents'
  ]

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Documents</h3>
      <ul className="space-y-2">
        {documents.map((doc, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-700">
            <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
            {doc}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DocumentChecklist