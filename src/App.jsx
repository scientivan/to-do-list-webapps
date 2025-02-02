import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TodoFormPage from './pages/TodoFormPage';
import TodoDetailPage from './pages/TodoDetailPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State untuk status login

  const [todos, setTodos] = useState([ // State untuk menyimpan daftar to-do
    { id: 1, title: 'Buy coffee beans', description: 'Get Arabica beans', dueDate: '2023-10-15', priority: 'High', completed: false },
    { id: 2, title: 'Clean the cafe', description: 'Clean tables and floors ffffffffff ffffffffff ffffff fffff fiwiiehfeeee e eeeeeeeeeee eeeee eeeeee fww wwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwww wwwwwwww w www wwwww jjjj jjffffff fff fffff fffi iiiiii sampai siniii okeee', dueDate: '2023-10-10', priority: 'Medium', completed: true },
    { id: 3, title: 'Order new cups', description: 'Order 100 new cups', dueDate: '2023-10-20', priority: 'Low', completed: false },
    { id: 4, title: 'Order new car', description: 'Order 100 new car', dueDate: '2023-11-20', priority: 'High', completed: true },
    { id: 5, title: 'Order new laptop', description: 'Order 100 new laptop', dueDate: '2022-10-20', priority: 'Low', completed: false },
  ]);

  // Fungsi untuk handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Fungsi untuk handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        {/* Route untuk login */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
        />

        {/* Route untuk register */}
        <Route path="/register" element={<Register />} />

        {/* Route untuk dashboard */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard todos={todos} setTodos={setTodos} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Route untuk membuat to-do baru */}
        <Route
          path="/create"
          element={
            isLoggedIn ? (
              <TodoFormPage todos={todos} setTodos={setTodos} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Route untuk mengedit to-do */}
        <Route
          path="/edit/:id"
          element={
            isLoggedIn ? (
              <TodoFormPage todos={todos} setTodos={setTodos} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Route untuk melihat detail to-do */}
        <Route
          path="/todo/:id"
          element={
            isLoggedIn ? (
              <TodoDetailPage todos={todos} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Route default (redirect ke dashboard jika sudah login, atau ke login jika belum) */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;