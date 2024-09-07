import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    voter_id: '',
    role: 'voter',
    profile_picture: '',
    nic: '',
    address: '',
    district: '',
    constituency: '',
  });

  const [districts, setDistricts] = useState([]);
  const [constituencies, setConstituencies] = useState([]);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [loading, setLoading] = useState(false); // loading state is used now

  // Fetch districts when the component mounts
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/districts');
        setDistricts(response.data);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };

    fetchDistricts();
  }, []);

  // Fetch constituencies when a district is selected
  useEffect(() => {
    if (formData.district) {
      const fetchConstituencies = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/getConstituencies?district_id=${formData.district}`);
          setConstituencies(response.data);
        } catch (error) {
          console.error('Error fetching constituencies:', error);
        }
      };

      fetchConstituencies();
    }
  }, [formData.district]);

  const generateVoterId = (role) => {
    const prefix = role === 'admin' ? 'ADM' : 'V';
    const number = String(Math.floor(Math.random() * 10000000)).padStart(8, '0');
    return `${prefix}${number}`;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // When role changes, auto-generate voter_id
    if (name === 'role') {
      const voterId = generateVoterId(value);
      setFormData({
        ...formData,
        [name]: value,
        voter_id: voterId, // Update voter_id automatically
      });
    } else if (name === 'profile_picture') {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true); // Set loading to true when form is being submitted
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      let response;
      if (isUpdateMode) {
        response = await axios.put(`http://localhost:8000/api/update/${userId}`, formDataToSend);
      } else {
        response = await axios.post('http://localhost:8000/api/register', formDataToSend);
      }

      setSuccess(response.data.message);
      setIsUpdateMode(false);
      setUserId(null);

      if (!isUpdateMode) {
        setFormData({
          name: '',
          email: '',
          password: '',
          voter_id: '',
          role: 'voter',
          profile_picture: '',
          nic: '',
          address: '',
          district: '',
          constituency: '',
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false); // Reset loading to false after form is submitted
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="mb-6 text-2xl font-bold text-center">{isUpdateMode ? 'Update User' : 'Create a new user account'}</h2>
      {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}
      {success && <div className="p-4 mb-4 text-green-700 bg-green-100 rounded">{success}</div>}
      <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        {/* Name Field */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Email Field */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Password Field */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Voter ID Field */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="voter_id">Voter ID</label>
          <input
            type="text"
            name="voter_id"
            value={formData.voter_id}
            readOnly
            className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-100 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Role Field */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="role">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          >
            <option value="voter">Voter</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {/* NIC */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="nic">National ID</label>
          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Address */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* District Drop-down */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="district">District</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        {/* Constituency Drop-down */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="constituency">Constituency</label>
          <select
            name="constituency"
            value={formData.constituency}
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Constituency</option>
            {constituencies.map((constituency) => (
              <option key={constituency.id} value={constituency.name}>
                {constituency.name}
              </option>
            ))}
          </select>
        </div>
        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className={`px-4 py-2 font-bold text-white rounded focus:outline-none focus:shadow-outline ${
              loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
            }`}
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Processing...' : isUpdateMode ? 'Update' : 'Register'}
          </button>
        </div>
      </form>
      {isUpdateMode && (
        <button onClick={() => setIsUpdateMode(false)} className="font-bold text-blue-500 hover:text-blue-700">
          Switch to Register Mode
        </button>
      )}
    </div>
  );
};

export default Register;
