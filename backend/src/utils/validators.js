const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  return password.length >= 8;
};

const validateGPA = (gpa) => {
  return gpa >= 0 && gpa <= 4.0;
};

const validateIELTS = (score) => {
  return score >= 0 && score <= 9.0;
};

const validateGRE = (score) => {
  return score >= 260 && score <= 340;
};

module.exports = {
  validateEmail,
  validatePassword,
  validateGPA,
  validateIELTS,
  validateGRE
};