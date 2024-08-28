import React, { useState, useEffect } from 'react';
import axios from 'axios';

const District = () => {
  // State to hold district name input and the list of districts
  const [districtName, setDistrictName] = useState('');
  const [districts, setDistricts] = useState([]);
  const [message, setMessage] = useState('');

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
    } catch (error) {
      setMessage('Error adding district. Make sure the district name is unique.');
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

  // Use useEffect to fetch the districts once the component is mounted
  useEffect(() => {
    fetchDistricts();
  }, []);

  return (
    <div className="p-8 flex justify-center"> {/* Center align the card */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-3/4 lg:w-2/3 xl:w-1/2"> {/* Card Container with increased width */}
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

        {/* List of districts */}
        <h2 className="text-xl font-bold mb-4">District List</h2>
        <ul className="border rounded p-4 bg-gray-50">
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
