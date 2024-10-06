import React from 'react';
import { UserPlus, PenTool, Share2 } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    { icon: <UserPlus size={48} />, title: 'Create an Account', description: 'Sign up for Forever Living and set up your profile.' },
    { icon: <PenTool size={48} />, title: 'Build the Memorial', description: 'Add photos, videos, and stories to create a beautiful tribute.' },
    { icon: <Share2 size={48} />, title: 'Share and Collaborate', description: 'Invite family and friends to contribute their memories.' },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#2a2a2a] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-around items-start">
          {steps.map((step, index) => (
            <div key={index} className="text-center mb-8 md:mb-0 flex flex-col items-center max-w-xs">
              <div className="text-[#ff4d79] mb-6 bg-[#3a3a3a] p-6 rounded-full">{step.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;