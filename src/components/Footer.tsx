import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Forever Living</h3>
            <p className="mb-4">Your partner in health and wellness.</p>
            <div className="flex space-x-4">
              <Facebook className="cursor-pointer hover:text-white" />
              <Twitter className="cursor-pointer hover:text-white" />
              <Instagram className="cursor-pointer hover:text-white" />
              <Linkedin className="cursor-pointer hover:text-white" />
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="home" smooth={true} className="cursor-pointer hover:text-white">Home</Link></li>
              <li><Link to="products" smooth={true} className="cursor-pointer hover:text-white">Products</Link></li>
              <li><Link to="about" smooth={true} className="cursor-pointer hover:text-white">About Us</Link></li>
              <li><Link to="contact" smooth={true} className="cursor-pointer hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Newsletter</h4>
            <p className="mb-4">Stay updated with our latest offers and products.</p>
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                id="newsletter-email"
                name="newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-forever-orange text-gray-800 w-full"
                placeholder="Enter your email"
                required
              />
              <button type="submit" className="bg-forever-orange text-white px-4 py-2 rounded-r-md hover:bg-forever-orange-dark transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2024 Forever Living. All rights reserved.</p>
          <p className="mt-2 flex items-center justify-center">
            Made with <Heart className="mx-1 text-forever-orange" size={16} /> by Forever Living Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;