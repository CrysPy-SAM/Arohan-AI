const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Shortlist = sequelize.define('Shortlist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  university_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'universities',
      key: 'id'
    }
  },
  
  // Locking
  is_locked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  locked_at: {
    type: DataTypes.DATE
  },
  
  // AI Analysis
  category: {
    type: DataTypes.STRING // "Dream", "Target", "Safe"
  },
  ai_reasoning: {
    type: DataTypes.TEXT
  },
  risk_analysis: {
    type: DataTypes.TEXT
  },
  acceptance_likelihood: {
    type: DataTypes.STRING // "Low", "Medium", "High"
  }
  
}, {
  tableName: 'shortlists',
  timestamps: true,
  underscored: true
});

module.exports = Shortlist;