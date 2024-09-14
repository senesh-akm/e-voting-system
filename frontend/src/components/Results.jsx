import React, { useState, useEffect } from "react";
import axios from "axios";

const Results = () => {
  const [districts, setDistricts] = useState([]);
  const [constituencies, setConstituencies] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedConstituency, setSelectedConstituency] = useState(null);
  const [results, setResults] = useState([]);
  
  const [electionId, setElectionId] = useState(2); // Example election ID, adjust as needed.

  useEffect(() => {
    fetchDistricts();
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

  // Fetch election results
  const fetchResults = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/elections/${electionId}/results`);
      setResults(response.data);
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
    setSelectedConstituency(e.target.value);
  };

  const handleSubmit = () => {
    fetchResults();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Election Results</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select District</label>
        <select
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
        <label className="block text-sm font-medium text-gray-700">Select Constituency</label>
        <select
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
        className="px-4 py-2 bg-indigo-600 text-white rounded-md"
        onClick={handleSubmit}
      >
        View Results
      </button>

      <div className="mt-8">
        {results.length > 0 ? (
          <ul className="space-y-4">
            {results.map(({ candidate, votes }) => (
              <li key={candidate.id} className="flex items-center space-x-4">
                <img
                  src={candidate.candidate_picture ? `http://localhost:8000/storage/${candidate.candidate_picture}` : "/default-avatar.png"}
                  alt={candidate.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-xl font-semibold">{candidate.name}</p>
                  <p className="text-sm text-gray-600">Votes: {votes}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No results available. Please select a district and constituency.</p>
        )}
      </div>
    </div>
  );
};

export default Results;
