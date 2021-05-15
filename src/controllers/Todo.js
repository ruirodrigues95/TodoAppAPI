const db = require('../config/db')

class Todo {
  // Get All Todos
  async getTodos(id) {
    let results = await db.query('SELECT * FROM todos WHERE user_id=$1', [id])
    return results.rows
  }

  // Create a Todo
  async createTodo(todo) {
    await db.query('INSERT INTO todos (title, user_id, checked) VALUES ($1, $2, $3)', [todo.title, todo.userId, false])
    .catch((e) => console.log(e))
  }

  // Update a Todo
  async updateTodo(todoId) {
    let original_todo = await db
      .query('SELECT * FROM todos WHERE id=$1', [parseInt(todoId)])
      .catch((e) => console.log(e))

    let new_checked_value = !original_todo.rows[0].checked

    // Update the checked todo
    await db
      .query('UPDATE todos SET checked=$1 WHERE id=$2', [new_checked_value, parseInt(todoId)])
      .catch((e) => console.log(e))

    return
  }

  // Delete A Todo
  async deleteTodo(todoId) {
    await db.query('DELETE FROM todos WHERE id=$1', [parseInt(todoId)])
      .catch((e) => console.log(e))

    return
  }
}

module.exports = Todo