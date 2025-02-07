import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { checkAuth } from './api';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TodoFormPage from './pages/TodoFormPage';
import TodoDetailPage from './pages/TodoDetailPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Cek status autentikasi saat pertama load
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth();
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error auth:', error.message);
        setIsLoggedIn(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    verifyAuth();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (isCheckingAuth) {
    return <div className="text-center p-8">Checking authentication...</div>;
  }

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
        />

        <Route 
          path="/register" 
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />} 
        />

        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/create"
          element={
            isLoggedIn ? <TodoFormPage /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/edit/:id"
          element={
            isLoggedIn ? <TodoFormPage /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/details/:id"
          element={
            isLoggedIn ? <TodoDetailPage /> : <Navigate to="/login" />
          }
        />

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