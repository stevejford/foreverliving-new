import React from 'react';
import { Outlet } from 'react-router-dom';

const InternalLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f8f8]"> {/* Soft white background */}
      <header className="bg-[#2a2a2a] text-white py-4">
        {/* Blank header - content can be added here later */}
        <div className="container mx-auto px-4">
          {/* Empty for now */}
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default InternalLayout;