import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Heart, LogIn, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Updated condition to check for login page
  const isLoginPage = location.pathname === '/login' || location.pathname === '/login2';

  if (isLoginPage) {
    return null; // Don't render the header on login pages
  }

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#2a2a2a] py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <RouterLink to="/" className="flex items-center space-x-2 text-white">
          <Heart size={32} className="text-[#ff4d79]" />
          <span className="text-3xl font-serif font-bold">Forever Living</span>
        </RouterLink>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full left-0 w-full md:w-auto bg-[#2a2a2a] md:bg-transparent`}>
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 items-center py-4 md:py-0">
            {['features', 'how-it-works', 'testimonials'].map((item) => (
              <li key={item}>
                <a 
                  onClick={() => scrollTo(item)}
                  className="nav-link text-white text-lg cursor-pointer hover:text-[#ff4d79] transition-colors relative block md:inline-block py-2 md:py-0"
                >
                  {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </a>
              </li>
            ))}
            {currentUser ? (
              <li>
                <button 
                  onClick={handleLogout}
                  className="btn-secondary inline-flex items-center border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-[#2a2a2a] transition-colors w-full md:w-auto justify-center"
                >
                  <LogIn size={20} className="mr-2" />
                  Log out
                </button>
              </li>
            ) : (
              <>
                <li>
                  <RouterLink 
                    to="/create-account"
                    className="btn-primary inline-flex items-center bg-[#ff4d79] text-white px-4 py-2 rounded-lg hover:bg-[#ff3366] transition-colors w-full md:w-auto justify-center"
                  >
                    <Heart size={20} className="mr-2" />
                    Try free for 10 days
                  </RouterLink>
                </li>
                <li>
                  <RouterLink 
                    to="/login"
                    className="btn-secondary inline-flex items-center border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-[#2a2a2a] transition-colors w-full md:w-auto justify-center"
                  >
                    <LogIn size={20} className="mr-2" />
                    Log in
                  </RouterLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;