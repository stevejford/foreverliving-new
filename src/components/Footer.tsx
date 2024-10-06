import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Heart } from 'lucide-react';
import ActivityBubble from './ActivityBubble';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup logic
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-forever-dark text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <h4 className="text-xl font-semibold mb-4">Live User Feed</h4>
            <div className="h-48 overflow-y-auto">
              <ActivityBubble />
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="hero" smooth={true} duration={500} className="hover:text-forever-orange transition-colors cursor-pointer">Home</Link></li>
              <li><Link to="features" smooth={true} duration={500} className="hover:text-forever-orange transition-colors cursor-pointer">Features</Link></li>
              <li><Link to="how-it-works" smooth={true} duration={500} className="hover:text-forever-orange transition-colors cursor-pointer">How It Works</Link></li>
              <li><Link to="testimonials" smooth={true} duration={500} className="hover:text-forever-orange transition-colors cursor-pointer">Testimonials</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p>Email: support@foreverliving.com</p>
            <p>Phone: 0435473212</p>
            <p>Address: 3 Conquest St, Mount Duneed, 3217</p>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
            <p className="mb-2">Stay updated with our latest features and news.</p>
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-forever-orange"
                required
              />
              <button
                type="submit"
                className="bg-forever-orange text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors"
              >
                <Mail size={20} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Heart size={24} className="text-forever-orange mr-2" />
            <span className="text-xl font-serif font-bold">Forever Living</span>
          </div>
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-forever-orange transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-forever-orange transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-forever-orange transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-forever-orange transition-colors"><Linkedin size={20} /></a>
          </div>
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Forever Living. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;