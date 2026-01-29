const { University, UserProfile, Shortlist } = require('../models');
const { Op } = require('sequelize');
const { matchUniversities } = require('../services/recommendationEngine');

// Get All Universities (with filters)
const getUniversities = async (req, res) => {
  try {
    const { country, min_budget, max_budget, field, search } = req.query;
    
    let whereClause = {};
    
    if (country) {
      whereClause.country = country;
    }
    
    if (min_budget && max_budget) {
      whereClause.tuition_fee_max = {
        [Op.between]: [parseInt(min_budget), parseInt(max_budget)]
      };
    }
    
    if (search) {
      whereClause.name = {
        [Op.iLike]: `%${search}%`
      };
    }
    
    const universities = await University.findAll({
      where: whereClause,
      order: [['ranking', 'ASC']]
    });
    
    res.json({
      success: true,
      count: universities.length,
      data: universities
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch universities', 
      error: error.message 
    });
  }
};

// Get University by ID
const getUniversityById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const university = await University.findByPk(id);
    
    if (!university) {
      return res.status(404).json({
        success: false,
        message: 'University not found'
      });
    }
    
    res.json({
      success: true,
      data: university
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch university', 
      error: error.message 
    });
  }
};

// Get Matched Universities (based on profile)
const getMatchedUniversities = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ 
      where: { user_id: req.user.id } 
    });
    
    if (!profile.is_completed) {
      return res.status(400).json({
        success: false,
        message: 'Please complete onboarding first'
      });
    }
    
    // Get all universities
    const allUniversities = await University.findAll({
      where: {
        country: {
          [Op.in]: profile.preferred_countries
        }
      }
    });
    
    // Match universities with profile
    const matchedUniversities = await matchUniversities(profile, allUniversities);
    
    res.json({
      success: true,
      data: matchedUniversities
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Matching failed', 
      error: error.message 
    });
  }
};

module.exports = {
  getUniversities,
  getUniversityById,
  getMatchedUniversities
};