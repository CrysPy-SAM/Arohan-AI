const { UserProfile, Todo } = require('../models');
const { analyzeProfile } = require('../services/profileAnalyzer');
const { generateInitialTodos } = require('../services/todoGenerator');

// Complete Onboarding
const completeOnboarding = async (req, res) => {
  try {
    const raw = req.body;

    // 🔥 SANITIZE DATA
    const profileData = {
      ...raw,

      gpa: raw.gpa ? Number(raw.gpa) : null,
      graduation_year: raw.graduation_year ? Number(raw.graduation_year) : null,
      target_intake_year: raw.target_intake_year ? Number(raw.target_intake_year) : null,

      budget_min: raw.budget_min ? Number(raw.budget_min) : null,
      budget_max: raw.budget_max ? Number(raw.budget_max) : null,

      ielts_score: raw.ielts_score ? Number(raw.ielts_score) : null,
      gre_score: raw.gre_score ? Number(raw.gre_score) : null,
    };

    const profile = await UserProfile.findOne({
      where: { user_id: req.user.id }
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    await profile.update({
      ...profileData,
      is_completed: true,
      current_stage: 'DISCOVERING'
    });

    // 🔮 AI Analysis
    const analysis = await analyzeProfile(profileData);

    await profile.update({
      academic_strength: analysis.academic_strength,
      exam_strength: analysis.exam_strength,
      overall_readiness: analysis.overall_readiness,
      improvement_areas: analysis.improvement_areas
    });

    // 📝 Todos
    const todos = await generateInitialTodos(req.user.id, profileData);

    res.json({
      success: true,
      message: 'Onboarding completed successfully',
      data: { profile, analysis, todos }
    });

  } catch (error) {
    console.error('Onboarding Error:', error);
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