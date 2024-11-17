'use client';

import { useState, useEffect } from 'react';

export default function HomeVideo() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Preload the video
    const video = new Image();
    video.src = '/videos/9218233-hd_1920_1080_30fps.mp4';
    video.onload = () => setIsLoaded(true);
  }, []);

  return (
    <>
      <video
        className={`absolute top-0 left-0 w-full h-full object-cover brightness-50 transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        src="/videos/9218233-hd_1920_1080_30fps.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/poster.jpg"
        onLoadedData={() => setIsLoaded(true)}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />
    </>
  );
}
