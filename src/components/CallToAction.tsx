import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CallToAction: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <section className="bg-gradient-to-r from-[#2a2a2a] via-[#3a3a3a] to-[#2a2a2a] text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Create a Lasting Memorial?</h2>
        <p className="text-xl mb-8">
          Honor your loved ones and preserve their legacy with Forever Living's digital memorial service.
        </p>
        <Link
          to="/create-memorial"
          className="inline-flex items-center px-6 py-3 bg-[#ff4d79] text-white font-semibold rounded-md hover:bg-[#ff3366] transition-colors"
        >
          <Heart className="mr-2" size={20} />
          Get Started Now
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;