import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateTodoPage from './pages/CreateTodoPage';
import TodoListPage from './pages/TodoListPage';
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Daftar Tugas Kita! ✨</h1>

          {/* Navigasi Link */}
          <nav className="main-nav">
            <Link to="/" className="nav-button">Tambah Tugas</Link>
            <Link to="/todos" className="nav-button">Lihat Daftar Tugas</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<CreateTodoPage />} />
          <Route path="/todos" element={<TodoListPage />} />

          {/* Optional: Add a 404 Not Found page */}
          <Route path="*" element={<p>Halaman tidak ditemukan! 🐾</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;