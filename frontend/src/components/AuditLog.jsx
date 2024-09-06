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
      <h2><span className="font-bold">Your Name:</span> {user.name || 'Name not available'}</h2>

      {/* Display Audit Logs */}
      <h1 className="text-xl font-bold mt-4">Audit Logs</h1>
      <ul>
        {logs.length > 0 ? (
          logs.map(log => (
            <li key={log.id} className="p-2 my-2 bg-gray-100 rounded">
              <strong>Action:</strong> {log.action} <br />
              <strong>Description:</strong> {log.description}
            </li>
          ))
        ) : (
          <p>No audit logs available for this user.</p>
        )}
      </ul>
    </div>
  );
}

export default AuditLogs;
