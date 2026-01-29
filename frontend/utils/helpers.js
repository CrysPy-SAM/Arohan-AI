import { format } from 'date-fns'

// Format currency
export const formatCurrency = (amount) => {
  if (!amount) return '$0'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Format date
export const formatDate = (date) => {
  if (!date) return ''
  return format(new Date(date), 'MMM dd, yyyy')
}

// Get user initials
export const getInitials = (name) => {
  if (!name) return '?'
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// Calculate match percentage
export const calculateMatchPercentage = (userGPA, uniMinGPA, userIELTS, uniMinIELTS) => {
  let score = 50 // Base score

  // GPA matching
  if (userGPA >= uniMinGPA + 0.5) score += 25
  else if (userGPA >= uniMinGPA) score += 15
  else if (userGPA >= uniMinGPA - 0.2) score += 5
  else score -= 15

  // IELTS matching
  if (userIELTS >= uniMinIELTS + 1) score += 25
  else if (userIELTS >= uniMinIELTS) score += 15
  else if (userIELTS >= uniMinIELTS - 0.5) score += 5
  else score -= 15

  return Math.max(0, Math.min(100, score))
}

// Get strength color
export const getStrengthColor = (strength) => {
  switch (strength) {
    case 'Strong':
      return 'text-green-600 bg-green-100'
    case 'Average':
      return 'text-yellow-600 bg-yellow-100'
    case 'Weak':
      return 'text-red-600 bg-red-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

// Get priority color
export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'text-red-600 bg-red-100'
    case 'Medium':
      return 'text-yellow-600 bg-yellow-100'
    case 'Low':
      return 'text-green-600 bg-green-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

// Get category color
export const getCategoryColor = (category) => {
  switch (category) {
    case 'Dream':
      return 'text-purple-600 bg-purple-100'
    case 'Target':
      return 'text-blue-600 bg-blue-100'
    case 'Safe':
      return 'text-green-600 bg-green-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

// Calculate days remaining
export const daysRemaining = (date) => {
  if (!date) return null
  const today = new Date()
  const targetDate = new Date(date)
  const diffTime = targetDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Get status badge color
export const getStatusBadgeColor = (status) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800'
    case 'In Progress':
      return 'bg-blue-100 text-blue-800'
    case 'Not Started':
      return 'bg-gray-100 text-gray-800'
    case 'Overdue':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}