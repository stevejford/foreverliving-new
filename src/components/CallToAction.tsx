import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CallToAction: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <section className="bg-[#2a2a2a] text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Create a Lasting Memorial?</h2>
        <p className="mb-10 max-w-2xl mx-auto text-lg text-gray-300">
          Honor your loved ones and preserve their legacy with Forever Living's digital
          memorial service.
        </p>
        {!currentUser && (
          <Link 
            to="/create-account"
            className="bg-[#ff4d79] text-white px-8 py-4 rounded-lg hover:bg-[#ff3366] transition-colors inline-flex items-center text-lg font-semibold"
          >
            <Heart size={24} className="mr-2" />
            Get Started Now
          </Link>
        )}
      </div>
    </section>
  );
};

export default CallToAction;