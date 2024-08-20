import React, { useState, useEffect } from 'react';

const AdminHome = () => {
  // State to hold the dynamic numbers
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [submittedForms, setSubmittedForms] = useState(0);
  const [acceptedApplications, setAcceptedApplications] = useState(0);
  const [pendingApplications, setPendingApplications] = useState(0);

   // State for notification functionality
  const [notification, setNotification] = useState('');
  const [triggerSend, setTriggerSend] = useState(false);



   // State for search functionality
   const [searchQuery, setSearchQuery] = useState('');
   const [matchingStudents, setMatchingStudents] = useState([]);
   const [selectedStudent, setSelectedStudent] = useState(null);




   const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  useEffect(() => {
    const fetchTotalRegistrations = async () => {
      try {
        // Retrieve the access token from cookies
        const accessToken = getCookie('accessToken');

        // Perform the fetch request with headers
        const response = await fetch('/api/admin/total-registrations', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}` // Add the access token here
          }
        });

        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response
        const data = await response.json();
        setTotalRegistrations(data.totalRegistrations);
      } catch (error) {
        console.error('Error fetching total registrations:', error);
      }
    };

    fetchTotalRegistrations();
  }, []); // Empty dependency array to run this effect once on component mount


  useEffect(() => {
    const fetchSubmittedForms = async () => {
      try {
        // Retrieve the access token from cookies
        const accessToken = Cookies.get('accessToken');

        // Perform the fetch request with headers
        const response = await fetch('https://hacathone-backend.vercel.app/api/Admin/submitted-forms', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}` // Add the access token here
          }
        });

        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response
        const data = await response.json();
        setSubmittedForms(data.submittedForms);
      } catch (error) {
        console.error('Error fetching submitted forms:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmittedForms();
  }, []); 

  useEffect(() => {
    const fetchAcceptedApplications = async () => {
      try {
        // Retrieve the access token from cookies
        const accessToken = Cookies.get('accessToken');

        // Perform the fetch request with headers
        const response = await fetch('https://hacathone-backend.vercel.app/api/admin/passed-applications', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}` // Add the access token here
          }
        });

        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response
        const data = await response.json();
        setAcceptedApplications(data.passedApplications);
      } catch (error) {
        console.error('Error fetching passed applications:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedApplications();
  }, []); // Empty dependency array to run this effect once on component mount

  
  useEffect(() => {
    const fetchPendingApplications = async () => {
      try {
        // Retrieve the access token from cookies
        const accessToken = Cookies.get('accessToken');

        // Perform the fetch request with headers
        const response = await fetch('https://hacathone-backend.vercel.app/api/admin/fail-applications', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}` // Add the access token here
          }
        });

        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response
        const data = await response.json();
        setPendingApplications(data.failApplications);
      } catch (error) {
        console.error('Error fetching pending applications:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingApplications();
  }, []); // Empty dependency array to run this effect once on component mount


  // Function to search students by name or email
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) { // Start searching after 3 characters
      try {
        // Retrieve the access token from cookies
        const accessToken = Cookies.get('accessToken');

        // Perform the fetch request with headers
        const response = await fetch(`https://hacathone-backend.vercel.app/api/admin/search-users?query=${query}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}` // Add the access token here
          }
        });

        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response
        const data = await response.json();
        setMatchingStudents(data.students);
      } catch (error) {
        console.error('Error searching students:', error);
      }
    } else {
      setMatchingStudents([]);
    }
  };

  // Handle selection of a student
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setMatchingStudents([]); // Clear the search results
  };

  // Handle approval of selected student
  const handleApprove = async () => {
    if (selectedStudent) {
      try {
        // Retrieve the access token from cookies
        const accessToken = Cookies.get('accessToken');

        // Perform the fetch request with headers
        const response = await fetch(`https://hacathone-backend.vercel.app/api/admin/update-application-status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}` // Add the access token here
          },
          body: JSON.stringify({ studentId: selectedStudent._id, status: 'pass' })
        });

        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert('Application approved');
        setSelectedStudent(null);
      } catch (error) {
        console.error('Error approving application:', error);
      }
    }
  };

  // Handle rejection of selected student
  const handleReject = async () => {
    if (selectedStudent) {
      try {
        // Retrieve the access token from cookies
        const accessToken = Cookies.get('accessToken');

        // Perform the fetch request with headers
        const response = await fetch(`https://hacathone-backend.vercel.app/api/admin/update-application-status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}` // Add the access token here
          },
          body: JSON.stringify({ studentId: selectedStudent._id, status: 'fail' })
        });

        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert('Application rejected');
        setSelectedStudent(null);
      } catch (error) {
        console.error('Error rejecting application:', error);
      }
    }
  };





  const handleInputChange = (e) => {
    setNotification(e.target.value);
  };

  const handleSendNotification = () => {
    if (!notification) {
      alert('Please enter a notification message');
      return;
    }
    // Set the trigger to true to initiate the sending process in useEffect
    setTriggerSend(true);
  };

   // Effect to handle sending the notification
  useEffect(() => {
    const sendNotification = async () => {
      try {
        // Retrieve the access token from cookies
        const accessToken = Cookies.get('accessToken');

        // Perform the fetch request with headers
        const response = await fetch('https://hacathone-backend.vercel.app/api/admin/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}` // Add the access token here
          },
          body: JSON.stringify({ message: notification }),
        });

        if (response.ok) {
          const result = await response.json();
          alert('Notification sent successfully!');
          setNotification(''); // Clear the input field
        } else {
          const error = await response.json();
          alert(`Failed to send notification: ${error.message}`);
        }
      } catch (error) {
        console.error('Error sending notification:', error);
        alert('An error occurred while sending the notification.');
      } finally {
        setTriggerSend(false); // Reset the trigger
      }
    };

    if (triggerSend) {
      sendNotification();
    }
  }, [triggerSend, notification]);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Dashboard */}
    {/* Dashboard */}
  <section className="mb-8">
    <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Total Registrations</h3>
        <p className="text-2xl font-bold">{totalRegistrations}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Submitted Forms</h3>
        <p className="text-2xl font-bold">{submittedForms}</p>
      </div>
      <div className="bg-green-100 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-green-800">Passed Applications</h3>
        <p className="text-2xl font-bold text-green-800">{acceptedApplications}</p>
      </div>
      <div className="bg-red-100 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-red-800">Fail Applications</h3>
        <p className="text-2xl font-bold text-red-800">{pendingApplications}</p>
      </div>
    </div>
  </section>

    
      {/* Application Management */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Application Result Management</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">View Applications</h3>
          <input
            type="text"
            placeholder="Search Students..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 mb-2 border rounded-md"
          />
           {matchingStudents.length > 0 && (
            <ul className="mb-2 border rounded-md">
              {matchingStudents.map((student) => (
                <li
                  key={student._id}
                  onClick={() => handleSelectStudent(student)}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                >
                  {student.name} - {student.email}
                </li>
              ))}
            </ul>
          )}
           {selectedStudent && (
            <div className="mt-4">
              <p className="text-lg">Selected Student: {selectedStudent.name} ({selectedStudent.email})</p>
              <button onClick={handleApprove} className="bg-green-500 text-white px-4 py-2 rounded-md">Approve Selected</button>
              <button onClick={handleReject} className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">Reject Selected</button>
            </div>
          )}
          
          {/* Application list goes here */}
        </div>
      </section>



      <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Notifications and Announcements</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Send Notifications</h3>
        <input
          type="text"
          placeholder="Enter your notification..."
          value={notification}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />
        <button
          onClick={handleSendNotification}
          className="bg-purple-500 text-white px-4 py-2 rounded-md"
        >
          Send Notification
        </button>
      </div>
    </section>

    
    </div>
  );
};

export default AdminHome;
