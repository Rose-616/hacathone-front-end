import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  // Utility function to get a cookie value
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = getCookie('myAccessToken'); // Get the access token from cookies

        const response = await fetch('/api/v1/users/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUserData(data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 md:p-8">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg overflow-hidden md:flex">
        <div className="md:w-1/3 bg-gray-200 p-4 flex items-center justify-center">
          {userData && userData.avatar ? (
            <img
              src={userData.avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-300"
            />
          ) : (
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-300"
            />
          )}
        </div>
        <div className="md:w-2/3 p-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile</h1>
          <p className="text-xl text-gray-600 mb-2">
            <span className="font-semibold">Name:</span> {userData ? userData.username : 'Loading...'}
          </p>
          <p className="text-xl text-gray-600 mb-2">
            <span className="font-semibold">Email:</span> {userData ? userData.email : 'Loading...'}
          </p>
          <p className="text-xl text-gray-600 mb-2">
            <span className="font-semibold">Username:</span> {userData ? userData.username : 'Loading...'}
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default Profile;
