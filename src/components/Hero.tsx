import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import HeartExplosion from './HeartExplosion';

const Hero: React.FC = () => {
  const [showHearts, setShowHearts] = useState(false);
  const navigate = useNavigate();

  const handleStartMemorial = () => {
    setShowHearts(true);
    setTimeout(() => {
      setShowHearts(false);
      navigate('/create-memorial');
    }, 4000);
  };

  return (
    <section className="relative h-screen flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/11208354/pexels-photo-11208354.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1')`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">Honor Your Loved Ones' Legacy</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">Create beautiful digital memorials to celebrate and remember the lives of those who matter most.</p>
        <button 
          onClick={handleStartMemorial}
          className="btn-primary text-xl px-8 py-4 inline-flex items-center"
        >
          <Heart size={24} className="mr-2" />
          Start a Memorial
        </button>
      </div>
      {showHearts && <HeartExplosion />}
    </section>
  );
};

export default Hero;