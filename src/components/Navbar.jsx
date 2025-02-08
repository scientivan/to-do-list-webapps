import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api";
import { Menu, X } from "lucide-react";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) { // Hanya berlaku untuk desktop
        setScrolled(window.scrollY > 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
      navigate("/login");
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out md:px-4 
        md:${scrolled ? "bg-blue-600 bg-opacity-90 backdrop-blur shadow-md mt-4 mx-4 rounded-lg" : "bg-blue-600 shadow-md"} 
        ${isMenuOpen ? "bg-blue-600" : "bg-blue-600"} // Pastikan warna tetap biru di mobile
      `}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          Dolist
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Dashboard
              </Link>
              <Link to="/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Add Todo
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu - Smooth Transition */}
      <div
        className={`absolute top-0 left-0 w-full h-screen bg-blue-700 text-white flex flex-col items-center justify-center space-y-6 transition-transform duration-300 
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} md:hidden z-50`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-5 right-5 text-white"
        >
          <X size={32} />
        </button>

        {isLoggedIn ? (
          <>
            <Link
              to="/dashboard"
              className="text-xl hover:underline"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/create"
              className="text-xl hover:underline"
              onClick={toggleMenu}
            >
              Add Todo
            </Link>
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="text-xl hover:underline"
            onClick={toggleMenu}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
