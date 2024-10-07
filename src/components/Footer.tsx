import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Facebook, Twitter, Instagram, Linkedin, ArrowRight, ArrowUp } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config'; // Make sure this path is correct

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      // Add email to Firestore
      await addDoc(collection(db, 'newsletter_subscribers'), {
        email,
        createdAt: new Date()
      });

      setMessage('Subscribed successfully!');
      setEmail('');
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setMessage('Error subscribing to newsletter');
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#1a1a1a] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <Heart size={32} className="text-[#ff4d79]" />
              <span className="text-3xl font-serif font-bold">Forever Living</span>
            </Link>
            <p className="text-gray-300">Your partner in health and wellness.</p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a key={index} href="#" className="text-gray-300 hover:text-[#ff4d79] transition-colors">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Features', id: 'features' },
                { name: 'How It Works', id: 'how-it-works' },
                { name: 'Testimonials', id: 'testimonials' },
              ].map((item) => (
                <li key={item.name}>
                  <button 
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-300 hover:text-[#ff4d79] transition-colors"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Legal & Support</h4>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'FAQ', 'Help Center'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-300 hover:text-[#ff4d79] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">Stay updated with our latest offers and products.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#ff4d79]"
                placeholder="Enter your email"
                required
              />
              <button 
                type="submit" 
                className="w-full bg-[#ff4d79] text-white px-4 py-2 rounded-lg hover:bg-[#ff3366] transition-colors flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? 'Subscribing...' : (
                  <>
                    Subscribe <ArrowRight size={20} className="ml-2" />
                  </>
                )}
              </button>
              {message && <p className={`text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
            </form>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; 2024 Forever Living. All rights reserved.</p>
          <p className="mt-2 flex items-center justify-center">
            Made with <Heart size={18} className="mx-1 text-[#ff4d79]" /> by Forever Living Team
          </p>
        </div>
      </div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#ff4d79] text-white p-2 rounded-full shadow-lg hover:bg-[#ff3366] transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </footer>
  );
};

export default Footer;