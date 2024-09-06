import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ userRole }) => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {userRole === 'voter' ? (
        <VoterDashboard />
      ) : userRole === 'admin' ? (
        <AdminDashboard />
      ) : (
        <p className="mt-4">Invalid role. Please contact support.</p>
      )}
    </div>
  );
};

const VoterDashboard = () => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Voter Dashboard</h2>
      <p className="mt-4">Here you can see the election details and vote for candidates.</p>
      <button className="p-2 mt-4 text-white bg-blue-500 rounded">Vote Now</button>
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleRegisterVoter = () => {
    navigate('/register'); // Navigate to the register page
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>
      <p className="mt-4">Manage the election, register voters, manage candidates, and monitor results.</p>
      <div className="mt-4">
        <button 
          className="p-2 mr-2 text-white bg-green-500 rounded"
          onClick={handleRegisterVoter}
        >
          Register Voter
        </button>
        <button className="p-2 mr-2 text-white bg-purple-500 rounded">Manage Candidates</button>
        <button className="p-2 text-white bg-red-500 rounded">Monitor Results</button>
      </div>
    </div>
  );
};

export default Dashboard;
