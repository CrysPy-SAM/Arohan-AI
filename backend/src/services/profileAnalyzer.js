const { getGeminiModel } = require('../config/gemini');

const analyzeProfile = async (profileData) => {
  try {
    const model = getGeminiModel();
    
    const prompt = `
Analyze this student's profile for study abroad readiness:

PROFILE:
- Education: ${profileData.education_level} in ${profileData.major}
- GPA: ${profileData.gpa}
- Target: ${profileData.intended_degree} in ${profileData.field_of_study}
- IELTS Status: ${profileData.ielts_status} - Score: ${profileData.ielts_score || 'N/A'}
- GRE Status: ${profileData.gre_status} - Score: ${profileData.gre_score || 'N/A'}
- SOP Status: ${profileData.sop_status}

PROVIDE JSON RESPONSE:
{
  "academic_strength": "Strong/Average/Weak",
  "exam_strength": "Strong/Average/Weak",
  "overall_readiness": "Strong/Average/Weak",
  "improvement_areas": ["area1", "area2", "area3"]
}
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // Fallback
    return {
      academic_strength: 'Average',
      exam_strength: 'Average',
      overall_readiness: 'Average',
      improvement_areas: ['Complete standardized tests', 'Improve GPA', 'Work on SOP']
    };
  } catch (error) {
    console.error('Profile Analysis Error:', error);
    return {
      academic_strength: 'Average',
      exam_strength: 'Average',
      overall_readiness: 'Average',
      improvement_areas: ['Complete profile assessment']
    };
  }
};

module.exports = { analyzeProfile };