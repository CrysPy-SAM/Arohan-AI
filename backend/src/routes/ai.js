const express = require('express');
const router = express.Router();
const { 
  chat, 
  analyzeProfile, 
  getRecommendations 
} = require('../controllers/aiController');
const { authenticate } = require('../middleware/auth');

router.post('/chat', authenticate, chat);
router.get('/analyze', authenticate, analyzeProfile);
router.get('/recommendations', authenticate, getRecommendations);

module.exports = router;