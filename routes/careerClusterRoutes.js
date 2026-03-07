const express = require('express');
const router = express.Router();
const CareerCluster = require('../models/CareerCluster');

// Get all clusters
router.get('/', async (req, res) => {
  try {
    const clusters = await CareerCluster.find();
    res.json({
      success: true,
      count: clusters.length,
      data: clusters
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});

// Get cluster by ID
router.get('/:id', async (req, res) => {
  try {
    const cluster = await CareerCluster.findById(req.params.id);
    if (!cluster) {
      return res.status(404).json({
        success: false,
        message: "Cluster not found"
      });
    }
    res.json({
      success: true,
      data: cluster
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