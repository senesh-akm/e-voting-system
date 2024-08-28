import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Party = () => {
  // State to hold party name input and the list of parties
  const [partyName, setPartyName] = useState('');
  const [parties, setParties] = useState([]);
  const [message, setMessage] = useState('');

  // Function to handle form submission for adding a new party
  const handleAddParty = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/parties', {
        name: partyName,
      });
      setMessage(response.data.message);
      setPartyName(''); // Clear the input field after adding
      fetchParties(); // Refresh the list of parties
    } catch (error) {
      setMessage('Error adding party. Make sure the party name is unique.');
    }
  };

  // Function to fetch the list of parties from the backend
  const fetchParties = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/parties');
      setParties(response.data);
    } catch (error) {
      console.error('Error fetching parties:', error);
    }
  };

  // Use useEffect to fetch the parties once the component is mounted
  useEffect(() => {
    fetchParties();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manage Parties</h1>

      {/* Form for adding a new party */}
      <form onSubmit={handleAddParty} className="mb-6">
        <div className="flex items-center">
          <input
            type="text"
            value={partyName}
            onChange={(e) => setPartyName(e.target.value)}
            placeholder="Enter party name"
            className="p-2 border rounded w-full md:w-1/2 mr-2"
            required
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Party
          </button>
        </div>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </form>

      {/* List of parties */}
      <h2 className="text-xl font-bold mb-4">Party List</h2>
      <ul className="border rounded p-4 bg-white">
        {parties.length > 0 ? (
          parties.map((party) => (
            <li key={party.id} className="border-b p-2">
              {party.name}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No parties available.</li>
        )}
      </ul>
    </div>
  );
};

export default Party;
