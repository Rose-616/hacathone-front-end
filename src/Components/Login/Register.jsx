import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { PropagateLoader } from 'react-spinners';

function Register({ setFormAction, setShowAdditionalFields, setIsLoading, navigate }) {
  const [isLoading, setIsLoadingLocal] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const registerUser = async (registerData) => {
    try {
      setIsLoadingLocal(true);
      const formData = new FormData();
      formData.append('username', registerData.username);
      formData.append('email', registerData.email);
      formData.append('password', registerData.password);
      formData.append('confirmPassword', registerData.confirmPassword);
      if (profilePic) {
        formData.append('avatar', profilePic);
      }
  
      const response = await fetch('https://hacathone-backend.vercel.app/api/v1/users/register', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });
  
      // Check if the response is JSON
      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server response is not JSON');
      }
  
      const data = await response.json();
  
      if (response.ok) {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You have successfully registered.',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/login');
      } else {
        const errorMessage = data.error?.message || 'An error occurred while registering. Please try again.';
        console.error('Registration failed:', errorMessage);
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: errorMessage,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred. Please try again later.';
      console.error('Error:', errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Registration Error',
        text: errorMessage,
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsLoadingLocal(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const registerData = Object.fromEntries(new FormData(event.target).entries());
    await registerUser(registerData);
  };

  const handleProfilePicChange = (event) => {
    setProfilePic(event.target.files[0]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/path/to/your/background-image.jpg')] bg-cover bg-center">
      <section className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg w-full max-w-md mx-4 md:mx-0">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8CC63F] mb-4">
            WELCOME TO SMIT ADMISSION PORTAL
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800">
            Register an account
          </h2>
          <p className="mt-2 text-gray-600">
            Already have an account?{' '}
            <a
              onClick={() => {
                setFormAction('https://hacathone-backend.vercel.app/api/v1/users/login');
                setShowAdditionalFields(false);
              }}
              href="/login"
              className="font-semibold text-[#8CC63F] hover:underline"
            >
              Login here
            </a>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
              User Name
            </label>
            <input
              id="userName"
              type="text"
              name="username"
              placeholder="User Name"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8CC63F] focus:border-[#8CC63F] sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8CC63F] focus:border-[#8CC63F] sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8CC63F] focus:border-[#8CC63F] sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8CC63F] focus:border-[#8CC63F] sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              id="profilePic"
              type="file"
              name="avatar" // Updated name to match formData
              accept="image/*"
              onChange={handleProfilePicChange}
              className="mt-1 block w-full border border-gray-300 rounded-md text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[#8CC63F] file:text-white hover:file:bg-[#7ABF4E]"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#8CC63F] text-white font-semibold rounded-md shadow-sm hover:bg-[#7ABF4E] focus:ring-2 focus:ring-[#8CC63F] focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="mr-2">Loading...</span>
                  <PropagateLoader color="white" size={8} />
                </span>
              ) : (
                <>
                  Register
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Register;
