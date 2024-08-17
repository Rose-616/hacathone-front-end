import React, { useState } from 'react';
import Swal from 'sweetalert2';

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) {
    return match[2];
  }
  return null;
};

const Setting = () => {
  const [activeSection, setActiveSection] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validatePassword = (password) => {
    if (!password) return 'New password is required.';
    if (password.length < 6) return 'New password must be at least 6 characters long.';
    return '';
  };

  const handleUpdate = async () => {
    setError('');
    setSuccess('');

    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      return setError('Access token is missing. Please log in again.');
    }

    if (activeSection === 'email') {
      if (!newEmail) {
        return setError('New email is required.');
      }
      try {
        const response = await fetch('https://hacathone-backend.vercel.app/api/v1/users/update-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ email: newEmail }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess('Email updated successfully.');
        } else {
          setError(data.message || 'Failed to update email. Please try again.');
        }
      } catch (err) {
        setError('Failed to update email. Please try again.');
      }
    } else if (activeSection === 'password') {
      const passwordError = validatePassword(newPassword);
      if (passwordError) {
        return setError(passwordError);
      }

      if (!currentPassword) {
        return setError('Current password is required.');
      }

      try {
        const response = await fetch('https://hacathone-backend.vercel.app/api/v1/users/update-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        });

        const data = await response.json();

        console.log('Password update response:', data);

        if (response.ok) {
          setSuccess('Password updated successfully.');
        } else {
          setError(data.message || 'Failed to update password. Please try again.');
        }
      } catch (err) {
        console.error('Error updating password:', err);
        setError('Failed to update password. Please try again.');
      }
    }
  };

  const handleSectionToggle = (section) => {
    setActiveSection((prev) => (prev === section ? '' : section));
  };

  const confirmUpdate = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to proceed with this update?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdate();
      }
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <button
        onClick={() => handleSectionToggle('password')}
        className="block w-full px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md shadow-sm mb-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Change Your Password
      </button>
      <button
        onClick={() => handleSectionToggle('email')}
        className="block w-full px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Change Your Email Address
      </button>

      {/* Password Change Section */}
      {activeSection === 'password' && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            onClick={confirmUpdate}
            className="px-4 py-2 bg-[rgb(31,41,55)] text-white font-semibold rounded-md shadow-sm hover:bg-[rgb(26,35,45)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(31,41,55)]"
          >
            Update Password
          </button>
        </div>
      )}

      {/* Email Change Section */}
      {activeSection === 'email' && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">New Email</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            onClick={confirmUpdate}
            className="px-4 py-2 bg-[rgb(31,41,55)] text-white font-semibold rounded-md shadow-sm hover:bg-[rgb(26,35,45)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(31,41,55)]"
          >
            Update Email
          </button>
        </div>
      )}
    </div>
  );
};

export default Setting;
