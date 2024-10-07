import React from 'react';
import Auth from '../components/Auth';

const AuthPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Sign Up or Sign In</h1>
      <Auth />
    </div>
  );
};

export default AuthPage;