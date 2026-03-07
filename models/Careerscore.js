const mongoose = require('mongoose');

const CareerscoreSchema = new mongoose.Schema({
  career: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  matchPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  calculatedAt: {
    type: Date,
    default: Date.now
  }
});

const Careerscore = mongoose.models.Careerscore || mongoose.model('Careerscore', CareerscoreSchema);
module.exports = Careerscore;