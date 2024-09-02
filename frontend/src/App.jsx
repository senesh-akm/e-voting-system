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
// import Profile from './components/auth/Profile';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

  return (
    <div className="flex h-screen">
      {!isAuthPage && <LeftSideNavbar />}

      <div className={`flex flex-col flex-grow ${isAuthPage ? '' : 'ml-64'}`}>
        {!isAuthPage && <TopNavbar />}

        <div className="flex-grow p-6 bg-gray-100">
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
          <Route path="/" element={<Login setUserRole={setUserRole} />} /> {/* Pass setUserRole to Login */}
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout setMessage={setMessage} />} />
          <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
          <Route path="/parties" element={<Parties />} />
          <Route path="/districts" element={<District />} />
          <Route path="/constituencies" element={<Constituency />} />
          <Route path="/elections" element={<Election />} />
          <Route path="/candidates" element={<Candidate />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>

        {/* Message Display */}
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </AppLayout>
    </Router>
  );
};

export default App;
