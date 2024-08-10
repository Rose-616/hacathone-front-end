import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Components/Navbar/Sidebar.jsx';

function AuthenticatedLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthenticatedLayout;
