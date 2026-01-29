const { UserProfile, University, Shortlist } = require('../models');
const { chatWithAI, getUniversityRecommendations } = require('../services/aiService');

// AI Chat
const chat = async (req, res) => {
  try {
    const { message } = req.body;
    
    // Get user context
    const profile = await UserProfile.findOne({ 
      where: { user_id: req.user.id } 
    });
    
    const shortlists = await Shortlist.findAll({
      where: { user_id: req.user.id },
      include: [{ model: University, as: 'university' }]
    });
    
    const lockedUniversities = shortlists.filter(s => s.is_locked);
    
    const context = {
      profile: profile.toJSON(),
      current_stage: profile.current_stage,
      profile_completed: profile.is_completed,
      shortlisted_count: shortlists.length,
      locked_count: lockedUniversities.length,
      locked_universities: lockedUniversities.map(s => s.university.name)
    };
    
    // Get AI response
    const aiResponse = await chatWithAI(message, context);
    
    res.json({
      success: true,
      data: {
        message: aiResponse,
        context
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'AI chat failed', 
      error: error.message 
    });
  }
};

// Get Profile Analysis
const analyzeProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ 
      where: { user_id: req.user.id } 
    });
    
    if (!profile.is_completed) {
      return res.status(400).json({
        success: false,
        message: 'Please complete onboarding first'
      });
    }
    
    res.json({
      success: true,
      data: {
        academic_strength: profile.academic_strength,
        exam_strength: profile.exam_strength,
        overall_readiness: profile.overall_readiness,
        improvement_areas: profile.improvement_areas,
        current_stage: profile.current_stage
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Analysis failed', 
      error: error.message 
    });
  }
};

// Get AI University Recommendations
const getRecommendations = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ 
      where: { user_id: req.user.id } 
    });
    
    if (!profile.is_completed) {
      return res.status(400).json({
        success: false,
        message: 'Please complete onboarding first'
      });
    }
    
    // Get recommendations from AI
    const recommendations = await getUniversityRecommendations(profile);
    
    res.json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Recommendations failed', 
      error: error.message 
    });
  }
};

module.exports = {
  chat,
  analyzeProfile,
  getRecommendations
};