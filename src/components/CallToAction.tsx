import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import HeartExplosion from './HeartExplosion';

const CallToAction: React.FC = () => {
  const [showHearts, setShowHearts] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setShowHearts(true);
    setTimeout(() => {
      setShowHearts(false);
      navigate('/create-memorial');
    }, 4000);
  };

  return (
    <section className="py-20 bg-[#2a2a2a] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Create a Lasting Memorial?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Honor your loved ones and preserve their legacy with Forever Living's digital memorial service.</p>
        <button onClick={handleClick} className="bg-[#ff4d79] text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors duration-300 inline-flex items-center">
          <Heart size={20} className="mr-2" />
          Get Started Now
        </button>
      </div>
      {showHearts && <HeartExplosion />}
    </section>
  );
};

export default CallToAction;