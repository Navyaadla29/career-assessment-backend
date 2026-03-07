const mongoose = require('mongoose');
const Question = require('./models/Question');
const Career = require('./models/Career');
const CareerCluster = require('./models/CareerCluster');
const dotenv = require('dotenv');

dotenv.config();

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Question.deleteMany({});
    await Career.deleteMany({});
    await CareerCluster.deleteMany({});
    console.log('🗑️  Old data cleared');

    // Create Career Clusters
    const techCluster = await CareerCluster.create({
      name: 'Technology',
      description: 'Careers in technology and IT'
    });

    const engineeringCluster = await CareerCluster.create({
      name: 'Engineering',
      description: 'Traditional engineering fields'
    });

    const medicalCluster = await CareerCluster.create({
      name: 'Medical',
      description: 'Healthcare and medicine'
    });

    const businessCluster = await CareerCluster.create({
      name: 'Business',
      description: 'Business and management careers'
    });

    const artsCluster = await CareerCluster.create({
      name: 'Arts',
      description: 'Creative and artistic careers'
    });

    console.log('✅ Career clusters created');

    // Create Questions
    await Question.create([
      // MODULE 1: Interest Questions (5 questions)
      {
        text: 'How much do you enjoy solving puzzles and logical problems?',
        category: 'Interest',
        options: ['Very Much', 'Somewhat', 'Neutral', 'Not Much', 'Not at All'],
        scores: [5, 4, 3, 2, 1]
      },
      {
        text: 'Do you like working with computers and technology?',
        category: 'Interest',
        options: ['Always', 'Often', 'Sometimes', 'Rarely', 'Never'],
        scores: [5, 4, 3, 2, 1]
      },
      {
        text: 'How interested are you in how things work?',
        category: 'Interest',
        options: ['Extremely', 'Very', 'Moderately', 'Slightly', 'Not at All'],
        scores: [5, 4, 3, 2, 1]
      },
      {
        text: 'Do you enjoy creative activities like drawing or writing?',
        category: 'Interest',
        options: ['Always', 'Often', 'Sometimes', 'Rarely', 'Never'],
        scores: [5, 4, 3, 2, 1]
      },
      {
        text: 'How much do you enjoy helping others?',
        category: 'Interest',
        options: ['Very Much', 'Somewhat', 'Neutral', 'Not Much', 'Not at All'],
        scores: [5, 4, 3, 2, 1]
      },

      // MODULE 2: Aptitude Questions (5 questions)
      {
        text: '2, 4, 6, 8, ? What number comes next?',
        category: 'Aptitude',
        options: ['10', '12', '14', '16'],
        scores: [5, 0, 0, 0],
        correctAnswer: '10'
      },
      {
        text: 'If a car travels 60 km in 1 hour, how far will it travel in 3 hours?',
        category: 'Aptitude',
        options: ['120 km', '180 km', '200 km', '240 km'],
        scores: [0, 5, 0, 0],
        correctAnswer: '180 km'
      },
      {
        text: 'Which word is different from the others?',
        category: 'Aptitude',
        options: ['Apple', 'Mango', 'Potato', 'Banana'],
        scores: [0, 0, 5, 0],
        correctAnswer: 'Potato'
      },
      {
        text: 'If A is taller than B, and B is taller than C, who is the shortest?',
        category: 'Aptitude',
        options: ['A', 'B', 'C', 'Cannot determine'],
        scores: [0, 0, 5, 0],
        correctAnswer: 'C'
      },
      {
        text: 'What is 15% of 200?',
        category: 'Aptitude',
        options: ['20', '25', '30', '35'],
        scores: [0, 0, 5, 0],
        correctAnswer: '30'
      },

      // MODULE 3: Personality Questions (5 questions)
      {
        text: 'Do you prefer working alone or in teams?',
        category: 'Personality',
        options: ['Alone Always', 'Mostly Alone', 'Mixed', 'Mostly Teams', 'Teams Always'],
        scores: [1, 2, 3, 4, 5]
      },
      {
        text: 'Are you usually the one who takes charge in group situations?',
        category: 'Personality',
        options: ['Always', 'Often', 'Sometimes', 'Rarely', 'Never'],
        scores: [5, 4, 3, 2, 1]
      },
      {
        text: 'How organized are you with your work and schedule?',
        category: 'Personality',
        options: ['Very Organized', 'Somewhat Organized', 'Neutral', 'Somewhat Messy', 'Very Messy'],
        scores: [5, 4, 3, 2, 1]
      },
      {
        text: 'How do you handle stressful situations?',
        category: 'Personality',
        options: ['Very Calm', 'Somewhat Calm', 'Neutral', 'Somewhat Stressed', 'Very Stressed'],
        scores: [5, 4, 3, 2, 1]
      },
      {
        text: 'Are you more logical or emotional when making decisions?',
        category: 'Personality',
        options: ['Completely Logical', 'Mostly Logical', 'Balanced', 'Mostly Emotional', 'Completely Emotional'],
        scores: [5, 4, 3, 2, 1]
      },

      // MODULE 4: Values Questions (5 questions)
      {
        text: 'How important is having a high salary to you?',
        category: 'Values',
        options: ['Most Important', 'Very Important', 'Somewhat Important', 'Not Very Important', 'Not Important'],
        scores: [5, 4, 3, 2, 1]
      },
      {
        text: 'How important is helping others in your career?',
        category: 'Values',
        options: ['Most Important', 'Very Important', 'Somewhat Important', 'Not Very Important', 'Not Important'],
        scores: [5, 4, 3, 2, 1]
      },
      {
        text: 'How important is work-life balance to you?',
        category: 'Values',
        options: ['Most Important', 'Very Important', 'Somewhat Important', 'Not Very Important', 'Not Important'],
        scores: [5, 4, 3, 2, 1]
      },
      {
        text: 'How important is job security?',
        category: 'Values',
        options: ['Most Important', 'Very Important', 'Somewhat Important', 'Not Very Important', 'Not Important'],
        scores: [5, 4, 3, 2, 1]
      },
      {
        text: 'How important is creativity and innovation in your work?',
        category: 'Values',
        options: ['Most Important', 'Very Important', 'Somewhat Important', 'Not Very Important', 'Not Important'],
        scores: [5, 4, 3, 2, 1]
      },

      // MODULE 5: Academic Questions (5 questions)
      {
        text: 'Which subject do you score highest in?',
        category: 'Academic',
        options: ['Mathematics', 'Science', 'Languages', 'Social Studies', 'Arts'],
        scores: [5, 4, 3, 2, 1]
      },
      {
        text: 'Which subject do you enjoy studying the most?',
        category: 'Academic',
        options: ['Mathematics', 'Science', 'Languages', 'Social Studies', 'Arts'],
        scores: [5, 4, 3, 2, 1]
      },
      {
        text: 'What is your preferred method of learning?',
        category: 'Academic',
        options: ['Solving Problems', 'Reading & Writing', 'Hands-on Activities', 'Group Discussions', 'Visual Learning'],
        scores: [5, 4, 3, 2, 1]
      },
      {
        text: 'How well do you perform in exams?',
        category: 'Academic',
        options: ['Excellent (90-100%)', 'Good (80-89%)', 'Average (70-79%)', 'Below Average (60-69%)', 'Poor (Below 60%)'],
        scores: [5, 4, 3, 2, 1]
      },
      {
        text: 'Which extracurricular activity do you prefer?',
        category: 'Academic',
        options: ['Science/Math Club', 'Debate/Quiz', 'Sports', 'Arts/Music', 'Student Council'],
        scores: [5, 4, 3, 2, 1]
      }
    ]);

    console.log('✅ Questions created');

    // Create Careers
    await Career.create([
      {
        name: 'Software Engineer',
        cluster: techCluster._id,
        description: 'Design, develop, and maintain software applications',
        requirements: {
          Interest: 85,
          Aptitude: 90,
          Personality: 70,
          Values: 65,
          Academic: 85
        },
        stream: 'Science with Mathematics',
        courses: 'B.Tech/B.E. in Computer Science',
        roadmap: 'Year 1-2: Learn programming basics\nYear 3: Build projects\nYear 4: Internship\nAfter: Get job or M.Tech',
        skills: ['Python', 'JavaScript', 'Problem Solving', 'Data Structures'],
        backupCareers: ['Data Analyst', 'IT Consultant', 'Web Developer']
      },
      {
        name: 'Data Scientist',
        cluster: techCluster._id,
        description: 'Analyze complex data to help companies make decisions',
        requirements: {
          Interest: 80,
          Aptitude: 95,
          Personality: 75,
          Values: 70,
          Academic: 90
        },
        stream: 'Science with Mathematics',
        courses: 'B.Sc/M.Sc Statistics or B.Tech CSE',
        roadmap: 'Year 1-2: Learn statistics & Python\nYear 3: Machine Learning\nYear 4: Projects & Internship',
        skills: ['Python', 'Statistics', 'Machine Learning', 'SQL'],
        backupCareers: ['Data Analyst', 'Business Analyst', 'ML Engineer']
      },
      {
        name: 'Doctor',
        cluster: medicalCluster._id,
        description: 'Diagnose and treat patients',
        requirements: {
          Interest: 90,
          Aptitude: 85,
          Personality: 80,
          Values: 95,
          Academic: 95
        },
        stream: 'Science with Biology',
        courses: 'MBBS then MD/MS',
        roadmap: 'Year 1-2: 11th-12th PCB\nYear 3-7: MBBS\nYear 8+: Specialization',
        skills: ['Patience', 'Attention to detail', 'Communication', 'Empathy'],
        backupCareers: ['Dentist', 'Pharmacist', 'Medical Researcher']
      },
      {
        name: 'Civil Engineer',
        cluster: engineeringCluster._id,
        description: 'Design and supervise construction projects',
        requirements: {
          Interest: 75,
          Aptitude: 80,
          Personality: 70,
          Values: 75,
          Academic: 80
        },
        stream: 'Science with Mathematics',
        courses: 'B.Tech in Civil Engineering',
        roadmap: 'Year 1-2: Engineering fundamentals\nYear 3: Specialization\nYear 4: Internship\nAfter: Job or M.Tech',
        skills: ['AutoCAD', 'Project Management', 'Mathematics', 'Physics'],
        backupCareers: ['Structural Engineer', 'Construction Manager', 'Urban Planner']
      },
      {
        name: 'Chartered Accountant',
        cluster: businessCluster._id,
        description: 'Manage financial accounts and audits',
        requirements: {
          Interest: 70,
          Aptitude: 80,
          Personality: 75,
          Values: 80,
          Academic: 85
        },
        stream: 'Commerce with Mathematics',
        courses: 'B.Com + CA',
        roadmap: 'Year 1-2: 11th-12th Commerce\nYear 3-5: B.Com + CA Foundation\nYear 6-8: CA Intermediate & Final',
        skills: ['Accounting', 'Taxation', 'Auditing', 'Financial Analysis'],
        backupCareers: ['Financial Analyst', 'Tax Consultant', 'Auditor']
      },
      {
        name: 'Graphic Designer',
        cluster: artsCluster._id,
        description: 'Create visual concepts for communication',
        requirements: {
          Interest: 90,
          Aptitude: 70,
          Personality: 80,
          Values: 70,
          Academic: 65
        },
        stream: 'Arts with Fine Arts',
        courses: 'B.Des or BFA in Graphic Design',
        roadmap: 'Year 1-2: 11th-12th Arts\nYear 3-6: Design degree\nYear 7+: Build portfolio & freelance',
        skills: ['Adobe Creative Suite', 'Typography', 'Creativity', 'Communication'],
        backupCareers: ['UI/UX Designer', 'Art Director', 'Illustrator']
      }
    ]);

    console.log('✅ Careers created');

    // Count and display summary
    const questionCount = await Question.countDocuments();
    const careerCount = await Career.countDocuments();
    const clusterCount = await CareerCluster.countDocuments();

    console.log('📊 Summary:');
    console.log(`   - Questions: ${questionCount}`);
    console.log(`   - Careers: ${careerCount}`);
    console.log(`   - Clusters: ${clusterCount}`);
    console.log('🎉 Database seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();