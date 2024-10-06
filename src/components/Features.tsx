import React from 'react';
import { Lightbulb, Calendar, Image } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    { icon: <Lightbulb size={48} />, title: 'Digital Memorials', description: 'Create a dedicated space to honor and remember your loved ones, ensuring their memory lives on.' },
    { icon: <Calendar size={48} />, title: 'Life Timeline', description: 'Display a chronological journey through significant events and milestones in your loved one\'s life.' },
    { icon: <Image size={48} />, title: 'Media Gallery', description: 'Upload, view, and share photos and videos, creating a rich visual archive of cherished memories.' },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#2a2a2a] mb-12">Features of Forever Living</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#2a2a2a] p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-[#ff4d79] mb-6 flex justify-center">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-4 text-[#efffff]">{feature.title}</h3>
              <p className="text-[#efffff]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;