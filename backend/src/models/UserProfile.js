const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UserProfile = sequelize.define('UserProfile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  
  // Academic Background
  education_level: {
    type: DataTypes.STRING
  },
  degree: {
    type: DataTypes.STRING
  },
  major: {
    type: DataTypes.STRING
  },
  graduation_year: {
    type: DataTypes.INTEGER
  },
  gpa: {
    type: DataTypes.FLOAT
  },
  
  // Study Goals
  intended_degree: {
    type: DataTypes.STRING
  },
  field_of_study: {
    type: DataTypes.STRING
  },
  target_intake_year: {
    type: DataTypes.INTEGER
  },
  preferred_countries: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  
  // Budget
  budget_min: {
    type: DataTypes.INTEGER
  },
  budget_max: {
    type: DataTypes.INTEGER
  },
  funding_plan: {
    type: DataTypes.STRING // "Self-funded", "Scholarship", "Loan"
  },
  
  // Exam Status
  ielts_status: {
    type: DataTypes.STRING,
    defaultValue: 'Not Started'
  },
  ielts_score: {
    type: DataTypes.FLOAT
  },
  gre_status: {
    type: DataTypes.STRING,
    defaultValue: 'Not Started'
  },
  gre_score: {
    type: DataTypes.INTEGER
  },
  sop_status: {
    type: DataTypes.STRING,
    defaultValue: 'Not Started'
  },
  
  // Profile Completion
  is_completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  current_stage: {
    type: DataTypes.STRING,
    defaultValue: 'Building Profile'
  },
  
  // AI Generated Strength
  academic_strength: {
    type: DataTypes.STRING // "Strong", "Average", "Weak"
  },
  exam_strength: {
    type: DataTypes.STRING
  },
  overall_readiness: {
    type: DataTypes.STRING
  },
  improvement_areas: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  }
  
}, {
  tableName: 'user_profiles',
  timestamps: true,
  underscored: true
});

module.exports = UserProfile;