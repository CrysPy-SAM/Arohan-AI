const { validateEmail, validatePassword } = require('../utils/validators');

const validateSignup = (req, res, next) => {
  const { email, full_name, password } = req.body;
  
  if (!email || !full_name || !password) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }
  
  if (!validateEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }
  
  if (!validatePassword(password)) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters'
    });
  }
  
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }
  
  next();
};

const validateOnboarding = (req, res, next) => {
  const requiredFields = [
    'education_level',
    'degree',
    'major',
    'intended_degree',
    'field_of_study',
    'target_intake_year',
    'preferred_countries',
    'budget_min',
    'budget_max'
  ];
  
  const missingFields = requiredFields.filter(field => !req.body[field]);
  
  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields',
      missing_fields: missingFields
    });
  }
  
  next();
};

module.exports = {
  validateSignup,
  validateLogin,
  validateOnboarding
};