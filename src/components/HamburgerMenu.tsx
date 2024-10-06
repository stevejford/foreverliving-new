import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu} className="p-2">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md">
          <nav className="flex flex-col">
            <Link to="/" className="px-4 py-2 hover:bg-gray-100" onClick={toggleMenu}>Home</Link>
            <Link to="/create-memorial" className="px-4 py-2 hover:bg-gray-100" onClick={toggleMenu}>Create Memorial</Link>
            <Link to="/about" className="px-4 py-2 hover:bg-gray-100" onClick={toggleMenu}>About</Link>
            <Link to="/contact" className="px-4 py-2 hover:bg-gray-100" onClick={toggleMenu}>Contact</Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;