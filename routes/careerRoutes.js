const express = require('express');
const router = express.Router();
const Career = require('../models/Career');

// Get all careers
router.get('/', async (req, res) => {
  try {
    const careers = await Career.find().populate('cluster');
    res.json({
      success: true,
      count: careers.length,
      data: careers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});

// Get career by ID
router.get('/:id', async (req, res) => {
  try {
    const career = await Career.findById(req.params.id).populate('cluster');
    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career not found"
      });
    }
    res.json({
      success: true,
      data: career
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});

// Get careers by cluster
router.get('/cluster/:clusterId', async (req, res) => {
  try {
    const careers = await Career.find({ cluster: req.params.clusterId }).populate('cluster');
    res.json({
      success: true,
      count: careers.length,
      data: careers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});

module.exports = router;