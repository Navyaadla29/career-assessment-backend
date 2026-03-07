const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answers: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    score: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    }
  }],
  scores: {
    Interest: { type: Number, default: 0 },
    Aptitude: { type: Number, default: 0 },
    Personality: { type: Number, default: 0 },
    Values: { type: Number, default: 0 },
    Academic: { type: Number, default: 0 }
  },
  matches: [{
    careerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Career' },
    careerName: String,
    matchPercentage: Number
  }],
  completedAt: {
    type: Date,
    default: Date.now
  }
});

const Response = mongoose.models.Response || mongoose.model('Response', ResponseSchema);
module.exports = Response;