// frontend/src/pages/TodoListPage.js

import React, { useState, useEffect } from 'react';

function TodoListPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true); 
      const response = await fetch('/api/todos');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error("Error fetching todos:", err);
      setError("Gagal memuat tugas. Coba lagi nanti ya! 😢");
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}/toggle`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
      
    } catch (err) {
      console.error("Error toggling todo:", err);
      setError("Gagal mengubah status tugas. Maaf ya! 😓");
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
      setError("Tugas nya gagal di hapus wok. Jangan sedih ya! 🥺");
    }
  };

  if (loading) {
    return (
      <div className="page-content-wrapper">
        <p className="loading-message">Memuat daftar tugas-tugas... 😋</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-content-wrapper">
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="page-content-wrapper">
      <h2 className="page-title">Daftar Semua Tugas 📖</h2>
      {todos.length === 0 ? (
        <p className="no-todos-message">
          Kelazzz King! Semua tugas sudah beres! Waktunya main atau bikin tugas baru lagi! 🎉
        </p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-content">
                <span
                  className={`todo-status-icon ${todo.completed ? 'completed-icon' : 'pending-icon'}`}
                  onClick={() => toggleTodo(todo._id)}
                >
                  {todo.completed ? '✅' : '⏳'}
                </span>
                <div className="todo-text">
                  <h3 className="todo-title" onClick={() => toggleTodo(todo._id)}>
                    {todo.title}
                  </h3>
                  {todo.description && <p className="todo-description">{todo.description}</p>}
                </div>
              </div>
              <button onClick={() => deleteTodo(todo._id)} className="delete-button">
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoListPage;