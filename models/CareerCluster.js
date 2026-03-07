const mongoose = require('mongoose');

const CareerClusterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String
});

const CareerCluster = mongoose.models.CareerCluster || mongoose.model('CareerCluster', CareerClusterSchema);
module.exports = CareerCluster;