const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const University = sequelize.define('University', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ranking: {
    type: DataTypes.INTEGER
  },
  
  // Programs
  programs: {
    type: DataTypes.JSONB, // [{"name": "MS CS", "duration": "2 years"}]
    defaultValue: []
  },
  
  // Cost
  tuition_fee_min: {
    type: DataTypes.INTEGER
  },
  tuition_fee_max: {
    type: DataTypes.INTEGER
  },
  living_cost: {
    type: DataTypes.INTEGER
  },
  
  // Requirements
  min_gpa: {
    type: DataTypes.FLOAT
  },
  min_ielts: {
    type: DataTypes.FLOAT
  },
  min_gre: {
    type: DataTypes.INTEGER
  },
  
  // Acceptance
  acceptance_rate: {
    type: DataTypes.FLOAT // 0.0 to 1.0
  },
  
  // Additional Info
  application_deadline: {
    type: DataTypes.STRING
  },
  website: {
    type: DataTypes.STRING
  }
  
}, {
  tableName: 'universities',
  timestamps: false,
  underscored: true
});

module.exports = University;