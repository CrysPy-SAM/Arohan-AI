const { Todo } = require('../models');

// Generate Initial Todos (after onboarding)
const generateInitialTodos = async (userId, profileData) => {
  const todos = [];
  
  // Exam todos
  if (profileData.ielts_status === 'Not Started') {
    todos.push({
      user_id: userId,
      title: 'Register for IELTS exam',
      description: 'Book your IELTS test date and prepare for the exam',
      category: 'Exam',
      priority: 'High',
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });
  }
  
  if (profileData.gre_status === 'Not Started' && profileData.intended_degree === 'Masters') {
    todos.push({
      user_id: userId,
      title: 'Register for GRE exam',
      description: 'Book your GRE test date and start preparation',
      category: 'Exam',
      priority: 'High',
      due_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000) // 45 days
    });
  }
  
  // SOP todo
  if (profileData.sop_status === 'Not Started') {
    todos.push({
      user_id: userId,
      title: 'Start writing Statement of Purpose',
      description: 'Begin drafting your SOP highlighting your goals and experiences',
      category: 'Document',
      priority: 'High',
      due_date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000) // 20 days
    });
  }
  
  // General todos
  todos.push({
    user_id: userId,
    title: 'Shortlist at least 5 universities',
    description: 'Use AI recommendations to shortlist universities matching your profile',
    category: 'General',
    priority: 'Medium',
    due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days
  });
  
  // Create all todos
  const createdTodos = await Todo.bulkCreate(todos);
  return createdTodos;
};

// Generate University-Specific Todos (after locking)
const generateUniversityTodos = async (userId, university) => {
  const todos = [];
  
  todos.push({
    user_id: userId,
    university_id: university.id,
    title: `Complete application form for ${university.name}`,
    description: 'Fill out the online application form with accurate information',
    category: 'Application',
    priority: 'High',
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  });
  
  todos.push({
    user_id: userId,
    university_id: university.id,
    title: `Prepare SOP for ${university.name}`,
    description: 'Customize your SOP specifically for this university',
    category: 'Document',
    priority: 'High',
    due_date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000)
  });
  
  todos.push({
    user_id: userId,
    university_id: university.id,
    title: `Request LORs for ${university.name}`,
    description: 'Contact professors for Letters of Recommendation',
    category: 'Document',
    priority: 'High',
    due_date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000)
  });
  
  todos.push({
    user_id: userId,
    university_id: university.id,
    title: `Pay application fee for ${university.name}`,
    description: 'Complete the application fee payment',
    category: 'Application',
    priority: 'Medium',
    due_date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000)
  });
  
  const createdTodos = await Todo.bulkCreate(todos);
  return createdTodos;
};

module.exports = {
  generateInitialTodos,
  generateUniversityTodos
};