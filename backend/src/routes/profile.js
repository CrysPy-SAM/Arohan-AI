const express = require('express');
const router = express.Router();
const { 
  completeOnboarding, 
  getProfile, 
  updateProfile 
} = require('../controllers/profileController');
const { authenticate } = require('../middleware/auth');

router.post('/onboarding/complete', authenticate, completeOnboarding);
router.get('/', authenticate, getProfile);
router.put('/', authenticate, updateProfile);

module.exports = router;