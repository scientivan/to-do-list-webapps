import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../api';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
      navigate('/login');
    } catch (error) {
      console.error('Gagal logout:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Dolist
        </Link>

        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none md:hidden"
        >
          {/* Hamburger Icon */}
        </button>

        <div className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-white hover:underline">
                Dashboard
              </Link>
              <Link to="/create" className="text-white hover:underline">
                Add Todo
              </Link>
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 px-3 py-1 rounded hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="block text-white py-2 hover:bg-blue-500"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/create"
                className="block text-white py-2 hover:bg-blue-500"
                onClick={toggleMenu}
              >
                Add Todo
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="block w-full text-white bg-red-500 px-3 py-2 rounded mt-2 hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block text-white py-2 hover:bg-blue-500"
              onClick={toggleMenu}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;