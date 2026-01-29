const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const profileRoutes = require('./profile');
const aiRoutes = require('./ai');
const universityRoutes = require('./university');
const shortlistRoutes = require('./shortlist');
const todoRoutes = require('./todo');

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/ai', aiRoutes);
router.use('/universities', universityRoutes);
router.use('/shortlist', shortlistRoutes);
router.use('/todos', todoRoutes);

module.exports = router;