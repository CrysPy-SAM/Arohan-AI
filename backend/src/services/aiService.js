const { getGeminiModel } = require('../config/gemini');
const STAGES = require('../utils/stages');

const chatWithAI = async (userMessage, context) => {
  try {
    const model = getGeminiModel();

    const prompt = `
You are an AI Study Abroad Counsellor.

STUDENT CONTEXT:
- Current Stage: ${context.current_stage}
- Profile Completed: ${context.profile_completed ? 'Yes' : 'No'}
- Shortlisted Universities: ${context.shortlisted_count || 0}
- Locked Universities: ${context.locked_count || 0}
- Target Degree: ${context.profile?.intended_degree || 'Not specified'}
- Field: ${context.profile?.field_of_study || 'Not specified'}
- Budget: $${context.profile?.budget_min || 0} - $${context.profile?.budget_max || 0}

STUDENT MESSAGE:
"${userMessage}"

INSTRUCTIONS:
- Be clear and supportive
- Suggest the single most important next step
- Keep response under 120 words
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return {
      message: text?.trim() || 'I am here to help you with your next step.',
      source: 'ai'
    };
  } catch (error) {
    console.error('AI Chat Error:', error.message);

    let fallbackMessage = 'Let’s take the next step in your study abroad journey.';

    switch (context.current_stage) {
      case STAGES.BUILDING_PROFILE:
        fallbackMessage =
          'Let’s complete your profile first so I can guide you better.';
        break;

      case STAGES.DISCOVERING:
        fallbackMessage =
          'This is a great time to shortlist universities that match your budget and academic profile.';
        break;

      case STAGES.FINALIZING:
        fallbackMessage =
          'You should now lock at least one university to move toward applications.';
        break;

      case STAGES.APPLICATION:
        fallbackMessage =
          'Focus on SOP, documents, and completing application requirements.';
        break;
    }

    return {
      message: fallbackMessage,
      source: 'fallback'
    };
  }
};

/* =========================
   UNIVERSITY FIT ANALYSIS
========================= */

const analyzeUniversityFit = async (profile, university) => {
  try {
    const model = getGeminiModel();

    const prompt = `
Analyze university fit and respond ONLY in JSON.

STUDENT:
- GPA: ${profile.gpa || 'N/A'}
- IELTS: ${profile.ielts_score || 'Not taken'}
- Budget: $${profile.budget_max || 0}

UNIVERSITY:
- Name: ${university.name}
- Min GPA: ${university.min_gpa || 'N/A'}
- Min IELTS: ${university.min_ielts || 'N/A'}
- Tuition: $${university.tuition_fee_max || 0}

JSON:
{
  "category": "Dream | Target | Safe",
  "reasoning": "2-3 sentences",
  "risks": "2-3 sentences",
  "likelihood": "Low | Medium | High"
}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return generateFallbackAnalysis(profile, university);

    try {
      return JSON.parse(match[0]);
    } catch {
      return generateFallbackAnalysis(profile, university);
    }
  } catch (error) {
    console.error('University Analysis Error:', error.message);
    return generateFallbackAnalysis(profile, university);
  }
};

/* =========================
   FALLBACK LOGIC
========================= */

const generateFallbackAnalysis = (profile, university) => {
  const gpaGap = (profile.gpa || 0) - (university.min_gpa || 0);
  const budgetFits =
    (profile.budget_max || 0) >= (university.tuition_fee_max || 0);

  let category = 'Target';
  let likelihood = 'Medium';

  if (gpaGap >= 0.5 && budgetFits) {
    category = 'Safe';
    likelihood = 'High';
  } else if (gpaGap < 0 || !budgetFits) {
    category = 'Dream';
    likelihood = 'Low';
  }

  return {
    category,
    reasoning: `Based on your GPA and budget, this university is a ${category.toLowerCase()} option.`,
    risks: budgetFits
      ? 'No major risks identified.'
      : 'Budget may be a constraint.',
    likelihood
  };
};

const getUniversityRecommendations = async (profile) => {
  try {
    const model = getGeminiModel();

    const prompt = `
Suggest universities for the student.
Keep response under 200 words.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    return 'Please explore universities manually based on your profile.';
  }
};

module.exports = {
  chatWithAI,
  analyzeUniversityFit,
  getUniversityRecommendations
};
