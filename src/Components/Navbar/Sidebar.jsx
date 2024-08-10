import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  // Function to get the value of a specific cookie
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  useEffect(() => {
    // Function to fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const accessToken = getCookie('myAccessToken'); // Get the access token from cookies

        const response = await fetch('/api/v1/users/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
          },
        });

        console.log('Response status:', response.status); // Log the response status

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Response data:', data.email); // Log the entire response data

        setUserData(data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  return (
    // style={{ border: '5px solid red' }}
    <div className="flex h-screen overflow-hidden" >
      {/* Sidebar */}
      <aside
        className={`w-full md:w-64 bg-gray-800 text-white flex flex-col md:transition-transform duration-500 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } fixed md:relative z-10`}
        // style={{ border: '5px solid red' }}
      >
        <div className="flex justify-center mt-8 md:mt-8">
          <div className="relative">
            {userData && userData.avatar ? (
              <img
                src={userData.avatar} // Use the avatar URL from the user data
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white mx-auto"
              />
            ) : (
              <img
                src="https://via.placeholder.com/100" // Fallback placeholder image
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white mx-auto"
              />
            )}
            <div className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2 py-1">
              <span className="font-semibold">3</span>
            </div>
          </div>
        </div>
        {/* style={{ border: '5px solid red' }} */}
        <nav className="mt-6 px-4 flex md:block flex-col items-center md:items-start " >
          <ul className="flex md:flex-col w-full justify-around">
            <li>
              <Link to="/home" className="block py-2 px-4 text-white hover:bg-gray-700 rounded">
                Home
              </Link>
            </li>
            <li>
              <Link to="/home/profile" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/home/setting" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">
                Settings
              </Link>
            </li>
            <li>
              <Link to="/" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden flex items-center p-4 fixed z-20">
        <button onClick={toggleSidebar} className={`text-${isOpen ? 'white' : 'black'} focus:outline-none`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Overlay for Sidebar */}
      {isOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"></div>}

      {/* Main Content */}
      {/* <main className="flex-1 bg-gray-100 p-8 md:ml-64">
        {/* Your main content goes here */}
      {/* </main> */}
    </div>
  );
}

export default Sidebar;
