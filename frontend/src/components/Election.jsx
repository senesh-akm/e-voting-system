import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Election = () => {
  const [elections, setElections] = useState([]);
  const [activeElectionId, setActiveElectionId] = useState(null); // Track active election
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchElections();
    fetchActiveElection(); // Fetch the currently active election
  }, []);

  const fetchElections = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/elections');
      setElections(response.data);
    } catch (error) {
      console.error('Error fetching elections:', error);
    }
  };

  const fetchActiveElection = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/elections/active');
      if (response.data) {
        setActiveElectionId(response.data.id);
      }
    } catch (error) {
      console.error('Error fetching active election:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8000/api/elections/${formData.id}`, formData);
      } else {
        await axios.post('http://localhost:8000/api/elections', formData);
      }
      fetchElections();
      resetForm();
    } catch (error) {
      console.error('Error submitting election:', error);
    }
  };

  const handleEdit = (election) => {
    setFormData({
      id: election.id,
      title: election.title,
      description: election.description,
      start_date: election.start_date,
      start_time: election.start_time,
      end_date: election.end_date,
      end_time: election.end_time
    });
    setIsEditing(true);
  };

  const handleSetActive = async (electionId) => {
    try {
      await axios.post(`http://localhost:8000/api/elections/${electionId}/set-active`);
      setActiveElectionId(electionId); // Set the active election ID locally
    } catch (error) {
      console.error('Error setting active election:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      start_date: '',
      start_time: '',
      end_date: '',
      end_time: ''
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl px-4 py-8 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">{isEditing ? 'Edit Election' : 'Add Election'}</h1>
      <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="w-full p-2 mb-2 border"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="w-full p-2 mb-2 border"
        />
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border"
          required
        />
        <input
          type="time"
          name="start_time"
          value={formData.start_time}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border"
          required
        />
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border"
          required
        />
        <input
          type="time"
          name="end_time"
          value={formData.end_time}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border"
          required
        />
        <button type="submit" className="p-2 mt-2 text-white bg-blue-500 rounded">
          {isEditing ? 'Update Election' : 'Add Election'}
        </button>
        {isEditing && (
          <button type="button" onClick={resetForm} className="p-2 mt-2 ml-2 text-white bg-gray-500 rounded">
            Cancel
          </button>
        )}
      </form>

      <h2 className="mb-4 text-xl font-bold">Election List</h2>
      <ul className="space-y-2">
        {elections.map((election) => (
          <li key={election.id} className={`relative border p-4 rounded bg-white shadow ${activeElectionId === election.id ? 'bg-green-200' : ''}`}>
            <button
              onClick={() => handleEdit(election)}
              className="absolute px-4 py-2 text-white bg-yellow-500 rounded top-2 right-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleSetActive(election.id)}
              className="absolute px-4 py-2 text-white bg-blue-500 rounded top-2 left-2"
              disabled={activeElectionId === election.id}
            >
              {activeElectionId === election.id ? 'Active' : 'Set Active'}
            </button>
            <h3 className="text-lg font-semibold">{election.title}</h3>
            <p>{election.description}</p>
            <p>Start: {election.start_date} {election.start_time}</p>
            <p>End: {election.end_date} {election.end_time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Election;
