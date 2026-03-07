const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Question text is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Interest', 'Aptitude', 'Personality', 'Values', 'Academic']
  },
  options: [{
    type: String,
    required: true
  }],
  scores: [{
    type: Number,
    required: true
  }],
  correctAnswer: {
    type: String
  }
}, {
  timestamps: true
});

const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);
module.exports = Question;