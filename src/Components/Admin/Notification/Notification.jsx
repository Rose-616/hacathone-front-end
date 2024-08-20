import React, { useState, useEffect } from 'react';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };
  const accessToken = getCookie('accessToken');
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
    
        const response = await fetch('https://hacathone-backend.vercel.app/api/v1/users/notifications', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}` // Add the access token here
          }
        });

        if (response.ok) {
          const data = await response.json();
          setNotifications(data.notifications); // Assumes the response has a 'notifications' field
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch notifications');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [accessToken]); // Add accessToken as a dependency if it might change

  if (loading) return <p className="text-center py-4 text-blue-600">Loading...</p>;

  if (error) return <p className="text-red-600 text-center py-4">{error}</p>;

  // Sort notifications by creation date in descending order and get the latest 5
  const latestNotifications = notifications
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);


  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold mb-4 text-indigo-600">Notifications</h2>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        {latestNotifications.length > 0 ? (
          <ul className="list-disc pl-5">
            {latestNotifications.map((notification) => (
              <li key={notification._id} className="py-2 border-b border-gray-300 last:border-b-0">
                <p className="text-gray-800 text-lg">{notification.message}</p>
                <p className="text-sm text-gray-600">{new Date(notification.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No notifications available.</p>
        )}
      </div>
    </section>
  );
};

export default Notification;
