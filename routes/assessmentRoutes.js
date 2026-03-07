const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');

// Submit assessment answers
router.post('/submit', assessmentController.submitAssessment);

// Get questions by category (Interest, Aptitude, etc.)
router.get('/questions/:category', assessmentController.getQuestionsByCategory);

// Get user results by userId
router.get('/results/:userId', assessmentController.getUserResults);

module.exports = router;