// backend/src/routes/todoRoutes.js

const express = require('express');
const { body, param } = require('express-validator');
const {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodoComplete
} = require('../controllers/todoController');

const router = express.Router();

// Middleware validasi untuk ID (agar ID yang masuk valid ObjectId)
const validateTodoId = [
  param('id').isMongoId().withMessage('Invalid Todo ID format')
];

// Middleware validasi untuk membuat dan memperbarui todo
const validateTodo = [
  body('title')
    .notEmpty().withMessage('Title cannot be empty')
    .trim() 
    .isLength({ max: 100 }).withMessage('Title cannot be more than 100 characters')
    .escape(), 
  body('description')
    .optional({ checkFalsy: true }) 
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot be more than 500 characters')
    .escape() 
];

// Get all todos
router.get('/', getTodos);

// Get single todo by ID (dengan validasi ID)
router.get('/:id', validateTodoId, getTodoById);

// Create a new todo (dengan validasi)
router.post('/', validateTodo, createTodo);

// Update a todo by ID (dengan validasi ID dan body)
router.put('/:id', validateTodoId, validateTodo, updateTodo);

// Delete a todo by ID (dengan validasi ID)
router.delete('/:id', validateTodoId, deleteTodo);

// Toggle todo completion status by ID (dengan validasi ID)
router.put('/:id/toggle', validateTodoId, toggleTodoComplete);


module.exports = router;