import React, { useState } from 'react';

const MemorialCreationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    dateOfPassing: '',
    biography: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Handle form submission (e.g., send data to backend)
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create a Memorial</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name of Loved One</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-forever-orange"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="dateOfBirth" className="block text-gray-700 font-bold mb-2">Date of Birth</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-forever-orange"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="dateOfPassing" className="block text-gray-700 font-bold mb-2">Date of Passing</label>
        <input
          type="date"
          id="dateOfPassing"
          name="dateOfPassing"
          value={formData.dateOfPassing}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-forever-orange"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="biography" className="block text-gray-700 font-bold mb-2">Biography</label>
        <textarea
          id="biography"
          name="biography"
          value={formData.biography}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-forever-orange"
          rows={5}
          required
        ></textarea>
      </div>
      <button type="submit" className="w-full bg-forever-orange text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
        Create Memorial
      </button>
    </form>
  );
};

export default MemorialCreationForm;