const { UserProfile, Todo } = require('../models');
const { analyzeProfile } = require('../services/profileAnalyzer');
const { generateInitialTodos } = require('../services/todoGenerator');

// Complete Onboarding
const completeOnboarding = async (req, res) => {
  try {
    const profileData = req.body;
    
    // Update profile
    const profile = await UserProfile.findOne({ 
      where: { user_id: req.user.id } 
    });
    
    await profile.update({
      ...profileData,
      is_completed: true,
      current_stage: 'Discovering Universities'
    });
    
    // Analyze profile using AI
    const analysis = await analyzeProfile(profileData);
    
    await profile.update({
      academic_strength: analysis.academic_strength,
      exam_strength: analysis.exam_strength,
      overall_readiness: analysis.overall_readiness,
      improvement_areas: analysis.improvement_areas
    });
    
    // Generate initial todos
    const todos = await generateInitialTodos(req.user.id, profileData);
    
    res.json({
      success: true,
      message: 'Onboarding completed successfully',
      data: {
        profile,
        analysis,
        todos
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Onboarding failed', 
      error: error.message 
    });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ 
      where: { user_id: req.user.id } 
    });
    
    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch profile', 
      error: error.message 
    });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ 
      where: { user_id: req.user.id } 
    });
    
    await profile.update(req.body);
    
    // Re-analyze if major fields changed
    if (req.body.gpa || req.body.ielts_score || req.body.gre_score) {
      const analysis = await analyzeProfile(profile);
      await profile.update({
        academic_strength: analysis.academic_strength,
        exam_strength: analysis.exam_strength,
        overall_readiness: analysis.overall_readiness
      });
    }
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: profile
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Profile update failed', 
      error: error.message 
    });
  }
};

module.exports = {
  completeOnboarding,
  getProfile,
  updateProfile
};