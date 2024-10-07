import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '') return;

    try {
      await addDoc(collection(db, 'newsletter'), {
        email,
        subscribedAt: new Date()
      });
      setEmail('');
      alert('Thank you for subscribing!');
    } catch (error) {
      console.error('Error adding subscriber: ', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <footer className="bg-[#2a2a2a] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Forever Living</h3>
            <p>Your partner in preserving memories.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/testimonials">Testimonials</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="mb-2">Stay updated with our latest offers and products.</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff4d79]"
              />
              <button 
                type="submit" 
                className="w-full bg-[#ff4d79] text-white py-2 rounded-md hover:bg-[#ff3366] transition-colors flex items-center justify-center"
              >
                Subscribe <ArrowRight size={16} className="ml-2" />
              </button>
            </form>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-700 text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <Facebook size={24} className="cursor-pointer hover:text-[#ff4d79]" />
            <Twitter size={24} className="cursor-pointer hover:text-[#ff4d79]" />
            <Instagram size={24} className="cursor-pointer hover:text-[#ff4d79]" />
            <Linkedin size={24} className="cursor-pointer hover:text-[#ff4d79]" />
          </div>
          <p>&copy; {currentYear} Forever Living. All rights reserved.</p>
          <p className="mt-2">Made with <Heart size={16} className="inline text-[#ff4d79]" /> by Forever Living Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;