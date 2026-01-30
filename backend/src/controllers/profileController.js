const { UserProfile, Todo } = require('../models');
const { analyzeProfile } = require('../services/profileAnalyzer');
const { generateInitialTodos } = require('../services/todoGenerator');

/**
 * Helper: convert empty string to null & cast numbers
 */
const sanitizeNumber = (value) => {
  if (value === '' || value === undefined || value === null) return null;
  const num = Number(value);
  return isNaN(num) ? null : num;
};

// ==========================
// COMPLETE ONBOARDING
// ==========================
const completeOnboarding = async (req, res) => {
  try {
    const body = req.body;

    // ✅ SANITIZED DATA
    const profileData = {
      ...body,

      gpa: sanitizeNumber(body.gpa),
      ielts_score: sanitizeNumber(body.ielts_score),
      gre_score: sanitizeNumber(body.gre_score),

      budget_min: sanitizeNumber(body.budget_min),
      budget_max: sanitizeNumber(body.budget_max),

      graduation_year: sanitizeNumber(body.graduation_year),
      target_intake_year: sanitizeNumber(body.target_intake_year),
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

    // 1️⃣ Save onboarding data
    await profile.update({
      ...profileData,
      is_completed: true,
      current_stage: 'DISCOVERING'
    });

    // 2️⃣ AI Profile Analysis
    const analysis = await analyzeProfile(profileData);

    await profile.update({
      academic_strength: analysis.academic_strength,
      exam_strength: analysis.exam_strength,
      overall_readiness: analysis.overall_readiness,
      improvement_areas: analysis.improvement_areas
    });

    // 3️⃣ Generate initial TODOS
    const todos = await generateInitialTodos(req.user.id, profileData);

    return res.json({
      success: true,
      message: 'Onboarding completed successfully',
      data: {
        profile,
        analysis,
        todos
      }
    });

  } catch (error) {
    console.error('Onboarding Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Onboarding failed',
      error: error.message
    });
  }
};

// ==========================
// GET PROFILE
// ==========================
const getProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({
      where: { user_id: req.user.id }
    });

    return res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: error.message
    });
  }
};

// ==========================
// UPDATE PROFILE
// ==========================
const updateProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({
      where: { user_id: req.user.id }
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    const body = req.body;

    const updatedData = {
      ...body,
      gpa: sanitizeNumber(body.gpa),
      ielts_score: sanitizeNumber(body.ielts_score),
      gre_score: sanitizeNumber(body.gre_score),
      budget_min: sanitizeNumber(body.budget_min),
      budget_max: sanitizeNumber(body.budget_max),
    };

    await profile.update(updatedData);

    // 🔄 Re-analyze if scores changed
    if (
      body.gpa !== undefined ||
      body.ielts_score !== undefined ||
      body.gre_score !== undefined
    ) {
      const analysis = await analyzeProfile(profile);
      await profile.update({
        academic_strength: analysis.academic_strength,
        exam_strength: analysis.exam_strength,
        overall_readiness: analysis.overall_readiness
      });
    }

    return res.json({
      success: true,
      message: 'Profile updated successfully',
      data: profile
    });

  } catch (error) {
    return res.status(500).json({
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
