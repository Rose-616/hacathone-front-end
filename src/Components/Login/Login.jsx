import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { PropagateLoader } from 'react-spinners';

function Login({ setFormAction, setShowAdditionalFields, setIsLoading, navigate }) {
  const [isLoading, setIsLoadingLocal] = useState(false);

  const loginUser = async (loginData) => {
    try {
      setIsLoadingLocal(true);
      const response = await fetch('https://hacathone-backend.vercel.app/api/v1/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (response.ok) {
        const { accessToken, refreshToken } = data;
      
        // Save tokens to localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);}
      if (response.ok) {
        setIsLoadingLocal(false);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Login Successful!',
          text: 'You have successfully logged in.',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/home');
      } else {
        console.error('Login failed:', data.error);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: data.error.message || 'An error occurred while logging in. Please try again.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoadingLocal(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginData = Object.fromEntries(new FormData(event.target).entries());
    await loginUser(loginData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/path/to/your/background-image.jpg')] bg-cover bg-center">
      <section className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg w-full max-w-md mx-4 md:mx-0">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8CC63F] mb-4">
            WELCOME TO SMIT ADMISSION PORTAL
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800">
            Login to your account
          </h2>
          <p className="mt-2 text-gray-600">
            Don't have an account?{' '}
            <a
              onClick={() => {
                setFormAction('/api/v1/users/register');
                setShowAdditionalFields(true);
              }}
              href="#"
              className="font-semibold text-[#8CC63F] hover:underline"
            >
              Create a free account
            </a>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
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
            <a
              href="#"
              className="text-sm font-medium text-[#8CC63F] hover:underline mt-2 block text-right"
            >
              Forgot password?
            </a>
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
                  Login
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

export default Login;
