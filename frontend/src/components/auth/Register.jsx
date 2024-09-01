import React, { useState } from 'react';
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

  const [userId, setUserId] = useState(null); // New state for user ID
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isUpdateMode, setIsUpdateMode] = useState(false); // New state for update mode
  const [loading, setLoading] = useState(false); // New state for loading

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_picture') {
      setFormData({
        ...formData,
        [name]: files[0], // Store the file object directly
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
    setLoading(true); // Set loading to true
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
      setLoading(false); // Reset loading to false
    }
  };

  // Function to switch to update mode and set the user ID
  const handleUpdate = (id) => {
    setIsUpdateMode(true);
    setUserId(id);
    // Optionally, you can populate form fields with existing user data here
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">{isUpdateMode ? 'Update User' : 'Create a new user account'}</h2>
      {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-4 mb-4 rounded">{success}</div>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Voter ID Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="voter_id">Voter ID</label>
          <input
            type="text"
            name="voter_id"
            value={formData.voter_id}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Role Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="voter">Voter</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {/* Profile Picture Upload */}
        {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile_picture">Profile Picture</label>
          <input
            type="file"
            name="profile_picture"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div> */}
        {/* NIC Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nic">NIC</label>
          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Address Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* District Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="district">District</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Constituency Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="constituency">Constituency</label>
          <input
            type="text"
            name="constituency"
            value={formData.constituency}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isUpdateMode ? 'Update' : 'Register'}
          </button>
        </div>
      </form>
      {/* Button to reset the form and switch back to register mode */}
      {isUpdateMode && (
        <button onClick={() => setIsUpdateMode(false)} className="text-blue-500 hover:text-blue-700 font-bold">
          Switch to Register Mode
        </button>
      )}
    </div>
  );
};

export default Register;
