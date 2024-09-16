import './App.css';
import './index.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Dashboard from "./components/Dashboard";
import TopNavbar from "./components/navbar/TopNavbar";
import LeftSideNavbar from "./components/navbar/LeftSideNavbar";
import Parties from "./components/Party";
import District from './components/District';
import Constituency from "./components/Constituency";
import Election from './components/Election';
import Candidate from './components/Candidate';
import Profile from './components/auth/Profile';
import Vote from './components/Vote';
import AuditLogs from './components/AuditLog';
import Results from './components/Results';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component

const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

  return (
    <div className="app-layout">
      {!isAuthPage && <TopNavbar className="top-navbar" />}
      <div className="flex flex-grow">
        {!isAuthPage && <LeftSideNavbar className="left-sidebar" />}
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [message, setMessage] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Fetch user data from local storage on initial load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserRole(parsedUser.role);
    }
  }, []);

  return (
    <Router>
      <AppLayout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login setUserRole={setUserRole} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout setMessage={setMessage} />} />

          {/* Private Routes for Admin */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={['admin', 'voter']} userRole={userRole}>
                <Dashboard userRole={userRole} />
              </PrivateRoute>
            }
          />
          <Route
            path="/parties"
            element={
              <PrivateRoute allowedRoles={['admin']} userRole={userRole}>
                <Parties />
              </PrivateRoute>
            }
          />
          <Route
            path="/districts"
            element={
              <PrivateRoute allowedRoles={['admin']} userRole={userRole}>
                <District />
              </PrivateRoute>
            }
          />
          <Route
            path="/constituencies"
            element={
              <PrivateRoute allowedRoles={['admin']} userRole={userRole}>
                <Constituency />
              </PrivateRoute>
            }
          />
          <Route
            path="/elections"
            element={
              <PrivateRoute allowedRoles={['admin']} userRole={userRole}>
                <Election />
              </PrivateRoute>
            }
          />
          <Route
            path="/candidates"
            element={
              <PrivateRoute allowedRoles={['admin']} userRole={userRole}>
                <Candidate />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute allowedRoles={['admin', 'voter']} userRole={userRole}>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/votes"
            element={
              <PrivateRoute allowedRoles={['admin', 'voter']} userRole={userRole}>
                <Vote />
              </PrivateRoute>
            }
          />
          <Route
            path="/audit-logs"
            element={
              <PrivateRoute allowedRoles={['admin', 'voter']} userRole={userRole}>
                <AuditLogs />
              </PrivateRoute>
            }
          />
          <Route
            path="/results"
            element={
              <PrivateRoute allowedRoles={['admin']} userRole={userRole}>
                <Results />
              </PrivateRoute>
            }
          />
        </Routes>

        {/* Message Display */}
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </AppLayout>
    </Router>
  );
};

export default App;
