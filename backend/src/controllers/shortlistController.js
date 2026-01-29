const { Shortlist, University, UserProfile, Todo } = require('../models');
const { analyzeUniversityFit } = require('../services/aiService');
const { generateUniversityTodos } = require('../services/todoGenerator');

// Add to Shortlist
const addToShortlist = async (req, res) => {
  try {
    const { university_id, category } = req.body;
    
    // Check if already shortlisted
    const existing = await Shortlist.findOne({
      where: {
        user_id: req.user.id,
        university_id
      }
    });
    
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'University already shortlisted'
      });
    }
    
    // Get profile and university
    const profile = await UserProfile.findOne({ 
      where: { user_id: req.user.id } 
    });
    
    const university = await University.findByPk(university_id);
    
    if (!university) {
      return res.status(404).json({
        success: false,
        message: 'University not found'
      });
    }
    
    // Get AI analysis
    const analysis = await analyzeUniversityFit(profile, university);
    
    // Create shortlist
    const shortlist = await Shortlist.create({
      user_id: req.user.id,
      university_id,
      category: category || analysis.category,
      ai_reasoning: analysis.reasoning,
      risk_analysis: analysis.risks,
      acceptance_likelihood: analysis.likelihood
    });
    
    const shortlistWithUni = await Shortlist.findByPk(shortlist.id, {
      include: [{ model: University, as: 'university' }]
    });
    
    res.status(201).json({
      success: true,
      message: 'University added to shortlist',
      data: shortlistWithUni
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to add to shortlist', 
      error: error.message 
    });
  }
};

// Get Shortlisted Universities
const getShortlist = async (req, res) => {
  try {
    const shortlists = await Shortlist.findAll({
      where: { user_id: req.user.id },
      include: [{ model: University, as: 'university' }],
      order: [['created_at', 'DESC']]
    });
    
    // Group by category
    const grouped = {
      dream: shortlists.filter(s => s.category === 'Dream'),
      target: shortlists.filter(s => s.category === 'Target'),
      safe: shortlists.filter(s => s.category === 'Safe')
    };
    
    res.json({
      success: true,
      count: shortlists.length,
      data: {
        all: shortlists,
        grouped
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch shortlist', 
      error: error.message 
    });
  }
};

// Lock University (CRITICAL STEP)
const lockUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    
    const shortlist = await Shortlist.findOne({
      where: {
        id,
        user_id: req.user.id
      },
      include: [{ model: University, as: 'university' }]
    });
    
    if (!shortlist) {
      return res.status(404).json({
        success: false,
        message: 'Shortlist not found'
      });
    }
    
    if (shortlist.is_locked) {
      return res.status(400).json({
        success: false,
        message: 'University already locked'
      });
    }
    
    // Lock the university
    await shortlist.update({
      is_locked: true,
      locked_at: new Date()
    });
    
    // Update user stage
    const profile = await UserProfile.findOne({ 
      where: { user_id: req.user.id } 
    });
    
    await profile.update({
      current_stage: 'Preparing Applications'
    });
    
    // Generate university-specific todos
    await generateUniversityTodos(req.user.id, shortlist.university);
    
    res.json({
      success: true,
      message: 'University locked successfully',
      data: {
        shortlist,
        new_stage: 'Preparing Applications'
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to lock university', 
      error: error.message 
    });
  }
};

// Unlock University
const unlockUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    
    const shortlist = await Shortlist.findOne({
      where: {
        id,
        user_id: req.user.id
      }
    });
    
    if (!shortlist) {
      return res.status(404).json({
        success: false,
        message: 'Shortlist not found'
      });
    }
    
    if (!shortlist.is_locked) {
      return res.status(400).json({
        success: false,
        message: 'University is not locked'
      });
    }
    
    // Unlock
    await shortlist.update({
      is_locked: false,
      locked_at: null
    });
    
    // Check if any other universities are locked
    const otherLocked = await Shortlist.count({
      where: {
        user_id: req.user.id,
        is_locked: true
      }
    });
    
    // Update stage if no locked universities
    if (otherLocked === 0) {
      const profile = await UserProfile.findOne({ 
        where: { user_id: req.user.id } 
      });
      
      await profile.update({
        current_stage: 'Finalizing Universities'
      });
    }
    
    res.json({
      success: true,
      message: 'University unlocked successfully',
      data: shortlist
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to unlock university', 
      error: error.message 
    });
  }
};

// Remove from Shortlist
const removeFromShortlist = async (req, res) => {
  try {
    const { id } = req.params;
    
    const shortlist = await Shortlist.findOne({
      where: {
        id,
        user_id: req.user.id
      }
    });
    
    if (!shortlist) {
      return res.status(404).json({
        success: false,
        message: 'Shortlist not found'
      });
    }
    
    if (shortlist.is_locked) {
      return res.status(400).json({
        success: false,
        message: 'Cannot remove locked university. Unlock it first.'
      });
    }
    
    await shortlist.destroy();
    
    res.json({
      success: true,
      message: 'University removed from shortlist'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to remove from shortlist', 
      error: error.message 
    });
  }
};

module.exports = {
  addToShortlist,
  getShortlist,
  lockUniversity,
  unlockUniversity,
  removeFromShortlist
};