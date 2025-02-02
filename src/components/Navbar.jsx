import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk mengontrol menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          To-Do App
        </Link>

        {/* Hamburger Icon untuk layar kecil */}
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none md:hidden"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Menu untuk layar besar */}
        <div className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-white hover:underline">
                Dashboard
              </Link>
              <Link to="/create" className="text-white hover:underline">
                Create Todo
              </Link>
              <button
                onClick={onLogout}
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

      {/* Menu untuk layar kecil */}
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
                Create Todo
              </Link>
              <button
                onClick={() => {
                  onLogout();
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