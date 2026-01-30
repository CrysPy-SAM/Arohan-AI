const matchUniversities = async (profile, universities) => {
  const matched = {
    dream: [],
    target: [],
    safe: []
  };

  for (const uni of universities) {
    // 🛡 SAFE COST CALCULATION
    const tuition = uni.tuition_fee_max || 0;
    const living = uni.living_cost || 0;
    const totalCost = tuition + living;

    if (totalCost > (profile.budget_max || 0)) {
      continue;
    }

    // 🛡 SAFE GPA & IELTS
    const gpa = profile.gpa || 0;
    const minGpa = uni.min_gpa || 0;
    const gpaGap = gpa - minGpa;

    const ielts = profile.ielts_score || 0;
    const minIelts = uni.min_ielts || 0;
    const ieltsGap = ielts - minIelts;

    const acceptanceRate = uni.acceptance_rate ?? 0.3;

    // Categorization
    if (gpaGap < 0 || ieltsGap < -0.5 || acceptanceRate < 0.15) {
      matched.dream.push({
        ...uni.toJSON(),
        fit_score: calculateFitScore(profile, uni),
        category: 'Dream'
      });
    } else if (gpaGap >= 0.3 && ieltsGap >= 0.5 && acceptanceRate > 0.4) {
      matched.safe.push({
        ...uni.toJSON(),
        fit_score: calculateFitScore(profile, uni),
        category: 'Safe'
      });
    } else {
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
  let score = 50;

  const gpa = profile.gpa || 0;
  const minGpa = university.min_gpa || 0;
  const gpaGap = gpa - minGpa;

  if (gpaGap >= 0.5) score += 20;
  else if (gpaGap >= 0.2) score += 10;
  else if (gpaGap < 0) score -= 15;

  const ielts = profile.ielts_score || 0;
  const minIelts = university.min_ielts || 0;
  const ieltsGap = ielts - minIelts;

  if (ieltsGap >= 1) score += 15;
  else if (ieltsGap >= 0.5) score += 10;
  else if (ieltsGap < 0) score -= 15;

  const tuition = university.tuition_fee_max || 0;
  const living = university.living_cost || 0;
  const totalCost = tuition + living;
  const budgetGap = (profile.budget_max || 0) - totalCost;

  if (budgetGap > 10000) score += 15;
  else if (budgetGap > 5000) score += 10;
  else if (budgetGap < 0) score -= 20;

  const acceptanceRate = university.acceptance_rate ?? 0.3;
  if (acceptanceRate > 0.5) score += 10;
  else if (acceptanceRate < 0.15) score -= 10;

  return Math.max(0, Math.min(100, score));
};

module.exports = { matchUniversities };
