import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Election = () => {
  const [elections, setElections] = useState([]);
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
  }, []);

  const fetchElections = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/elections');
      setElections(response.data);
    } catch (error) {
      console.error('Error fetching elections:', error);
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
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Election' : 'Add Election'}</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="p-2 border mb-2 w-full"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="p-2 border mb-2 w-full"
        />
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleInputChange}
          className="p-2 border mb-2 w-full"
          required
        />
        <input
          type="time"
          name="start_time"
          value={formData.start_time}
          onChange={handleInputChange}
          className="p-2 border mb-2 w-full"
          required
        />
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleInputChange}
          className="p-2 border mb-2 w-full"
          required
        />
        <input
          type="time"
          name="end_time"
          value={formData.end_time}
          onChange={handleInputChange}
          className="p-2 border mb-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
          {isEditing ? 'Update Election' : 'Add Election'}
        </button>
        {isEditing && (
          <button type="button" onClick={resetForm} className="bg-gray-500 text-white p-2 rounded mt-2 ml-2">
            Cancel
          </button>
        )}
      </form>

      <h2 className="text-xl font-bold mb-4">Election List</h2>
      <ul className="space-y-2">
        {elections.map((election) => (
          <li key={election.id} className="relative border p-4 rounded bg-white shadow">
            <button
              onClick={() => handleEdit(election)}
              className="absolute top-2 right-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
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
