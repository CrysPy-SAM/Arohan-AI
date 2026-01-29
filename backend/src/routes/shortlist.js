const express = require('express');
const router = express.Router();
const { 
  addToShortlist, 
  getShortlist, 
  lockUniversity, 
  unlockUniversity,
  removeFromShortlist 
} = require('../controllers/shortlistController');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, addToShortlist);
router.get('/', authenticate, getShortlist);
router.post('/:id/lock', authenticate, lockUniversity);
router.post('/:id/unlock', authenticate, unlockUniversity);
router.delete('/:id', authenticate, removeFromShortlist);

module.exports = router;