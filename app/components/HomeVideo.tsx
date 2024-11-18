'use client';

import { useState, useEffect } from 'react';

export default function HomeVideo() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Preload the video
    const videoElement = document.createElement('video');
    videoElement.src = '/videos/9218233-hd_1920_1080_30fps.mp4';
    videoElement.onloadeddata = () => setIsLoaded(true);
    videoElement.onerror = (e) => {
      console.error('Error loading video:', e);
    };
  }, []);

  return (
    <>
      <video
        className={`absolute top-0 left-0 w-full h-full object-cover brightness-100 transition-opacity duration-500 ${
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
        onError={(e) => console.error('Video error:', e)}
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/25" />
    </>
  );
}
