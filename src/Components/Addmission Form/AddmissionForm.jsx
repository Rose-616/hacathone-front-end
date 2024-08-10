import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CampaignIcon from '@mui/icons-material/Campaign';
import Swal from 'sweetalert2';

const AdmissionForm = () => {
  const location = useLocation();
  const { selectedCourse } = location.state || {};
  console.log("Selected Course", selectedCourse);

  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    mobileNo: '',
    lastQualification: '',
    course: selectedCourse || 'it', // Default to 'it' or selected course
  });

  useEffect(() => {
    if (selectedCourse) {
      setFormData((prevData) => ({ ...prevData, course: selectedCourse }));
    }
  }, [selectedCourse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate individual fields
    if (!formData.studentName) {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Please enter your Student name.',
        icon: 'warning',
        confirmButtonText: 'Okay'
      });
      return;
    }

    if (!formData.studentEmail) {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Please enter your email address.',
        icon: 'warning',
        confirmButtonText: 'Okay'
      });
      return;
    }

    if (!formData.mobileNo) {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Please enter your mobile number.',
        icon: 'warning',
        confirmButtonText: 'Okay'
      });
      return;
    }

    if (!formData.lastQualification) {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Please enter your last qualification.',
        icon: 'warning',
        confirmButtonText: 'Okay'
      });
      return;
    }

    try {
      const response = await fetch('/api/v1/users/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        Swal.fire({
          title: 'Success!',
          text: 'Your application has been submitted successfully.',
          icon: 'success',
          confirmButtonText: 'Okay'
        });
        // Optionally reset the form or redirect the user
        setFormData({
          studentName: '',
          studentEmail: '',
          mobileNo: '',
          lastQualification: '',
        });
      } else {
        const error = await response.json();
        Swal.fire({
          title: 'Error!',
          text: `Submission failed: ${error.message || 'An error occurred'}`,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Network Error!',
        text: 'An error occurred while submitting the form. Please try again later.',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-6">
      {/* Announcement Button */}
      <div className="text-center">
        <button className="bg-gray-800 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-green-600">
          <CampaignIcon style={{ fontSize: '80px', transform: 'rotate(-30deg)' }} />
          <span className="text-lg">Announcement</span>
        </button>
      </div>

      {/* Admission Form */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">IT Course Admission Form</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input 
              type="text" 
              name="studentName" 
              value={formData.studentName} 
              onChange={handleChange}
              placeholder="Enter your Full Name" 
              className="w-full border border-gray-300 p-2 rounded" 
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              name="studentEmail" 
              value={formData.studentEmail} 
              onChange={handleChange} 
              placeholder="Enter your Email address"
              className="w-full border border-gray-300 p-2 rounded" 
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Mobile Number</label>
            <input 
              type="tel" 
              name="mobileNo" 
              value={formData.mobileNo} 
              onChange={handleChange} 
              placeholder="Enter your Mobile Number"
              className="w-full border border-gray-300 p-2 rounded" 
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Last Qualification</label>
            <input 
              type="text" 
              name="lastQualification"
              value={formData.lastQualification} 
              onChange={handleChange} 
              placeholder="Enter your last qualification"
              className="w-full border border-gray-300 p-2 rounded" 
            />
          </div>
          <div className="text-center">
            <button 
              type="submit" 
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmissionForm;
