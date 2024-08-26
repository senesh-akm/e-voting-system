import React, { useState, useEffect, useRef } from "react";

const TopNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between p-4 text-white bg-blue-500">
      {/* Logo / Brand Name */}
      <div className="text-xl font-bold">
        e-Voting
      </div>
      
      {/* Profile Dropdown */}
      <div className="relative">
        <button 
          onClick={toggleDropdown}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <img
            src="https://via.placeholder.com/30"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <span className="hidden md:inline">User Name</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        {/* Dropdown Menu */}
        <div 
          ref={dropdownRef}
          className={`absolute right-0 mt-2 w-48 bg-white rounded shadow-md ${isDropdownOpen ? 'block' : 'hidden'}`}
        >
          <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
            Profile
          </button>
          <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
            Settings
          </button>
          <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;