const express = require('express');
const router = express.Router();
const { 
  getUniversities, 
  getUniversityById, 
  getMatchedUniversities 
} = require('../controllers/universityController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, getUniversities);
router.get('/matched', authenticate, getMatchedUniversities);
router.get('/:id', authenticate, getUniversityById);

module.exports = router;