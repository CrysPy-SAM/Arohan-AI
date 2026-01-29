const bcrypt = require('bcryptjs');

/**
 * Hash a plain text password
 * @param {string} password - Plain text password
 * @returns {Promise<string>} - Hashed password
 */
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

/**
 * Compare plain text password with hashed password
 * @param {string} password - Plain text password
 * @param {string} hashedPassword - Hashed password from database
 * @returns {Promise<boolean>} - True if passwords match
 */
const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

/**
 * Generate a random salt
 * @param {number} rounds - Number of salt rounds (default: 10)
 * @returns {Promise<string>} - Generated salt
 */
const generateSalt = async (rounds = 10) => {
  try {
    const salt = await bcrypt.genSalt(rounds);
    return salt;
  } catch (error) {
    throw new Error('Error generating salt');
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  generateSalt
};