import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import InternalLayout from './components/InternalLayout';
import MemorialCreationForm from './components/MemorialCreationForm';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<InternalLayout />}>
            <Route path="/create-memorial" element={<MemorialCreationForm />} />
            {/* Add more routes for internal pages here */}
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;