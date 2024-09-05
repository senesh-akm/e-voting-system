import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [constituencies, setConstituencies] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch user data from local storage
  useEffect(() => {
    const fetchUserData = () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        console.log('Fetched user data:', userData); // Debugging statement

        if (userData && userData.name) {
          setUser(userData);
          setSelectedDistrict(userData.district || '');
        } else {
          console.warn("User data is not available or does not contain a name.");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Fetch districts from API
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/districts');
        setDistricts(response.data); // Assuming response.data is an array of districts
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      }
    };

    fetchDistricts();
  }, []);

  // Fetch constituencies based on the selected district
  useEffect(() => {
    const fetchConstituencies = async () => {
      if (selectedDistrict) {
        try {
          const response = await axios.get(`http://localhost:8000/api/constituencies?district=${selectedDistrict}`);
          setConstituencies(response.data); // Assuming response.data is an array of constituencies
        } catch (error) {
          console.error("Failed to fetch constituencies:", error);
        }
      } else {
        setConstituencies([]); // Clear constituencies if no district is selected
      }
    };

    fetchConstituencies();
  }, [selectedDistrict]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setUser({
      ...user,
      district: district,
      constituency: '' // Reset constituency when district changes
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a local preview of the image
    }
  };

  const handleSave = async () => {
    try {
      // Create FormData object to include user data and image
      const formData = new FormData();
      formData.append('name', user.name);
      formData.append('password', user.password);
      formData.append('nic', user.nic);
      formData.append('address', user.address);
      formData.append('district', user.district);
      formData.append('constituency', user.constituency);
      
      // Check if an image is selected and append it
      if (selectedImage) {
        formData.append('profile_picture', selectedImage); // Append image if selected
      }
  
      const response = await fetch(`http://localhost:8000/api/update/${user.id}`, {
        method: 'PUT',  // Change to POST or PUT based on your needs
        body: formData,
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        console.error("Failed to update profile");
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error("An error occurred while updating the profile:", error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="profile-container p-4">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <div className="profile-details bg-gray-100 p-4 rounded-md">
        {(imagePreview || user.profile_picture) && (
          <img
            src={imagePreview || user.profile_picture}
            alt={`${user.name}'s Profile`}
            className="profile-picture mb-4 w-32 h-32 rounded-full object-cover"
          />
        )}

        {isEditing ? (
          <div>
            <div className="mb-4">
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  name="name"
                  value={user.name || ''}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block mb-2">
                Upload Profile Picture:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border p-2 rounded w-full"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block mb-2">
                Email:
                <input
                  type="email"
                  name="email"
                  value={user.email || ''}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                  readOnly
                  disabled
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block mb-2">
                Password:
                <input
                  type="password"
                  name="password"
                  value={user.password || ''}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block mb-2">
                Voter ID:
                <input
                  type="text"
                  name="voter_id"
                  value={user.voter_id || ''}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                  readOnly
                  disabled
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block mb-2">
                Role:
                <input
                  type="text"
                  name="role"
                  value={user.role || ''}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                  readOnly
                  disabled
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block mb-2">
                NIC:
                <input
                  type="text"
                  name="nic"
                  value={user.nic || ''}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block mb-2">
                Address:
                <input
                  type="text"
                  name="address"
                  value={user.address || ''}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block mb-2">
                District:
                <select
                  name="district"
                  value={user.district || ''}
                  onChange={handleDistrictChange}
                  className="border p-2 rounded w-full"
                >
                  <option value="" disabled>Select your district</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mb-4">
              <label className="block mb-2">
                Constituency:
                <select
                  name="constituency"
                  value={user.constituency || ''}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                >
                  <option value="" disabled>Select your constituency</option>
                  {constituencies.map((constituency) => (
                    <option key={constituency.id} value={constituency.name}>
                      {constituency.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex justify-between">
              <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-300 text-black px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p><strong>Name:</strong> {user.name || 'Name not available'}</p>
            <p><strong>Email:</strong> {user.email || 'Email not available'}</p>
            <p><strong>Password:</strong> {user.password || 'Password not available'}</p>
            <p><strong>Voter ID:</strong> {user.voter_id || 'Voter ID not available'}</p>
            <p><strong>Role:</strong> {user.role || 'Role not available'}</p>
            <p><strong>NIC:</strong> {user.nic || 'NIC not available'}</p>
            <p><strong>Address:</strong> {user.address || 'Address not available'}</p>
            <p><strong>District:</strong> {user.district || 'District not available'}</p>
            <p><strong>Constituency:</strong> {user.constituency || 'Constituency not available'}</p>
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white p-2 rounded mt-4"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
