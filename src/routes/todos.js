const express = require('express')
const Todo = require('../controllers/Todo')
const router = express.Router()

// Get All Todos
router.get('/', async (req, res) => {
  try {
    const todos = await new Todo().getTodos(req.userId)
    res.status(200).json(todos)
  }
  catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
  
})

// Create a Todo
router.post('/', async (req, res) => {
  try {
    const { title } = req.body
    const userId = req.userId
    await new Todo().createTodo({title, userId})
    res.status(200).json({ message: 'Todo created successfully!'})
  }
  catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
})

// Update a Todo
router.put('/todos/:todoId', async (req, res) => {
  try {
    const { todoId } = req.params
    await new Todo().updateTodo(todoId, res)
    res.status(200).json({ message: 'Todo updated successfully!'})
  }
  catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
})

// Delete a Todo
router.delete('/todos/:todoId', async (req, res) => {
  try {
    let { todoId } = req.params
    await new Todo().deleteTodo(todoId)
    let todos = await new Todo().getTodos()
    res.status(200).json({ message: 'Todo deleted successfully!' })
  }
  catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
})

module.exports = router