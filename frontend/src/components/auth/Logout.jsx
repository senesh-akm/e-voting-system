import React from "react";
import axios from "axios";

const Logout = ({ setMessage }) => {
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/logout");
      setMessage("Logout successful");
    } catch (error) {
      setMessage("Logout failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
