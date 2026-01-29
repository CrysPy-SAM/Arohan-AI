const { getGeminiModel } = require('../config/gemini');

// Chat with AI Counsellor
const chatWithAI = async (userMessage, context) => {
  try {
    const model = getGeminiModel();
    
    const prompt = `
You are an AI Study Abroad Counsellor helping students plan their study-abroad journey.

STUDENT CONTEXT:
- Current Stage: ${context.current_stage}
- Profile Completed: ${context.profile_completed}
- Shortlisted Universities: ${context.shortlisted_count}
- Locked Universities: ${context.locked_count}
- Target Degree: ${context.profile.intended_degree}
- Field: ${context.profile.field_of_study}
- Budget: $${context.profile.budget_min} - $${context.profile.budget_max}
- Countries: ${context.profile.preferred_countries.join(', ')}

STUDENT MESSAGE:
"${userMessage}"

INSTRUCTIONS:
1. Respond helpfully and professionally
2. Suggest actionable next steps based on their stage
3. If they ask to shortlist a university, acknowledge it
4. If they need to complete onboarding, guide them
5. Keep responses concise and clear (max 150 words)

RESPONSE:
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('AI Chat Error:', error);
    throw new Error('AI chat failed');
  }
};

// Analyze University Fit
const analyzeUniversityFit = async (profile, university) => {
  try {
    const model = getGeminiModel();
    
    const prompt = `
Analyze if this university fits the student profile:

STUDENT PROFILE:
- GPA: ${profile.gpa}
- IELTS: ${profile.ielts_score || 'Not taken'}
- GRE: ${profile.gre_score || 'Not taken'}
- Budget: $${profile.budget_min} - $${profile.budget_max}
- Target: ${profile.intended_degree} in ${profile.field_of_study}

UNIVERSITY:
- Name: ${university.name}
- Country: ${university.country}
- Ranking: ${university.ranking}
- Tuition: $${university.tuition_fee_min} - $${university.tuition_fee_max}
- Min GPA: ${university.min_gpa}
- Min IELTS: ${university.min_ielts}
- Acceptance Rate: ${(university.acceptance_rate * 100).toFixed(1)}%

PROVIDE JSON RESPONSE:
{
  "category": "Dream/Target/Safe",
  "reasoning": "Why this university fits (2-3 sentences)",
  "risks": "Key risks or concerns (2-3 sentences)",
  "likelihood": "Low/Medium/High"
}
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // Fallback
    return {
      category: 'Target',
      reasoning: 'This university matches your profile reasonably well.',
      risks: 'Standard application requirements apply.',
      likelihood: 'Medium'
    };
  } catch (error) {
    console.error('University Analysis Error:', error);
    throw new Error('University analysis failed');
  }
};

// Get University Recommendations
const getUniversityRecommendations = async (profile) => {
  try {
    const model = getGeminiModel();
    
    const prompt = `
Based on this student profile, recommend suitable universities:

PROFILE:
- GPA: ${profile.gpa}
- IELTS: ${profile.ielts_score || 'Not taken'}
- Target: ${profile.intended_degree} in ${profile.field_of_study}
- Budget: $${profile.budget_min} - $${profile.budget_max}
- Countries: ${profile.preferred_countries.join(', ')}

Provide 3 categories of recommendations:
1. Dream Universities (reach schools)
2. Target Universities (match schools)
3. Safe Universities (safety schools)

PROVIDE JSON RESPONSE with university names and brief reasoning.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Recommendations Error:', error);
    throw new Error('Recommendations failed');
  }
};

module.exports = {
  chatWithAI,
  analyzeUniversityFit,
  getUniversityRecommendations
};