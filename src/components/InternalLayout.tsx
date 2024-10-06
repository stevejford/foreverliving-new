import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HamburgerMenu from './HamburgerMenu';
import SideMenu from './SideMenu';

const InternalLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-warm-beige">
      <Header />
      <HamburgerMenu />
      <SideMenu />
      <main className="flex-grow container mx-auto px-4 py-8 md:ml-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default InternalLayout;