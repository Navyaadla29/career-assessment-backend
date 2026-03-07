const Career = require('../models/Career');

class CareerService {
  // Calculate match between user scores and career requirements
  calculateMatch(userScores, careerRequirements) {
    const categories = ['Interest', 'Aptitude', 'Personality', 'Values', 'Academic'];
    let totalScore = 0;
    let maxPossible = 0;
    
    categories.forEach(category => {
      const userScore = userScores[category] || 50;
      const requiredScore = careerRequirements[category] || 50;
      
      // Calculate how close user score is to required score
      // Lower difference = higher match
      const difference = Math.abs(userScore - requiredScore);
      const matchForCategory = Math.max(0, 100 - difference);
      
      totalScore += matchForCategory;
      maxPossible += 100;
    });
    
    return Math.round((totalScore / maxPossible) * 100);
  }
  
  // Get top career matches for a user
  async getTopMatches(userScores, limit = 5) {
    try {
      const careers = await Career.find().populate('cluster');
      
      const matches = careers.map(career => {
        const matchPercentage = this.calculateMatch(userScores, career.requirements);
        
        return {
          careerId: career._id,
          careerName: career.name,
          cluster: career.cluster?.name || 'General',
          matchPercentage,
          description: career.description,
          stream: career.stream,
          skills: career.skills
        };
      });
      
      // Sort by match percentage descending
      matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
      
      return matches.slice(0, limit);
    } catch (error) {
      console.error('Error getting career matches:', error);
      return [];
    }
  }
  
  // Get career details with roadmap
  async getCareerWithRoadmap(careerId) {
    try {
      const career = await Career.findById(careerId).populate('cluster');
      
      if (!career) return null;
      
      return {
        id: career._id,
        name: career.name,
        cluster: career.cluster?.name,
        description: career.description,
        stream: career.stream,
        courses: career.courses,
        roadmap: career.roadmap,
        skills: career.skills,
        backupCareers: career.backupCareers
      };
    } catch (error) {
      console.error('Error getting career details:', error);
      return null;
    }
  }
}

module.exports = new CareerService();