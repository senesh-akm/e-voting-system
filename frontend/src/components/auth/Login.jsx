import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUserRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const logAudit = async (userId, action, description) => {
    try {
      await axios.post("http://localhost:8000/api/audit-logs", {
        action,
        description,
        user_id: userId,
      });
    } catch (error) {
      console.error("Error logging audit:", error);
    }
  };

  const handleLogin = async (email, password) => {
    setLoading(true); // Start loading when the login process begins
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
        rememberMe,
      });

      if (response.status === 200) {
        const { user } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        setUserRole(user.role);
        setMessage(response.data.message);
        setIsError(false);

        // Log the login action to the audit log
        await logAudit(user.id, "User Login", `${user.name} logged in`);
        navigate("/dashboard");
      } else {
        setMessage("Login failed");
        setIsError(true);
      }
    } catch (error) {
      setMessage("Login failed");
      setIsError(true);
      console.error("Error during login:", error);
    } finally {
      setLoading(false); // End loading when the login process finishes
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="mb-5 text-2xl font-bold text-center">Login</h1>
      {message && (
        <div
          className={`p-4 mb-4 text-sm text-center rounded ${
            isError ? "bg-red-200 text-red-400" : "bg-green-200 text-green-400"
          }`}
          role="alert"
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-2 text-sm text-left text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            disabled={loading} // Disable input when loading
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm text-left text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            disabled={loading} // Disable input when loading
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2 leading-tight"
              disabled={loading} // Disable checkbox when loading
            />
            <span className="text-sm text-gray-700">Remember Me</span>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Processing..." : "Login"} {/* Show "Processing..." when loading */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
