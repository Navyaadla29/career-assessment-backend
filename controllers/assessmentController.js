const Question = require("../models/Question");
const Career = require("../models/Career");
const Response = require("../models/response");
const User = require("../models/user");

// Submit assessment answers
exports.submitAssessment = async (req, res) => {
  try {
    const { userId, answers } = req.body;

    if (!answers || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No answers submitted"
      });
    }

    // Initialize category scores
    const categoryScores = {
      Interest: 0,
      Aptitude: 0,
      Personality: 0,
      Values: 0,
      Academic: 0
    };

    const categoryCounts = {
      Interest: 0,
      Aptitude: 0,
      Personality: 0,
      Values: 0,
      Academic: 0
    };

    // Calculate scores for each answer
    for (let answer of answers) {
      const question = await Question.findById(answer.questionId);
      if (question) {
        const category = question.category;
        categoryScores[category] += answer.score;
        categoryCounts[category] += 1;
      }
    }

    // Calculate averages
    const finalScores = {};
    for (let category in categoryScores) {
      if (categoryCounts[category] > 0) {
        finalScores[category] = categoryScores[category] / categoryCounts[category];
      } else {
        finalScores[category] = 0;
      }
    }

    // Save response to database
    const response = new Response({
      user: userId,
      answers: answers,
      scores: finalScores,
      completedAt: new Date()
    });

    await response.save();

    // Find career matches based on scores
    const careerMatches = await findCareerMatches(finalScores);

    res.status(200).json({
      success: true,
      message: "Assessment submitted successfully",
      data: {
        scores: finalScores,
        matches: careerMatches
      }
    });

  } catch (error) {
    console.log("Error in submitAssessment:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Helper function to find career matches
async function findCareerMatches(scores) {
  try {
    // Get all careers from database
    const careers = await Career.find().populate('cluster');
    
    // Calculate match percentage for each career
    const matches = careers.map(career => {
      let totalDifference = 0;
      let totalWeight = 0;
      
      // Compare each category
      const categories = ['Interest', 'Aptitude', 'Personality', 'Values', 'Academic'];
      
      categories.forEach(category => {
        const requiredScore = career.requirements[category] || 50;
        const userScore = scores[category] || 50;
        
        // Calculate difference (lower difference = better match)
        const difference = Math.abs(requiredScore - userScore);
        
        totalDifference += difference;
        totalWeight += 1;
      });
      
      // Convert to match percentage (100% - average difference)
      const avgDifference = totalWeight > 0 ? totalDifference / totalWeight : 50;
      const matchPercentage = Math.max(0, 100 - avgDifference);
      
      return {
        careerId: career._id,
        careerName: career.name,
        cluster: career.cluster?.name || 'General',
        matchPercentage: Math.round(matchPercentage * 100) / 100,
        description: career.description,
        stream: career.stream,
        courses: career.courses,
        roadmap: career.roadmap,
        skills: career.skills,
        backupCareers: career.backupCareers
      };
    });
    
    // Sort by match percentage (highest first) and return top 10
    return matches.sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, 10);
    
  } catch (error) {
    console.log("Error finding career matches:", error);
    return [];
  }
}

// Get questions by category
exports.getQuestionsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const questions = await Question.find({ category: category });
    
    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions
    });
    
  } catch (error) {
    console.log("Error fetching questions:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Get user results
exports.getUserResults = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const responses = await Response.find({ user: userId })
      .sort({ completedAt: -1 })
      .limit(1);
    
    if (responses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No assessment found for this user"
      });
    }
    
    const latestResponse = responses[0];
    
    // Get career matches from the saved response or calculate again
    let matches = latestResponse.matches;
    if (!matches || matches.length === 0) {
      matches = await findCareerMatches(latestResponse.scores);
    }
    
    res.status(200).json({
      success: true,
      data: {
        scores: latestResponse.scores,
        matches: matches,
        completedAt: latestResponse.completedAt
      }
    });
    
  } catch (error) {
    console.log("Error fetching user results:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};