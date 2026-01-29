const LockUniversityModal = ({ university, onLock, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Lock University?</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to lock <strong>{university.name}</strong>? 
          This will move you to the application preparation stage.
        </p>
        <div className="flex gap-4">
          <button onClick={onClose} className="btn-secondary flex-1">
            Cancel
          </button>
          <button onClick={onLock} className="btn-primary flex-1">
            Lock University
          </button>
        </div>
      </div>
    </div>
  )
}

export default LockUniversityModal