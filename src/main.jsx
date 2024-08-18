import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import AuthenticatedLayout from './AuthenticatedLayout.jsx';
import UnauthenticatedLayout from './UnauthenticatedLayout.jsx';
import Home from './Components/Home/Home.jsx';
import Auth from './Components/Login/Auth.jsx';
import AddmissionForm from './Components/Addmission Form/AddmissionForm.jsx';
import Profile from './Components/Profile/Profile.jsx';
import Setting from './Components/Settings/Setting.jsx';
import AdminHome from './Components/Admin/Home/AdminHome.jsx'
import Register from './Components/Login/Register.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/home" element={<AuthenticatedLayout />}>
        <Route index path="/home" element={<Home />} />
        <Route path="/home/profile" element={<Profile />} />
        <Route path="/home/setting" element={<Setting />} />
        <Route path="/home/admin" element={<AdminHome />} />
        <Route path="profile" element={<Home />} />  {/* Replace with Profile component */}
        <Route path="settings" element={<Home />} />
        <Route path="/home/addmission-form" element={<AddmissionForm/>} />{/* Replace with Settings component */}
       
      
      </Route>
      <Route path="/" element={<UnauthenticatedLayout />}>
        <Route index element={<Navigate to="/login" replace />} /> {/* Redirect to /login */}
        <Route path="login" element={<Auth />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
