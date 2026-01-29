const User = require('./User');
const UserProfile = require('./UserProfile');
const University = require('./University');
const Shortlist = require('./Shortlist');
const Todo = require('./Todo');

// Associations
User.hasOne(UserProfile, { foreignKey: 'user_id', as: 'profile' });
UserProfile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Shortlist, { foreignKey: 'user_id', as: 'shortlists' });
Shortlist.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Shortlist.belongsTo(University, { foreignKey: 'university_id', as: 'university' });

User.hasMany(Todo, { foreignKey: 'user_id', as: 'todos' });
Todo.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Todo.belongsTo(University, { foreignKey: 'university_id', as: 'university' });

module.exports = {
  User,
  UserProfile,
  University,
  Shortlist,
  Todo
};