
import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Members from './pages/Members';
import Achievements from './pages/Achievements';
import Resources from './pages/Resources';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Activities from './pages/Activities';
import PresidentSector from './pages/PresidentSector';
import Auth from './pages/Auth';
import LandingSelection from './pages/LandingSelection';
import Dashboard from './pages/Dashboard';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const AppRoutes = () => {
  const [hasEntered, setHasEntered] = useState(() => {
    try {
      return localStorage.getItem('pc_has_entered') === 'true';
    } catch (e) {
      return false;
    }
  });

  const handleEnter = () => {
    setHasEntered(true);
    try {
      localStorage.setItem('pc_has_entered', 'true');
    } catch (e) {}
  };

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route 
          path="/" 
          element={hasEntered ? <LayoutWrapper><Home /></LayoutWrapper> : <LandingSelection onEnter={handleEnter} />} 
        />
        <Route path="/home" element={<LayoutWrapper><Home /></LayoutWrapper>} />
        <Route path="/auth" element={<LayoutWrapper><Auth /></LayoutWrapper>} />
        <Route path="/dashboard" element={<LayoutWrapper><Dashboard /></LayoutWrapper>} />
        <Route path="/about" element={<LayoutWrapper><About /></LayoutWrapper>} />
        <Route path="/activities" element={<LayoutWrapper><Activities /></LayoutWrapper>} />
        <Route path="/events" element={<LayoutWrapper><Events /></LayoutWrapper>} />
        <Route path="/members" element={<LayoutWrapper><Members /></LayoutWrapper>} />
        <Route path="/achievements" element={<LayoutWrapper><Achievements /></LayoutWrapper>} />
        <Route path="/resources" element={<LayoutWrapper><Resources /></LayoutWrapper>} />
        <Route path="/gallery" element={<LayoutWrapper><Gallery /></LayoutWrapper>} />
        <Route path="/contact" element={<LayoutWrapper><Contact /></LayoutWrapper>} />
        <Route path="/president" element={<LayoutWrapper><PresidentSector /></LayoutWrapper>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AdminProvider>
          <Router>
            <AppRoutes />
          </Router>
        </AdminProvider>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;
