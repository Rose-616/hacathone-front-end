import React from 'react';
import { Outlet } from 'react-router-dom';

function UnauthenticatedLayout() {
  return (
    <div className="flex h-screen">
      <main className="flex-1 bg-gray-100 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default UnauthenticatedLayout;
