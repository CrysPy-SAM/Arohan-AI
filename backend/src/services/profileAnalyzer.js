const { getGeminiModel } = require('../config/gemini');

const analyzeProfile = async (profileData) => {
  // 🔒 Smart fallback (used when AI fails)
  const fallbackAnalysis = {
    academic_strength:
      profileData.gpa && profileData.gpa >= 7.5 ? 'Strong' : 'Average',

    exam_strength:
      profileData.ielts_status === 'Completed' ||
      profileData.gre_status === 'Completed'
        ? 'Average'
        : 'Weak',

    overall_readiness:
      profileData.sop_status === 'Ready' ? 'Average' : 'Weak',

    improvement_areas: [
      profileData.ielts_status !== 'Completed' ? 'IELTS Preparation' : null,
      profileData.gre_status !== 'Completed' ? 'GRE Preparation' : null,
      profileData.sop_status !== 'Ready' ? 'SOP Drafting' : null
    ].filter(Boolean)
  };

  try {
    const model = getGeminiModel();

    const prompt = `
You are an expert study-abroad counsellor.

Analyze the student profile and respond ONLY in valid JSON.

PROFILE:
- Education: ${profileData.education_level} in ${profileData.major}
- GPA: ${profileData.gpa || 'Not provided'}
- Target Degree: ${profileData.intended_degree} in ${profileData.field_of_study}
- IELTS: ${profileData.ielts_status} (${profileData.ielts_score || 'N/A'})
- GRE: ${profileData.gre_status} (${profileData.gre_score || 'N/A'})
- SOP Status: ${profileData.sop_status}

JSON FORMAT:
{
  "academic_strength": "Strong | Average | Weak",
  "exam_strength": "Strong | Average | Weak",
  "overall_readiness": "Strong | Average | Weak",
  "improvement_areas": ["area1", "area2"]
}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // 🧠 Safe JSON extraction
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return fallbackAnalysis;

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Profile Analysis Error:', error.message);
    return fallbackAnalysis; // 👈 NEVER FAIL FLOW
  }
};

module.exports = { analyzeProfile };
