const matchUniversities = async (profile, universities) => {
  const matched = {
    dream: [],
    target: [],
    safe: []
  };
  
  for (const uni of universities) {
    // Budget filter
    const totalCost = uni.tuition_fee_max + uni.living_cost;
    if (totalCost > profile.budget_max) {
      continue;
    }
    
    // GPA comparison
    const gpaGap = profile.gpa - uni.min_gpa;
    
    // IELTS comparison
    const ieltsGap = (profile.ielts_score || 0) - uni.min_ielts;
    
    // Categorize
    if (gpaGap < 0 || ieltsGap < -0.5 || uni.acceptance_rate < 0.15) {
      // Dream (reach)
      matched.dream.push({
        ...uni.toJSON(),
        fit_score: calculateFitScore(profile, uni),
        category: 'Dream'
      });
    } else if (gpaGap >= 0.3 && ieltsGap >= 0.5 && uni.acceptance_rate > 0.4) {
      // Safe
      matched.safe.push({
        ...uni.toJSON(),
        fit_score: calculateFitScore(profile, uni),
        category: 'Safe'
      });
    } else {
      // Target
      matched.target.push({
        ...uni.toJSON(),
        fit_score: calculateFitScore(profile, uni),
        category: 'Target'
      });
    }
  }
  
  // Sort by fit score
  matched.dream.sort((a, b) => b.fit_score - a.fit_score);
  matched.target.sort((a, b) => b.fit_score - a.fit_score);
  matched.safe.sort((a, b) => b.fit_score - a.fit_score);
  
  return matched;
};

const calculateFitScore = (profile, university) => {
  let score = 50; // Base score
  
  // GPA score
  const gpaGap = profile.gpa - university.min_gpa;
  if (gpaGap >= 0.5) score += 20;
  else if (gpaGap >= 0.2) score += 10;
  else if (gpaGap < 0) score -= 15;
  
  // IELTS score
  const ieltsGap = (profile.ielts_score || 0) - university.min_ielts;
  if (ieltsGap >= 1) score += 15;
  else if (ieltsGap >= 0.5) score += 10;
  else if (ieltsGap < 0) score -= 15;
  
  // Budget score
  const totalCost = university.tuition_fee_max + university.living_cost;
  const budgetGap = profile.budget_max - totalCost;
  if (budgetGap > 10000) score += 15;
  else if (budgetGap > 5000) score += 10;
  else if (budgetGap < 0) score -= 20;
  
  // Acceptance rate score
  if (university.acceptance_rate > 0.5) score += 10;
  else if (university.acceptance_rate < 0.15) score -= 10;
  
  return Math.max(0, Math.min(100, score));
};

module.exports = { matchUniversities };