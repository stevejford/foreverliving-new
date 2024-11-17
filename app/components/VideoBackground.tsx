'use client';

import { motion } from "framer-motion";
import Logo from "./Logo";
import { useState, useEffect } from 'react';

export default function VideoBackground() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Preload the video
    const video = new Image();
    video.src = '/videos/9218233-hd_1920_1080_30fps.mp4';
    video.onload = () => setIsLoaded(true);
  }, []);

  return (
    <div className="hidden lg:flex lg:w-1/2 relative">
      <video
        className={`absolute inset-0 w-full h-full object-cover brightness-50 transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/poster.jpg"
        src="/videos/9218233-hd_1920_1080_30fps.mp4"
        onLoadedData={() => setIsLoaded(true)}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50" />
      
      {/* Content overlay */}
      <div className="relative z-10 flex flex-col justify-between w-full p-12">
        <Logo />
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Preserve Your Precious Memories
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/80"
          >
            Create beautiful digital memorials to celebrate and honor the lives of your loved ones.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
