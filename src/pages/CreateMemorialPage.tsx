import React, { useState } from 'react';
import MemorialCreationForm from '../components/MemorialCreationForm';
import MemorialTypeSelection from '../components/MemorialTypeSelection';

const CreateMemorialPage: React.FC = () => {
  const [showWelcomeForm, setShowWelcomeForm] = useState(true);
  const [userData, setUserData] = useState({ firstName: '', lastName: '' });

  const handleWelcomeComplete = (formData: { firstName: string, lastName: string }) => {
    setUserData(formData);
    localStorage.setItem('userData', JSON.stringify(formData));
    setShowWelcomeForm(false);
  };

  return (
    <div className="min-h-screen bg-beige">
      {showWelcomeForm ? (
        <MemorialCreationForm onSubmit={handleWelcomeComplete} />
      ) : (
        <MemorialTypeSelection />
      )}
    </div>
  );
};

export default CreateMemorialPage;