const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cluster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CareerCluster',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    Interest: { type: Number, default: 50 },
    Aptitude: { type: Number, default: 50 },
    Personality: { type: Number, default: 50 },
    Values: { type: Number, default: 50 },
    Academic: { type: Number, default: 50 }
  },
  stream: {
    type: String,
    required: true
  },
  courses: {
    type: String,
    required: true
  },
  roadmap: {
    type: String,
    required: true
  },
  skills: [String],
  backupCareers: [String]
});

const Career = mongoose.models.Career || mongoose.model('Career', CareerSchema);
module.exports = Career;