import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Heart } from 'lucide-react';
import ActivityBubble from './ActivityBubble';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Debug Footer</h2>
        <p>If you can see this, the footer is rendering.</p>
        {/* Rest of your footer content */}
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            id="newsletter-email"
            name="newsletter-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-forever-orange"
            placeholder="Enter your email"
            required
          />
          <button type="submit" className="bg-forever-orange text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors">
            Subscribe
          </button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;