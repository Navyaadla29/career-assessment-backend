const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true
  },
  age: {
    type: Number,
    min: 10,
    max: 100
  },
  educationLevel: {
    type: String,
    enum: ['8th', '9th', '10th', '11th', '12th', 'College'],
    default: '10th'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = User;