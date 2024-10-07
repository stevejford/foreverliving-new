import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-2 bg-[#2a2a2a]"></div>
      <div className="flex flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
