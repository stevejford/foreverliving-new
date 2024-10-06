import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import images
import memorialSelectionImage from '/images/memorial-selection.png';
import lifestorySelectionImage from '/images/lifestory-selection.png';

const MemorialTypeSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<'online' | 'lifestory' | null>(null);

  const handleSelect = (type: 'online' | 'lifestory') => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (selectedType === 'online') {
      navigate('/online-memorial');
    } else if (selectedType === 'lifestory') {
      navigate('/life-story');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-beige">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-semibold mb-8 text-center text-blue-600">What would you like to create?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${selectedType === 'online' ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => handleSelect('online')}
          >
            <img 
              src={memorialSelectionImage} 
              alt="Online Memorial" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Online Memorial</h2>
              <p className="text-gray-600">Honor and remember a loved one's memory.</p>
            </div>
          </div>
          <div 
            className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${selectedType === 'lifestory' ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => handleSelect('lifestory')}
          >
            <img 
              src={lifestorySelectionImage} 
              alt="Life Story" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Life Story</h2>
              <p className="text-gray-600">Ensure your story is remembered for generations to come.</p>
            </div>
          </div>
        </div>
        <button 
          className={`mt-8 w-full font-semibold py-2 px-4 rounded-lg transition-colors ${
            selectedType 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          onClick={handleContinue}
          disabled={!selectedType}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default MemorialTypeSelection;