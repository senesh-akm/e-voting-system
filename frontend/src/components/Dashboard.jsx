import React from 'react';
// import Party from './Party';

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
      {/* Add election details and candidate information here */}
      <button className="mt-4 p-2 bg-blue-500 text-white rounded">Vote Now</button>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>
      <p className="mt-4">Manage the election, register voters, manage candidates, and monitor results.</p>
      {/* Add admin functionalities here */}
      <div className="mt-4">
        <button className="p-2 bg-green-500 text-white rounded mr-2">Register Voter</button>
        <button className="p-2 bg-purple-500 text-white rounded mr-2">Manage Candidates</button>
        <button className="p-2 bg-red-500 text-white rounded">Monitor Results</button>
        {/* <Party /> */}
      </div>
    </div>
  );
};

export default Dashboard;
