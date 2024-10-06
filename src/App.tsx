import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateMemorialPage from './pages/CreateMemorialPage';
import OnlineMemorialPage from './pages/OnlineMemorialPage';
import LifeStoryPage from './pages/LifeStoryPage';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create-memorial" element={<CreateMemorialPage />} />
          <Route path="/online-memorial" element={<OnlineMemorialPage />} />
          <Route path="/life-story" element={<LifeStoryPage />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;