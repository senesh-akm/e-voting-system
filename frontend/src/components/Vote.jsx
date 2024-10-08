import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Vote = () => {
  const [user, setUser] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [parties, setParties] = useState([]);
  const [votedCandidateId, setVotedCandidateId] = useState(null);
  const [activeElectionTitle, setActiveElectionTitle] = useState('');

  // Fetch user data and active election title from localStorage
  useEffect(() => {
    const electionTitle = localStorage.getItem('activeElectionTitle');
    if (electionTitle) {
      setActiveElectionTitle(electionTitle);
    }

    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData && userData.name) {
          setUser(userData);
          checkIfVoted(userData.id); // Check if the user has already voted
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Check if the user has already voted
  const checkIfVoted = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/votes/${userId}`);
      if (response.data) {
        setVotedCandidateId(response.data.candidate_id); // Set the voted candidate ID
      }
    } catch (error) {
      console.error("Error checking vote status:", error);
    }
  };

  // Fetch candidates and party data
  useEffect(() => {
    axios.get('http://localhost:8000/api/candidates')
      .then(response => setCandidates(response.data))
      .catch(error => console.error('Error fetching candidates:', error));

    axios.get('http://localhost:8000/api/parties')
      .then(response => setParties(response.data))
      .catch(error => console.error('Error fetching parties:', error));
  }, []);

  const getPartyDetails = (partyName) => {
    return parties.find(party => party.name === partyName) || {};
  };

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

  const handleVote = async (candidateId) => {
    try {
      const electionId = localStorage.getItem('activeElectionId'); // Fetch the active election ID

      if (!electionId) {
        console.error("No active election found.");
        return;
      }

      await axios.post('http://localhost:8000/api/votes', {
        user_id: user.id,
        candidate_id: candidateId,
        election_id: electionId,  // Use the active election ID dynamically
        district: user.district,
        constituency: user.constituency
      });

      setVotedCandidateId(candidateId); // Set the voted candidate ID after successful vote

      // Log the voting action in the audit log
      logAuditAction('Vote Cast', `User voted for candidate ID: ${candidateId}`);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('You have already voted in this election.');
      } else {
        console.error("Error voting:", error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-7">{activeElectionTitle}</h1>
      
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
