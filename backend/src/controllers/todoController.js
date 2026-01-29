const { Todo, University } = require('../models');

// Get All Todos
const getTodos = async (req, res) => {
  try {
    const { status, category } = req.query;
    
    let whereClause = { user_id: req.user.id };
    
    if (status === 'completed') {
      whereClause.is_completed = true;
    } else if (status === 'pending') {
      whereClause.is_completed = false;
    }
    
    if (category) {
      whereClause.category = category;
    }
    
    const todos = await Todo.findAll({
      where: whereClause,
      include: [{ model: University, as: 'university', required: false }],
      order: [
        ['is_completed', 'ASC'],
        ['priority', 'DESC'],
        ['due_date', 'ASC']
      ]
    });
    
    res.json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch todos', 
      error: error.message 
    });
  }
};

// Create Todo
const createTodo = async (req, res) => {
  try {
    const { title, description, category, priority, due_date, university_id } = req.body;
    
    const todo = await Todo.create({
      user_id: req.user.id,
      title,
      description,
      category,
      priority,
      due_date,
      university_id
    });
    
    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: todo
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create todo', 
      error: error.message 
    });
  }
};

// Update Todo
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    
    const todo = await Todo.findOne({
      where: {
        id,
        user_id: req.user.id
      }
    });
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    await todo.update(req.body);
    
    res.json({
      success: true,
      message: 'Todo updated successfully',
      data: todo
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update todo', 
      error: error.message 
    });
  }
};

// Toggle Todo Completion
const toggleTodoCompletion = async (req, res) => {
  try {
    const { id } = req.params;
    
    const todo = await Todo.findOne({
      where: {
        id,
        user_id: req.user.id
      }
    });
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    const isCompleted = !todo.is_completed;
    
    await todo.update({
      is_completed: isCompleted,
      completed_at: isCompleted ? new Date() : null
    });
    
    res.json({
      success: true,
      message: `Todo marked as ${isCompleted ? 'completed' : 'pending'}`,
      data: todo
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to toggle todo', 
      error: error.message 
    });
  }
};

// Delete Todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    
    const todo = await Todo.findOne({
      where: {
        id,
        user_id: req.user.id
      }
    });
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    await todo.destroy();
    
    res.json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete todo', 
      error: error.message 
    });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  toggleTodoCompletion,
  deleteTodo
};