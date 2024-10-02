import React, { useState, useEffect } from 'react';
import axios from 'axios';

const District = () => {
  // State to hold district name input and the list of districts
  const [districtName, setDistrictName] = useState('');
  const [districts, setDistricts] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({}); // User data for logging

  // Fetch user data from localStorage to use for audit logs
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  // Function to handle form submission for adding a new district
  const handleAddDistrict = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/districts', {
        name: districtName,
      });

      setMessage(response.data.message);
      setDistrictName(''); // Clear the input field after adding
      fetchDistricts(); // Refresh the list of districts

      // Log the district addition to the audit log
      await logAuditAction('Add District', `Added district: ${districtName}`);

      // Clear the message after 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (error) {
      setMessage('Error adding district. Make sure the district name is unique.');
      // Clear the message after 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  // Function to fetch the list of districts from the backend
  const fetchDistricts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/districts');
      setDistricts(response.data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  // Function to log the action in the audit log
  const logAuditAction = async (action, description) => {
    try {
      await axios.post('http://localhost:8000/api/audit-logs', {
        user_id: user.id,
        action: action,
        description: description,
      });
    } catch (error) {
      console.error('Error logging audit action:', error);
    }
  };

  // Use useEffect to fetch the districts once the component is mounted
  useEffect(() => {
    fetchDistricts();
  }, []);

  return (
    <div className="p-8 flex flex-col items-center space-y-8"> {/* Stack the two cards vertically with spacing */}
      {/* Add District Card */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-3/4 lg:w-2/3 xl:w-1/2"> {/* Card for Adding District */}
        <h1 className="text-2xl font-bold mb-4">Add District</h1>
  
        {/* Form for adding a new district */}
        <form onSubmit={handleAddDistrict} className="mb-6">
          <div className="flex items-center">
            <input
              type="text"
              value={districtName}
              onChange={(e) => setDistrictName(e.target.value)}
              placeholder="Enter district name"
              className="p-2 border rounded w-full md:w-2/3 mr-2"
              required
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add District
            </button>
          </div>
          {message && <p className="mt-4 text-green-500">{message}</p>}
        </form>
      </div>

      {/* District List Card */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-3/4 lg:w-2/3 xl:w-1/2"> {/* Card for District List */}
        <h2 className="text-xl font-bold mb-4">District List</h2>
        <h3 className="text-lg font-bold mb-3">Number of Districts: {districts.length}</h3>
        <ul className="border rounded p-4 bg-gray-50 h-96 overflow-y-auto"> {/* Scrollable district list */}
          {districts.length > 0 ? (
            districts.map((district) => (
              <li key={district.id} className="border-b p-2">
                {district.name}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No districts available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default District;
