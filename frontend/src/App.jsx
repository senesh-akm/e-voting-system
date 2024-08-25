import './App.css';
import './index.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";

const App = () => {
  const [message, setMessage] = useState("");

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout setMessage={setMessage} />} />
        </Routes>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </div>
    </Router>
  );
};

export default App;
