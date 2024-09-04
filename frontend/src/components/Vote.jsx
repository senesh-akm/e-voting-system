import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Vote = () => {
  const [user, setUser] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [parties, setParties] = useState([]);
  const [votedCandidateId, setVotedCandidateId] = useState(null); // State to track voted candidate

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Assume the user data is stored in local storage after login
        const userData = JSON.parse(localStorage.getItem('user'));
        console.log('Fetched user data:', userData); // Debugging statement

        if (userData && userData.name) {
          setUser(userData);
        } else {
          console.warn("User data is not available or does not contain a name.");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Fetch candidates and party data
  useEffect(() => {
    axios.get('http://localhost:8000/api/candidates')
      .then(response => {
        setCandidates(response.data);
      })
      .catch(error => console.error('Error fetching candidates:', error));

    axios.get('http://localhost:8000/api/parties')
      .then(response => {
        setParties(response.data);
      })
      .catch(error => console.error('Error fetching parties:', error));
  }, []);

  const getPartyDetails = (partyName) => {
    return parties.find(party => party.name === partyName) || {};
  };

  const handleVote = (candidateId) => {
    setVotedCandidateId(candidateId); // Set the voted candidate ID
    console.log('Voted for candidate:', candidateId);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-7">Presidential Election 2024</h1>
      
      {/* Display user details */}
      <h2><span className="font-bold">Your Name:</span> {user.name || 'Name not available'}</h2>
      <p><span className="font-bold">District:</span> {user.district || 'District not available'} | <span className="font-bold">Constituency:</span> {user.constituency || 'Constituency not available'}</p>

      <h3 className="mt-4 mb-3 text-2xl font-bold">List of Presidential Candidates: Vote Now</h3>
      {candidates.map(candidate => {
        const party = getPartyDetails(candidate.party);

        return (
          <div key={candidate.id} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={`http://localhost:8000/storage/${candidate.candidate_picture}`} alt={candidate.name} style={{ width: '120px', height: '120px', marginRight: '10px' }} />
                <img src={`http://localhost:8000/storage/${party.party_logo}`} alt={`${party.name}`} style={{ width: '120px', height: '120px', marginRight: '10px' }} />
              </div>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <p><strong>{candidate.name}</strong></p>
                <p>{party.name}</p>
              </div>
              <button 
                onClick={() => handleVote(candidate.id)}
                disabled={votedCandidateId === candidate.id} // Disable button if already voted
                style={{ 
                  backgroundColor: votedCandidateId === candidate.id ? 'gray' : 'green', 
                  color: 'white', 
                  padding: '10px 20px', 
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                {votedCandidateId === candidate.id ? 'VOTED' : 'VOTE'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Vote;
