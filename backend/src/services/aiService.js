const { getGeminiModel } = require('../config/gemini');

// Chat with AI Counsellor
const chatWithAI = async (userMessage, context) => {
  try {
    const model = getGeminiModel();
    
    const prompt = `
You are an AI Study Abroad Counsellor helping students plan their study-abroad journey.

STUDENT CONTEXT:
- Current Stage: ${context.current_stage || 'Building Profile'}
- Profile Completed: ${context.profile_completed ? 'Yes' : 'No'}
- Shortlisted Universities: ${context.shortlisted_count || 0}
- Locked Universities: ${context.locked_count || 0}
- Target Degree: ${context.profile?.intended_degree || 'Not specified'}
- Field: ${context.profile?.field_of_study || 'Not specified'}
- Budget: $${context.profile?.budget_min || 0} - $${context.profile?.budget_max || 0}
- Countries: ${context.profile?.preferred_countries?.join(', ') || 'Not specified'}

STUDENT MESSAGE:
"${userMessage}"

INSTRUCTIONS:
1. Respond helpfully and professionally
2. Suggest actionable next steps based on their stage
3. If they ask to shortlist a university, acknowledge it
4. If they need to complete onboarding, guide them
5. Keep responses concise and clear (max 150 words)
6. Be encouraging and supportive
7. Focus on the most important next steps

RESPONSE:
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text || 'I apologize, but I could not generate a response. Please try again.';
  } catch (error) {
    console.error('AI Chat Error Details:', error);
    
    // Handle specific Gemini API errors
    if (error.message?.includes('API key')) {
      throw new Error('AI service configuration error. Please contact support.');
    }
    if (error.message?.includes('quota')) {
      throw new Error('AI service is temporarily busy. Please try again in a moment.');
    }
    if (error.message?.includes('safety')) {
      throw new Error('Your message was flagged by content filters. Please rephrase.');
    }
    
    throw new Error('AI service is temporarily unavailable. Please try again.');
  }
};

// Analyze University Fit
const analyzeUniversityFit = async (profile, university) => {
  try {
    const model = getGeminiModel();
    
    const prompt = `
Analyze if this university fits the student profile:

STUDENT PROFILE:
- GPA: ${profile.gpa || 'Not provided'}
- IELTS: ${profile.ielts_score || 'Not taken'}
- GRE: ${profile.gre_score || 'Not taken'}
- Budget: $${profile.budget_min || 0} - $${profile.budget_max || 0}
- Target: ${profile.intended_degree || 'Not specified'} in ${profile.field_of_study || 'Not specified'}

UNIVERSITY:
- Name: ${university.name}
- Country: ${university.country}
- Ranking: ${university.ranking || 'Not ranked'}
- Tuition: $${university.tuition_fee_min || 0} - $${university.tuition_fee_max || 0}
- Min GPA: ${university.min_gpa || 'Not specified'}
- Min IELTS: ${university.min_ielts || 'Not specified'}
- Acceptance Rate: ${university.acceptance_rate ? (university.acceptance_rate * 100).toFixed(1) + '%' : 'Not available'}

PROVIDE JSON RESPONSE ONLY (no markdown, no extra text):
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
    
    // Fallback based on simple logic
    return generateFallbackAnalysis(profile, university);
  } catch (error) {
    console.error('University Analysis Error:', error);
    // Return fallback analysis on error
    return generateFallbackAnalysis(profile, university);
  }
};

// Fallback analysis when AI fails
const generateFallbackAnalysis = (profile, university) => {
  const gpaGap = (profile.gpa || 0) - (university.min_gpa || 0);
  const budgetFits = (profile.budget_max || 0) >= (university.tuition_fee_max || 0);
  
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
    reasoning: `This university is a ${category.toLowerCase()} option based on your GPA (${profile.gpa || 'N/A'}) and budget range.`,
    risks: budgetFits ? 'Standard application requirements apply.' : 'Budget may be a constraint.',
    likelihood
  };
};

// Get University Recommendations
const getUniversityRecommendations = async (profile) => {
  try {
    const model = getGeminiModel();
    
    const prompt = `
Based on this student profile, recommend suitable universities:

PROFILE:
- GPA: ${profile.gpa || 'Not provided'}
- IELTS: ${profile.ielts_score || 'Not taken'}
- Target: ${profile.intended_degree || 'Not specified'} in ${profile.field_of_study || 'Not specified'}
- Budget: $${profile.budget_min || 0} - $${profile.budget_max || 0}
- Countries: ${profile.preferred_countries?.join(', ') || 'Not specified'}

Provide 3 categories of recommendations:
1. Dream Universities (reach schools)
2. Target Universities (match schools)
3. Safe Universities (safety schools)

Keep response concise (max 200 words total).
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Recommendations Error:', error);
    return 'Unable to generate recommendations at this time. Please try exploring universities manually.';
  }
};

module.exports = {
  chatWithAI,
  analyzeUniversityFit,
  getUniversityRecommendations
};