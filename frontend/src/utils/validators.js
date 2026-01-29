// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Password validation
export const validatePassword = (password) => {
  // At least 8 characters
  return password && password.length >= 8
}

// GPA validation
export const validateGPA = (gpa) => {
  const gpaNum = parseFloat(gpa)
  return !isNaN(gpaNum) && gpaNum >= 0 && gpaNum <= 4.0
}

// IELTS validation
export const validateIELTS = (score) => {
  const scoreNum = parseFloat(score)
  return !isNaN(scoreNum) && scoreNum >= 0 && scoreNum <= 9.0
}

// GRE validation
export const validateGRE = (score) => {
  const scoreNum = parseInt(score)
  return !isNaN(scoreNum) && scoreNum >= 260 && scoreNum <= 340
}

// Phone number validation
export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\+?[\d\s-()]+$/
  return phoneRegex.test(phone)
}

// Required field validation
export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  return value !== null && value !== undefined
}

// URL validation
export const validateURL = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Budget validation
export const validateBudget = (min, max) => {
  const minNum = parseFloat(min)
  const maxNum = parseFloat(max)
  
  if (isNaN(minNum) || isNaN(maxNum)) return false
  if (minNum < 0 || maxNum < 0) return false
  if (minNum > maxNum) return false
  
  return true
}

// Year validation
export const validateYear = (year) => {
  const yearNum = parseInt(year)
  const currentYear = new Date().getFullYear()
  
  return !isNaN(yearNum) && yearNum >= currentYear && yearNum <= currentYear + 5
}

// Get validation error message
export const getValidationError = (field, value) => {
  switch (field) {
    case 'email':
      return !validateEmail(value) ? 'Please enter a valid email address' : null
    case 'password':
      return !validatePassword(value) ? 'Password must be at least 8 characters' : null
    case 'gpa':
      return !validateGPA(value) ? 'GPA must be between 0 and 4.0' : null
    case 'ielts':
      return !validateIELTS(value) ? 'IELTS score must be between 0 and 9.0' : null
    case 'gre':
      return !validateGRE(value) ? 'GRE score must be between 260 and 340' : null
    default:
      return null
  }
}