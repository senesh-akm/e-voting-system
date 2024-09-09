import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // This is important for auto-registration of charts

const Results = ({ electionId }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch vote results from the API
  useEffect(() => {
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
  const chartData = {
    labels: results.map((result) => `Candidate ${result.candidate_id}`), // Update to use candidate name if available
    datasets: [
      {
        label: 'Votes',
        data: results.map((result) => result.total_votes),
        backgroundColor: ['#4A90E2', '#50E3C2', '#F5A623', '#D0021B', '#BD10E0'],
        borderColor: ['#357ABD', '#4DC4B6', '#F59E23', '#C11C1E', '#A00CB2'],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return <div className="text-center">Loading results...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Election Results</h2>

      <div className="mb-6">
        <Bar data={chartData} />
      </div>

      <div>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default Results;
