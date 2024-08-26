import './App.css';
import './index.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Dashboard from "./components/Dashboard";
import TopNavbar from "./components/navbar/TopNavbar";
import LeftSideNavbar from "./components/navbar/LeftSideNavbar";

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

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout setMessage={setMessage} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        {/* Message Display */}
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </AppLayout>
    </Router>
  );
};

export default App;
