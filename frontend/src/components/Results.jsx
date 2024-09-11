import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Results = ({ electionId }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeElectionTitle, setActiveElectionTitle] = useState('');

  // Fetch vote results and election title
  useEffect(() => {
    const electionTitle = localStorage.getItem('activeElectionTitle');
    if (electionTitle) {
      setActiveElectionTitle(electionTitle);
    }

    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/elections/${electionId}/results`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [electionId]);

  // Prepare data for the chart
  const prepareChartData = () => {
    const districts = [...new Set(results.map(result => result.district))];
    const candidates = [...new Set(results.map(result => result.candidate_id))];

    const datasets = candidates.map(candidateId => {
      const candidateVotes = districts.map(district => {
        const voteData = results.find(result => result.district === district && result.candidate_id === candidateId);
        return voteData ? voteData.total_votes : 0;
      });

      return {
        label: `Candidate ${candidateId}`, // You can fetch candidate name here instead of ID
        data: candidateVotes,
        backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16), // Random color
        borderColor: '#' + Math.floor(Math.random()*16777215).toString(16),
        borderWidth: 1,
      };
    });

    return {
      labels: districts, // Each district as a label
      datasets,
    };
  };

  if (loading) {
    return <div className="text-center">Loading results...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="mb-7 text-4xl font-bold">{activeElectionTitle}</h1>
      <h2 className="text-2xl font-bold mb-6">Votes by District and Constituency</h2>

      {/* Chart for displaying results */}
      <div className="mb-6">
        <Bar data={prepareChartData()} />
      </div>

      <div>
        {results.map((result, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <h3>Candidate {result.candidate_id} - {result.district}, {result.constituency}</h3>
            <p>Total Votes: {result.total_votes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
