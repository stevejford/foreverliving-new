import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SideMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={`hidden md:block fixed top-0 left-0 h-full bg-white shadow-md transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <button onClick={toggleMenu} className="absolute top-4 right-4">
        {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>
      <nav className={`flex flex-col mt-16 ${isOpen ? 'items-start' : 'items-center'}`}>
        <Link to="/" className="px-4 py-2 w-full hover:bg-gray-100 flex items-center">
          <span className={`ml-2 ${isOpen ? 'inline' : 'hidden'}`}>Home</span>
        </Link>
        <Link to="/create-memorial" className="px-4 py-2 w-full hover:bg-gray-100 flex items-center">
          <span className={`ml-2 ${isOpen ? 'inline' : 'hidden'}`}>Create Memorial</span>
        </Link>
        <Link to="/about" className="px-4 py-2 w-full hover:bg-gray-100 flex items-center">
          <span className={`ml-2 ${isOpen ? 'inline' : 'hidden'}`}>About</span>
        </Link>
        <Link to="/contact" className="px-4 py-2 w-full hover:bg-gray-100 flex items-center">
          <span className={`ml-2 ${isOpen ? 'inline' : 'hidden'}`}>Contact</span>
        </Link>
      </nav>
    </div>
  );
};

export default SideMenu;