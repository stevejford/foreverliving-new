import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import HeartExplosion from './HeartExplosion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCreateMemorialClick = () => {
    setShowHearts(true);
    setTimeout(() => {
      setShowHearts(false);
      navigate('/create-memorial');
    }, 4000);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#2a2a2a] py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <RouterLink to="/" className="flex items-center space-x-2 text-white">
          <Heart size={32} className="text-[#ff4d79]" />
          <span className="text-3xl font-serif font-bold">Forever Living</span>
        </RouterLink>
        <nav>
          <ul className="flex space-x-8 items-center">
            {['features', 'how-it-works', 'testimonials'].map((item) => (
              <li key={item}>
                <Link 
                  to={item} 
                  smooth={true} 
                  duration={500} 
                  className="nav-link text-white text-lg cursor-pointer hover:text-[#ff4d79] transition-colors relative"
                >
                  {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Link>
              </li>
            ))}
            <li>
              <button 
                onClick={handleCreateMemorialClick}
                className="btn-primary inline-flex items-center"
              >
                <Heart size={20} className="mr-2" />
                Create Memorial
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {showHearts && <HeartExplosion />}
    </header>
  );
};

export default Header;