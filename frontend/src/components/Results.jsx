import React, { useState, useEffect } from "react";
import axios from "axios";

const Results = () => {
  const [districts, setDistricts] = useState([]);
  const [constituencies, setConstituencies] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedConstituency, setSelectedConstituency] = useState(null);
  const [results, setResults] = useState([]);
  const [activeElectionTitle, setActiveElectionTitle] = useState('');
  const [electionId, setElectionId] = useState(null); 
  const [totalVoters, setTotalVoters] = useState(0); 

  useEffect(() => {
    fetchDistricts();

    // Fetch the election title and ID from localStorage (or other storage)
    const electionTitle = localStorage.getItem('activeElectionTitle');
    const electionId = localStorage.getItem('activeElectionId'); 

    if (electionTitle) {
      setActiveElectionTitle(electionTitle);
    }

    if (electionId) {
      setElectionId(parseInt(electionId)); 
    }
  }, []);

  // Fetch the list of districts
  const fetchDistricts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/districts");
      setDistricts(response.data);
    } catch (error) {
      console.error("Error fetching districts", error);
    }
  };

  // Fetch constituencies by district name
  const fetchConstituencies = async (districtName) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/getConstituenciesByDistrictName`, {
        params: { district_name: districtName }
      });
      setConstituencies(response.data);
    } catch (error) {
      console.error("Error fetching constituencies", error);
    }
  };

  const fetchTotalVoters = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/votersCount', {
        params: { constituency: selectedConstituency }
      });
      setTotalVoters(response.data.voters_count);
    } catch (error) {
      console.error("Error fetching total voters", error);
    }
  };

  const fetchResults = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/elections/${electionId}/results`, {
        params: { constituency: selectedConstituency }
      });

      const sortedResults = response.data.sort((a, b) => b.votes - a.votes);
      setResults(sortedResults);
    } catch (error) {
      console.error("Error fetching results", error);
    }
  };

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);
    fetchConstituencies(districtName);
  };

  const handleConstituencyChange = (e) => {
    const selectedConstituencyId = e.target.value;
    setSelectedConstituency(selectedConstituencyId);
    fetchTotalVoters();
  };

  const handleSubmit = () => {
    fetchResults();
  };

  return (
    <div className="container max-w-4xl px-4 py-8 mx-auto">
      <h1 className="text-4xl font-bold mb-7">{activeElectionTitle}</h1>
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Election Results</h1>
        <div className="mb-4">
          <select
            className="w-full p-2 mb-2 border"
            value={selectedDistrict || ""}
            onChange={handleDistrictChange}
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district.id} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <select
            className="w-full p-2 mb-2 border"
            value={selectedConstituency || ""}
            onChange={handleConstituencyChange}
          >
            <option value="">Select Constituency</option>
            {constituencies.map((constituency) => (
              <option key={constituency.id} value={constituency.name}>
                {constituency.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="p-2 mt-2 text-white bg-blue-500 rounded"
          onClick={handleSubmit}
        >
          View Results
        </button>

        <div className="mt-8">
          {results.length > 0 ? (
            <ul className="space-y-4">
              {results.map(({ candidate, votes }) => {
                const votePercentage = totalVoters ? ((votes / totalVoters) * 100).toFixed(2) : "0.00";
                return (
                  <li key={candidate.id} className="flex items-center space-x-4">
                    <img
                      src={candidate.candidate_picture ? `http://localhost:8000/storage/${candidate.candidate_picture}` : "/default-avatar.png"}
                      alt={candidate.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-xl font-semibold">{candidate.name}</p>
                      <p className="text-sm text-gray-600">Votes: {votes} ({votePercentage}%)</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${votePercentage}%` }}></div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500">No results available. Please select a district and constituency.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
