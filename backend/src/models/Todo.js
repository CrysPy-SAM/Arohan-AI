const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Todo = sequelize.define('Todo', {
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
    references: {
      model: 'universities',
      key: 'id'
    }
  },
  
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  category: {
    type: DataTypes.STRING // "Exam", "Document", "Application", "General"
  },
  priority: {
    type: DataTypes.STRING,
    defaultValue: 'Medium' // "Low", "Medium", "High"
  },
  due_date: {
    type: DataTypes.DATE
  },
  is_completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  completed_at: {
    type: DataTypes.DATE
  }
  
}, {
  tableName: 'todos',
  timestamps: true,
  underscored: true
});

module.exports = Todo;