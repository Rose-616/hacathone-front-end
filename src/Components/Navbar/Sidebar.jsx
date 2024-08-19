import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isloggedin, setIsloggedin] = useState(false);

  // Function to get the value of a specific cookie
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  // Function to clear all cookies
  const clearAllCookies = () => {
    const cookies = document.cookie.split(';');

    cookies.forEach((cookie) => {
      const cookieName = cookie.split('=')[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  };

  // Function to handle logout
  const handleLogout = () => {
    console.log("User logged out");
    // Clear local storage
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isloggedin');
    
    // Clear all cookies
    clearAllCookies();
    
    // Clear state
    setIsAdmin(false);
    setIsloggedin(false);

    // Redirect to the home page or login page
    window.location.href = '/';
  };

  useEffect(() => {
    // Check isAdmin and isloggedin status from local storage on component mount
    const isAdminStored = localStorage.getItem('isAdmin');
    setIsAdmin(isAdminStored === 'true');
    
    const isloggedinStored = localStorage.getItem('isloggedin');
    setIsloggedin(isloggedinStored === 'true');

    // Function to fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const accessToken = getCookie('accessToken'); // Get the access token from cookies

        const response = await fetch('https://hacathone-backend.vercel.app/api/v1/users/profile', {
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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`w-full md:w-64 bg-gray-800 text-white flex flex-col md:transition-transform duration-500 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } fixed md:relative z-20`}
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
        <nav className="mt-6 px-4 flex flex-col items-center md:items-start">
          <ul className="flex md:flex-col w-full justify-around">
            <li className="w-full">
              <Link to="/home" className="block py-2 px-4 text-white hover:bg-gray-700 rounded text-center">
                Home
              </Link>
            </li>
            <li className="w-full">
              <Link to="/home/profile" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded text-center">
                Profile
              </Link>
            </li>
            <li className="w-full">
              <Link to="/home/setting" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded text-center">
                Settings
              </Link>
            </li>
            
                    {isloggedin && (
                      <li className="w-full">
                      <Link
                          onClick={handleLogout}
                          className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded text-center"
                        >
                          Logout
                          </Link>
                      </li>
              
            )}
            
            {isAdmin && (
              <li className="w-full">
                <Link to="/home/admin" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded text-center">
                  Admin
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </aside>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden flex items-center p-4 fixed z-30">
        <button
          onClick={toggleSidebar}
          className={`focus:outline-none ${isOpen ? 'text-white' : 'text-black'}`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Overlay for Sidebar */}
      {isOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"></div>}
    </div>
  );
}

export default Sidebar;
