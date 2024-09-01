import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Party = () => {
  // State to hold party inputs and the list of parties
  const [partyName, setPartyName] = useState('');
  const [partyLogo, setPartyLogo] = useState(null);
  const [partyLogoPreview, setPartyLogoPreview] = useState(null); // State for image preview
  const [parties, setParties] = useState([]);
  const [message, setMessage] = useState('');
  const [editPartyId, setEditPartyId] = useState(null);

  // Function to handle form submission for adding or updating a party
  const handleAddOrUpdateParty = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', partyName);
    if (partyLogo) {
      formData.append('party_logo', partyLogo);
    }

    try {
      if (editPartyId) {
        // Update existing party
        const response = await axios.put(`http://localhost:8000/api/parties/${editPartyId}`, formData);
        setMessage(response.data.message);
      } else {
        // Add a new party
        const response = await axios.post('http://localhost:8000/api/parties', formData);
        setMessage(response.data.message);
      }

      setPartyName(''); // Clear input fields after adding/updating
      setPartyLogo(null);
      setPartyLogoPreview(null); // Clear image preview after adding/updating
      setEditPartyId(null); // Reset edit mode
      fetchParties(); // Refresh the list of parties
    } catch (error) {
      setMessage('Error adding/updating party. Make sure the party name is unique.');
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

  // Function to handle editing a party
  const handleEditParty = (partyId) => {
    const party = parties.find((party) => party.id === partyId);
    if (party) {
      setPartyName(party.name);
      setEditPartyId(partyId);
    }
  };

  // Handle party logo file selection and preview
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setPartyLogo(file);
    if (file) {
      setPartyLogoPreview(URL.createObjectURL(file)); // Set preview for the selected image
    } else {
      setPartyLogoPreview(null); // Clear preview if no file is selected
    }
  };

  // Use useEffect to fetch the parties once the component is mounted
  useEffect(() => {
    fetchParties();
  }, []);

  return (
    <div className="flex flex-wrap justify-center p-8">
      {/* Left column for Add/Edit Party form */}
      <div className="w-full p-6 mb-6 bg-white rounded-lg shadow-md md:w-1/2 lg:w-2/5 md:mb-0 md:mr-4">
        <h1 className="mb-4 text-2xl font-bold">{editPartyId ? 'Edit Party' : 'Add Party'}</h1>

        {/* Form for adding or updating a party */}
        <form onSubmit={handleAddOrUpdateParty} className="mb-6">
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
              placeholder="Enter party name"
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <input
              type="file"
              onChange={handleLogoChange}
              className="w-full p-2 mb-2 border rounded"
            />
            {partyLogoPreview && (
              <img
                src={partyLogoPreview}
                alt="Party Logo Preview"
                className="mb-4 max-h-32"
              />
            )}
            <button
              type="submit"
              className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              {editPartyId ? 'Update Party' : 'Add Party'}
            </button>
          </div>
          {message && <p className="mt-4 text-green-500">{message}</p>}
        </form>
      </div>

      {/* Right column for Party List */}
      <div className="w-full p-6 bg-white rounded-lg shadow-md md:w-1/2 lg:w-2/5">
        <h2 className="mb-4 text-xl font-bold">Party List</h2>
        <ul className="p-4 border rounded bg-gray-50">
          {parties.length > 0 ? (
            parties.map((party) => (
              <li key={party.id} className="flex items-center justify-between p-2 border-b">
                <div className="flex items-center">
                  {party.party_logo && (
                    <img
                      src={`http://localhost:8000/storage/${party.party_logo}`} // Adjust the path based on your backend
                      alt={`${party.name} logo`}
                      className="w-8 h-8 mr-2"
                    />
                  )}
                  <span>{party.name}</span>
                </div>
                <button
                  onClick={() => handleEditParty(party.id)}
                  className="p-2 ml-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No parties available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Party;
