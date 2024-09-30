import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you use axios for API requests

const Settings = ({ userId }) => {
  const [theme, setTheme] = useState(true); // true = light, false = dark
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the current theme of the user when the component mounts
  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/users/${userId}`);
        setTheme(response.data.theme); // Assuming the response contains the user's theme preference
      } catch (err) {
        setError("Failed to load user settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserSettings();
  }, [userId]);

  // Toggle theme and update on the server
  const toggleTheme = async () => {
    const newTheme = !theme;
    setTheme(newTheme);

    try {
      setLoading(true);
      await axios.put(`http://localhost:8000/api/users/${userId}/settings`, { theme: newTheme });
    } catch (err) {
      setError("Failed to update theme.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 settings-container">
      <h2 className="mb-4 text-xl font-semibold">Settings</h2>
      
      {error && <p className="mb-4 text-red-500">{error}</p>}

      <div className="theme-settings">
        <label className="flex items-center mb-4">
          <span className="mr-2">Dark Mode:</span>
          <input
            type="checkbox"
            checked={!theme} // If theme is false, it means dark mode is on
            onChange={toggleTheme}
            disabled={loading}
            className="cursor-pointer"
          />
        </label>
        {loading && <p>Saving settings...</p>}
      </div>
    </div>
  );
};

export default Settings;
