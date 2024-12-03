import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Party = () => {
  const [partyName, setPartyName] = useState('');
  const [partyLogo, setPartyLogo] = useState(null);
  const [partyLogoPreview, setPartyLogoPreview] = useState(null); // Image preview
  const [parties, setParties] = useState([]);
  const [message, setMessage] = useState('');
  const [editPartyId, setEditPartyId] = useState(null);
  const [user, setUser] = useState({}); // Store user information

  // Fetch user data from local storage
  useEffect(() => {
    const fetchUserData = () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        setUser(userData);
      }
    };
    fetchUserData();
  }, []);

  // Fetch list of parties
  const fetchParties = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/parties');
      setParties(response.data);
    } catch (error) {
      console.error('Error fetching parties:', error);
    }
  };

  // Function to log actions to audit logs
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

  // Handle adding or updating party
  const handleAddOrUpdateParty = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', partyName);
    if (partyLogo) {
      formData.append('party_logo', partyLogo);
    }

    try {
      let response;
      if (editPartyId) {
        // Update existing party
        response = await axios.put(`http://localhost:8000/api/parties/${editPartyId}`, formData);
        setMessage(response.data.message);

        // Log audit action for update
        logAuditAction('Party Updated', `Updated party: ${partyName}`);
      } else {
        // Add a new party
        response = await axios.post('http://localhost:8000/api/parties', formData);
        setMessage(response.data.message);

        // Log audit action for creation
        logAuditAction('Party Created', `Created new party: ${partyName}`);
      }

      setPartyName('');
      setPartyLogo(null);
      setPartyLogoPreview(null);
      setEditPartyId(null);
      fetchParties();
    } catch (error) {
      setMessage('Error adding/updating party. Make sure the party name is unique.');
    }
  };

  // Handle editing party
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
      setPartyLogoPreview(URL.createObjectURL(file)); // Set preview
    } else {
      setPartyLogoPreview(null); // Clear preview
    }
  };

  useEffect(() => {
    fetchParties();
  }, []);

  // Effect to clear the message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000); // Clear message after 5 seconds

      return () => clearTimeout(timer); // Cleanup the timer if component unmounts or message changes
    }
  }, [message]);

  return (
    <div className="p-8 flex flex-col items-center space-y-8"> {/* Stack the two cards vertically with spacing */}
      {/* Add/Edit Party Card */}
      <div className="w-full p-6 bg-white rounded-lg shadow-md md:w-3/4 lg:w-2/3 xl:w-1/2"> {/* Card for Adding/Editing Party */}
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
  
      {/* Party List Card */}
      <div className="w-full p-6 bg-white rounded-lg shadow-md md:w-3/4 lg:w-2/3 xl:w-1/2"> {/* Card for Party List */}
        <h2 className="mb-4 text-xl font-bold">Party List</h2>
        <h3 className="text-lg font-bold mb-3">Number of Parties: {parties.length}</h3>
        <ul className="p-4 border rounded bg-gray-50 h-96 overflow-y-auto"> {/* Scrollable Party List */}
          {parties.length > 0 ? (
            parties.map((party) => (
              <li key={party.id} className="flex items-center justify-between p-2 border-b">
                <div className="flex items-center">
                  {party.party_logo && (
                    <img
                      src={`http://localhost:8000/storage/${party.party_logo}`} // Adjust the path based on your backend
                      alt={`${party.name} logo`}
                      className="w-10 h-10 mr-2"
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
