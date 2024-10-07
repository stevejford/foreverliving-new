import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemorialTypeSelection from '../components/MemorialTypeSelection';
import MemorialCreationForm from '../components/MemorialCreationForm';

const CreateMemorialPage: React.FC = () => {
  const [showSelection, setShowSelection] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = (data: any) => {
    // Save form data to localStorage or state management
    localStorage.setItem('memorialData', JSON.stringify(data));
    setShowSelection(true);
  };

  const handleTypeSelect = (type: string) => {
    // Save selected type and navigate to appropriate page
    localStorage.setItem('memorialType', type);
    if (type === 'online') {
      navigate('/online-memorial');
    } else {
      navigate('/life-story');
    }
  };

  return (
    <div>
      {!showSelection ? (
        <MemorialCreationForm onSubmit={handleFormSubmit} />
      ) : (
        <MemorialTypeSelection onSelect={handleTypeSelect} />
      )}
    </div>
  );
};

export default CreateMemorialPage;