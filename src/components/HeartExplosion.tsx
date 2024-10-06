import React, { useEffect, useState } from 'react';

const HeartExplosion: React.FC = () => {
  const [hearts, setHearts] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const newHearts = [];
    for (let i = 0; i < 100; i++) {
      const style = {
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 0.5}s`,
        fontSize: `${Math.random() * 60 + 20}px`,
        transform: `rotate(${Math.random() * 360}deg)`,
      };
      newHearts.push(<div key={i} className="heart absolute" style={style}>❤️</div>);
    }
    setHearts(newHearts);

    const timer = setTimeout(() => {
      setHearts([]);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {hearts}
    </div>
  );
};

export default HeartExplosion;