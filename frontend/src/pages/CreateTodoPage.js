import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function CreateTodoPage() {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate(); 

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) {
      alert("Judul tugas tidak boleh kosong!");
      return;
    }

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTodoTitle, description: newTodoDescription }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json(); 
      setNewTodoTitle('');
      setNewTodoDescription('');
      setSuccessMessage("Tugas baru berhasil ditambahkan! ✨");
      setError(null); 


      setTimeout(() => {
        navigate('/todos');
      }, 2000);

    } catch (err) {
      console.error("Error adding todo:", err);
      setError("Gagal menambahkan tugas. Ayo coba lagi! 😞");
      setSuccessMessage(null); 
    }
  };

  return (
    <div className="page-content-wrapper">
      <h2 className="page-title">Tambah Tugas Baru 📝</h2>
      <p className="subtitle">Yuk, bikin tugas baru! 😊</p>

      {error && <p className="message-box error-message">{error}</p>}
      {successMessage && <p className="message-box success-message">{successMessage}</p>}

      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          placeholder="Tugas baru apa hari ini?"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          className="todo-input"
        />
        <textarea
          placeholder="Sedikit detail tentang tugas ini (opsional)"
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
          className="todo-textarea"
        ></textarea>
        <button type="submit" className="add-button">Tambah Tugas! </button>
      </form>
    </div>
  );
}

export default CreateTodoPage;