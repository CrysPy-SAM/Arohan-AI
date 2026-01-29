const express = require('express');
const router = express.Router();
const { 
  getTodos, 
  createTodo, 
  updateTodo, 
  toggleTodoCompletion,
  deleteTodo 
} = require('../controllers/todoController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, getTodos);
router.post('/', authenticate, createTodo);
router.put('/:id', authenticate, updateTodo);
router.patch('/:id/toggle', authenticate, toggleTodoCompletion);
router.delete('/:id', authenticate, deleteTodo);

module.exports = router;