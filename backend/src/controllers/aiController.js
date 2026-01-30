const { UserProfile, University, Shortlist, Todo } = require('../models');
const { chatWithAI, getUniversityRecommendations } = require('../services/aiService');

/**
 * AI CHAT CONTROLLER
 * Core brain of AI Counsellor
 */
const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: 'Message is required'
      });
    }

    // 1️⃣ Load profile
    const profile = await UserProfile.findOne({
      where: { user_id: req.user.id }
    });

    if (!profile || !profile.is_completed) {
      return res.status(400).json({
        message: 'Please complete onboarding first'
      });
    }

    // 2️⃣ Load shortlist
    const shortlists = await Shortlist.findAll({
      where: { user_id: req.user.id }
    });

    const locked = shortlists.find(s => s.is_locked);

    // 3️⃣ Build AI context
    const context = {
      profile: profile.toJSON(),
      stage: profile.current_stage,
      shortlistedCount: shortlists.length,
      lockedUniversityId: locked?.university_id || null
    };

    // 4️⃣ Call AI
    let aiResponse;
try {
  aiResponse = await chatWithAI(message, context);
} catch (err) {
  console.error('AI service failed:', err.message);
  aiResponse = {
    message: 'Let’s focus on the next best step in your study abroad journey.'
  };
}

    // aiResponse = { message: "...", source: "ai" }

    // 5️⃣ Decide ACTIONS (dummy but logical – hackathon approved)
    const actions = [];

    // DISCOVERING → shortlist
    if (profile.current_stage === 'DISCOVERING' && shortlists.length < 3) {
      const uni = await University.findOne();
      if (uni) {
        actions.push({
          type: 'SHORTLIST_UNIVERSITY',
          university_id: uni.id,
          category: 'Target'
        });
      }
    }

    // FINALIZING → lock
    if (profile.current_stage === 'FINALIZING' && !locked && shortlists[0]) {
      actions.push({
        type: 'LOCK_UNIVERSITY',
        shortlist_id: shortlists[0].id
      });
    }

    // APPLICATION → todos
    if (profile.current_stage === 'APPLICATION') {
      actions.push({
        type: 'CREATE_TODO',
        title: 'Draft SOP for locked university',
        priority: 'High'
      });

      actions.push({
        type: 'CREATE_TODO',
        title: 'Prepare academic documents',
        priority: 'Medium'
      });
    }

    // 6️⃣ RETURN EXACT FORMAT FRONTEND EXPECTS
    return res.json({
      message: aiResponse.message,
      actions
    });

  } catch (error) {
    console.error('AI Chat Error:', error);
    return res.status(500).json({
      message: 'AI chat failed'
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
    console.error('Profile Analysis Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Profile analysis failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
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
    console.error('Recommendations Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Recommendations failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = {
  chat,
  analyzeProfile,
  getRecommendations
};