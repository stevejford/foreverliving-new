import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage2';
import CreateAccountPage from './pages/CreateAccountPage';
import CreateMemorialPage from './pages/CreateMemorialPage';
import OnlineMemorialPage from './pages/OnlineMemorialPage';
import BiographyPage from './pages/BiographyPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/create-account" element={<CreateAccountPage />} />
              <Route 
                path="/create-memorial" 
                element={
                  <ProtectedRoute>
                    <CreateMemorialPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/online-memorial" 
                element={
                  <ProtectedRoute>
                    <OnlineMemorialPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/biography" 
                element={
                  <ProtectedRoute>
                    <BiographyPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;