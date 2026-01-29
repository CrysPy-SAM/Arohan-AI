const { UserProfile, University, Shortlist, Todo } = require('../models');
const { chatWithAI, getUniversityRecommendations } = require('../services/aiService');

/**
 * AI CHAT CONTROLLER
 * Core brain of AI Counsellor
 */
const chat = async (req, res) => {
  try {
    const { message } = req.body;

    // 1️⃣ Load user profile
    const profile = await UserProfile.findOne({
      where: { user_id: req.user.id }
    });

    if (!profile || !profile.is_completed) {
      return res.status(400).json({
        success: false,
        message: 'Please complete onboarding first'
      });
    }

    // 2️⃣ Load shortlist + locked universities
    const shortlists = await Shortlist.findAll({
      where: { user_id: req.user.id },
      include: [{ model: University, as: 'university' }]
    });

    const lockedUniversities = shortlists.filter(s => s.is_locked);

    // 3️⃣ Build AI context
    const context = {
      profile: profile.toJSON(),
      current_stage: profile.current_stage,
      shortlisted_count: shortlists.length,
      locked_count: lockedUniversities.length,
      locked_universities: lockedUniversities.map(s => s.university.name)
    };

    // 4️⃣ Ask Gemini / AI
    const aiText = await chatWithAI(message, context);

    // 5️⃣ Decide AI ACTIONS (THIS IS THE MAGIC 🔥)
    const actions = [];

    // 🔹 Stage: Discovering Universities
    if (profile.current_stage === 'DISCOVERING' && shortlists.length < 3) {
      const targetUniversity = await University.findOne();

      if (targetUniversity) {
        actions.push({
          type: 'SHORTLIST_UNIVERSITY',
          universityId: targetUniversity.id,
          category: 'Target'
        });
      }
    }

    // 🔹 Stage: Finalizing Universities
    if (profile.current_stage === 'FINALIZING' && lockedUniversities.length === 0) {
      const shortlistToLock = shortlists[0];
      if (shortlistToLock) {
        actions.push({
          type: 'LOCK_UNIVERSITY',
          universityId: shortlistToLock.university_id
        });
      }
    }

    // 🔹 Stage: Application Preparation
    if (profile.current_stage === 'APPLICATION') {
      actions.push({
        type: 'ADD_TODO',
        title: 'Draft SOP for locked university',
        priority: 'High'
      });

      actions.push({
        type: 'ADD_TODO',
        title: 'Prepare academic documents',
        priority: 'Medium'
      });
    }

    // 6️⃣ Send structured response to frontend
    return res.json({
      success: true,
      data: {
        message: aiText,
        actions,   // 🔥 AI IS TAKING ACTIONS
        context
      }
    });

  } catch (error) {
    console.error('AI Chat Error:', error);
    return res.status(500).json({
      success: false,
      message: 'AI chat failed',
      error: error.message
    });
  }
};

/**
 * PROFILE ANALYSIS
 */
const analyzeProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({
      where: { user_id: req.user.id }
    });

    if (!profile || !profile.is_completed) {
      return res.status(400).json({
        success: false,
        message: 'Please complete onboarding first'
      });
    }

    return res.json({
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
    return res.status(500).json({
      success: false,
      message: 'Profile analysis failed',
      error: error.message
    });
  }
};

/**
 * AI UNIVERSITY RECOMMENDATIONS
 */
const getRecommendations = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({
      where: { user_id: req.user.id }
    });

    if (!profile || !profile.is_completed) {
      return res.status(400).json({
        success: false,
        message: 'Please complete onboarding first'
      });
    }

    const recommendations = await getUniversityRecommendations(profile);

    return res.json({
      success: true,
      data: recommendations
    });

  } catch (error) {
    return res.status(500).json({
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
