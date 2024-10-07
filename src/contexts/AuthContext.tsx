import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config'; // Adjust this import based on your Firebase setup
import { User } from 'firebase/auth';

interface AuthContextType {
  currentUser: User | null;
}

const AuthContext = createContext<AuthContextType>({ currentUser: null });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};