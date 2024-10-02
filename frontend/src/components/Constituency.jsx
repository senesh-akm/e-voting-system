import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Constituency = () => {
  // State variables
  const [name, setName] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [constituencies, setConstituencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({}); // User data for audit log

  // Fetch constituencies and districts when the component is mounted
  useEffect(() => {
    fetchConstituencies();
    fetchDistricts();
    fetchUser(); // Fetch the user data for logging
  }, []);

  // Fetch user data from localStorage for audit log purposes
  const fetchUser = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  };

  // Function to fetch constituencies
  const fetchConstituencies = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/constituencies');
      setConstituencies(data);
    } catch (error) {
      console.error('Error fetching constituencies:', error);
    }
  };

  // Function to fetch districts
  const fetchDistricts = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/districts');
      setDistricts(data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  // Function to log the "Add Constituency" action in the audit log
  const logAuditAction = async (action, description) => {
    try {
      await axios.post('http://localhost:8000/api/audit-logs', {
        user_id: user.id,
        action,
        description,
      });
    } catch (error) {
      console.error('Error logging audit action:', error);
    }
  };

  // Function to handle adding a new constituency
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/constituencies', {
        name,
        district_id: districtId,
      });
      setMessage('Constituency added successfully!');
      setName('');
      setDistrictId('');
      fetchConstituencies(); // Refresh the list

      // Log the constituency addition to the audit log
      await logAuditAction('Add Constituency', `Added constituency: ${name} to district ID: ${districtId}`);

      // Clear the message after 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (error) {
      setMessage('Error adding constituency. Make sure the name is unique and district exists.');
      // Clear the message after 5 seconds in case of an error too
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  return (
    <div className="p-8 flex flex-col items-center space-y-8">
      {/* Add Constituency Card */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-4/5 lg:w-3/4 xl:w-3/4">
        <h1 className="text-2xl font-bold mb-4">Add Constituency</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter constituency name"
              className="p-2 border rounded w-full"
              required
            />
            {/* Dropdown for districts */}
            <select
              value={districtId}
              onChange={(e) => setDistrictId(e.target.value)}
              className="p-2 border rounded w-full"
              required
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Constituency
            </button>
          </div>
          {message && <p className="mt-4 text-green-500">{message}</p>}
        </form>
      </div>
  
      {/* Constituency List Card */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-4/5 lg:w-3/4 xl:w-3/4">
        <h1 className="text-xl font-bold mb-4">Constituency List</h1>
        <h3 className="text-lg font-bold mb-3">Number of Constituencies: {constituencies.length}</h3>
        <ul className="border rounded p-4 bg-gray-50 h-96 overflow-y-auto">
          {constituencies.length > 0 ? (
            constituencies.map((constituency) => (
              <li key={constituency.id} className="border-b p-2">
                {constituency.name} | {constituency.district.name}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No constituencies available.</li>
          )}
        </ul>
      </div>
    </div>
  );  
};

export default Constituency;
