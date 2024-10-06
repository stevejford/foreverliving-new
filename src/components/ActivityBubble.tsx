import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Image, Video, Edit } from 'lucide-react';

interface Activity {
  type: 'join' | 'update' | 'photo' | 'video';
  name: string;
  id: string;
}

const ActivityBubble: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  const generateRandomActivity = (): Activity => {
    const types: Activity['type'][] = ['update', 'photo', 'video', 'join'];
    const names = [
      'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'William',
      'Charlotte', 'James', 'Amelia', 'Benjamin', 'Evelyn', 'Lucas', 'Harper', 'Henry', 'Abigail', 'Alexander',
    ];

    return {
      type: types[Math.floor(Math.random() * types.length)],
      name: names[Math.floor(Math.random() * names.length)],
      id: Math.random().toString(36).substr(2, 9)
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActivities(prevActivities => {
        const newActivity = generateRandomActivity();
        return [newActivity, ...prevActivities.slice(0, 3)];
      });
    }, 3000 + Math.random() * 2000); // Update every 3-5 seconds

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'join': return <UserPlus size={12} />;
      case 'update': return <Edit size={12} />;
      case 'photo': return <Image size={12} />;
      case 'video': return <Video size={12} />;
    }
  };

  const getMessage = (activity: Activity) => {
    switch (activity.type) {
      case 'join': return `${activity.name} joined`;
      case 'update': return `${activity.name} updated`;
      case 'photo': return `${activity.name} added photo`;
      case 'video': return `${activity.name} added video`;
    }
  };

  const getBubbleColor = (type: Activity['type']) => {
    switch (type) {
      case 'join': return 'bg-green-500';
      case 'update': return 'bg-blue-500';
      case 'photo': return 'bg-purple-500';
      case 'video': return 'bg-red-500';
    }
  };

  return (
    <div className="space-y-2">
      <AnimatePresence initial={false}>
        {activities.slice(0, 4).map((activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 1
            }}
            className={`${getBubbleColor(activity.type)} text-white rounded-full shadow-lg p-2 flex items-center space-x-2 text-xs bg-opacity-75`}
          >
            <span className="bg-white text-gray-800 rounded-full p-1 flex-shrink-0">
              {getIcon(activity.type)}
            </span>
            <span className="font-medium truncate">{getMessage(activity)}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ActivityBubble;