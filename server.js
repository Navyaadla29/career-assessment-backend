const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const questionRoutes = require('./routes/questionRoutes');
const careerClusterRoutes = require('./routes/careerClusterRoutes');
const careerRoutes = require('./routes/careerRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/clusters', careerClusterRoutes);
app.use('/api/careers', careerRoutes);

// Home route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Career Assessment API Running Successfully 🚀'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});