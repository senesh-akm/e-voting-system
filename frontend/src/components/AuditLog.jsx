import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [user, setUser] = useState({});

  // Fetch user data from local storage
  useEffect(() => {
    const fetchUserData = () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData && userData.name) {
          setUser(userData);
        } else {
          console.warn("User data not available.");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // Fetch audit logs for the logged-in user
  useEffect(() => {
    if (user.id) {
      axios.get(`http://localhost:8000/api/audit-logs?user_id=${user.id}`)
        .then(response => setLogs(response.data))
        .catch(error => console.error("Error fetching logs:", error));
    }
  }, [user.id]);

  return (
    <div className="container p-4 mx-auto">
      {/* Display user information */}
      <h2>
        <span className="font-bold">Your Name:</span> {user.name || 'Name not available'}
      </h2>

      {/* Display Audit Logs */}
      <h1 className="mt-4 text-xl font-bold">Audit Logs</h1>
      <div className="mt-4 space-y-4">
        {logs.length > 0 ? (
          logs.map((log) => (
            <div
              key={log.id}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
            >
              <h3 className="mb-2 text-lg font-semibold">Action: {log.action}</h3>
              <p className="mb-2 text-sm text-gray-600">
                <strong>Description:</strong> {log.description || 'No description provided'}
              </p>
              <p className="text-xs text-gray-400">Logged at: {new Date(log.created_at).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No audit logs available for this user.</p>
        )}
      </div>
    </div>
  );
}

export default AuditLogs;
