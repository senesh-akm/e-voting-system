import { useState } from "react";
import { Link } from "react-router-dom";

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top Row */}
        <div className="flex flex-row justify-between items-center h-16">
          
          {/* Logo */}
          <div className="text-xl font-bold text-gray-800">
            Logo
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600 focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu (Vertical) */}
        {isOpen && (
          <div className="md:hidden flex flex-col border-t">
            <Link
              to="/"
              className="px-4 py-3 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-3 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AppNavbar;
