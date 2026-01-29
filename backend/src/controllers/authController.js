const { User, UserProfile } = require('../models');
const { generateToken } = require('../utils/jwt');

// Signup
const signup = async (req, res) => {
  try {
    const { email, full_name, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered' 
      });
    }
    
    // Create user
    const user = await User.create({
      email,
      full_name,
      password
    });
    
    // Create empty profile
    await UserProfile.create({
      user_id: user.id
    });
    
    // Generate token
    const token = generateToken(user.id);
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Signup failed', 
      error: error.message 
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    // Check password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    // Generate token
    const token = generateToken(user.id);
    
    // Get profile
    const profile = await UserProfile.findOne({ where: { user_id: user.id } });
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name
        },
        profile: {
          is_completed: profile.is_completed,
          current_stage: profile.current_stage
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Login failed', 
      error: error.message 
    });
  }
};

// Get current user
const getCurrentUser = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ 
      where: { user_id: req.user.id } 
    });
    
    res.json({
      success: true,
      data: {
        user: req.user,
        profile
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch user', 
      error: error.message 
    });
  }
};

module.exports = { signup, login, getCurrentUser };