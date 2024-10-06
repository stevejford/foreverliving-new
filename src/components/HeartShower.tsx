import React, { useState, useEffect } from 'react';

interface HeartProps {
  style: React.CSSProperties;
}

const Heart: React.FC<HeartProps> = ({ style }) => {
  return <div className="heart" style={style}></div>;
};

const HeartShower: React.FC = () => {
  const [hearts, setHearts] = useState<React.CSSProperties[]>([]);

  const createHeart = () => {
    const heart: React.CSSProperties = {
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      opacity: Math.random(),
      fontSize: `${Math.random() * 10 + 10}px`,
      animation: `float-heart ${Math.random() * 3 + 2}s ease-in-out`,
    };
    setHearts((prevHearts) => [...prevHearts, heart]);
    setTimeout(() => {
      setHearts((prevHearts) => prevHearts.slice(1));
    }, 5000);
  };

  useEffect(() => {
    const interval = setInterval(createHeart, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hearts-container">
      {hearts.map((style, i) => (
        <Heart key={i} style={style} />
      ))}
    </div>
  );
};

export default HeartShower;