import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios";

const TopNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);  // State to hold the user information
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Use for redirecting after logout

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch user information when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Assume the user data is stored in local storage after login
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData && userData.name) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle user logout
  const handleLogout = async () => {
    try {
      // Call the logout API
      await axios.post("http://localhost:8000/api/logout");
      
      // Clear user data from local storage
      localStorage.removeItem("user");

      // Redirect to the login page
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 text-white bg-blue-500">
      {/* Logo / Brand Name */}
      <div className="text-xl font-bold">e-Voting</div>

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
          <span className="hidden md:inline">{user ? user.name : "User Name"}</span>
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
          className={`absolute right-0 mt-2 w-48 bg-white rounded shadow-md ${isDropdownOpen ? "block" : "hidden"}`}
        >
          <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
            Profile
          </button>
          <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
