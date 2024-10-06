import React, { useState } from 'react';

interface MemorialCreationFormProps {
  onSubmit: (formData: { firstName: string, lastName: string }) => void;
}

const MemorialCreationForm: React.FC<MemorialCreationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-beige">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold mb-4 text-center text-blue-600">Welcome to Memories</h1>
        <p className="text-center mb-6 text-gray-600">
          Your digital space to preserve cherished moments, connect with family and friends,
          and together create lasting tributes for your loved one.
        </p>
        <p className="text-center mb-6 text-gray-600">
          To enhance and personalise your experience, please share a bit about yourself:
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Last name (optional)</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your last name"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default MemorialCreationForm;