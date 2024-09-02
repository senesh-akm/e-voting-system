import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        voter_id: '',
        role: '',
        profile_picture: '',
        nic: '',
        address: '',
        district: '',
        constituency: ''
    });

    const [profilePicture, setProfilePicture] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch user details on component mount
        axios.get('/api/profile', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
            }
        })
        .then(response => {
            setUser(response.data.user);
        })
        .catch(error => {
            console.error('There was an error fetching the user data!', error);
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('voter_id', user.voter_id);
        formData.append('role', user.role);
        if (profilePicture) {
            formData.append('profile_picture', profilePicture);
        }
        formData.append('nic', user.nic);
        formData.append('address', user.address);
        formData.append('district', user.district);
        formData.append('constituency', user.constituency);

        axios.put(`/api/update/${user.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setMessage('Profile updated successfully!');
        })
        .catch(error => {
            console.error('There was an error updating the profile!', error);
            setMessage('There was an error updating the profile.');
        });
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-5">
            <h2 className="text-2xl font-bold mb-6">User Profile</h2>
            {message && <div className="mb-4 p-4 bg-blue-100 text-blue-800 rounded">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Voter ID</label>
                    <input
                        type="text"
                        name="voter_id"
                        value={user.voter_id}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Role</label>
                    <select
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded"
                        required
                    >
                        <option value="voter">Voter</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Profile Picture</label>
                    <input
                        type="file"
                        name="profile_picture"
                        onChange={handleFileChange}
                        className="mt-1 block w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">NIC</label>
                    <input
                        type="text"
                        name="nic"
                        value={user.nic}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">District</label>
                    <input
                        type="text"
                        name="district"
                        value={user.district}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Constituency</label>
                    <input
                        type="text"
                        name="constituency"
                        value={user.constituency}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded"
                    />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default Profile;
