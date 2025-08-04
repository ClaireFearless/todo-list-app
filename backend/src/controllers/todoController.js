const Todo = require('../../models/Todo'); 
const { validationResult } = require('express-validator');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 }); 
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//Cari Todo
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Membuat Todo
exports.createTodo = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTodo = new Todo({
    title,
    description
  });

  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//Update Todo
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const updateData = {};
    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.description !== undefined) updateData.description = req.body.description;


    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      updateData, 
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//Mengahpus Todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Todo removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Status selesai Todo
exports.toggleTodoComplete = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.completed = !todo.completed; 
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};