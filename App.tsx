import React, { useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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

const ForceHomeRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      if (location.pathname === '') {
        navigate('/', { replace: true });
      }
      initialized.current = true;
    }
  }, [navigate, location.pathname]);

  return null;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Wrapper component to handle Navbar and Footer visibility
// Fix: Explicitly typed as React.FC with children to resolve TypeScript error where 'children' was reported as missing when passed as JSX nested elements.
const LayoutWrapper: React.FC<{ children: React.ReactNode; hideNav?: boolean }> = ({ children, hideNav = false }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {!hideNav && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!hideNav && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AdminProvider>
          <Router>
            <ForceHomeRedirect />
            <ScrollToTop />
            <Routes>
              {/* Landing Page without Navbar/Footer */}
              <Route path="/" element={<LandingSelection />} />
              
              {/* Main App Routes with Navbar/Footer */}
              <Route path="/home" element={<LayoutWrapper><Home /></LayoutWrapper>} />
              <Route path="/auth" element={<LayoutWrapper><Auth /></LayoutWrapper>} />
              <Route path="/about" element={<LayoutWrapper><About /></LayoutWrapper>} />
              <Route path="/activities" element={<LayoutWrapper><Activities /></LayoutWrapper>} />
              <Route path="/events" element={<LayoutWrapper><Events /></LayoutWrapper>} />
              <Route path="/members" element={<LayoutWrapper><Members /></LayoutWrapper>} />
              <Route path="/achievements" element={<LayoutWrapper><Achievements /></LayoutWrapper>} />
              <Route path="/resources" element={<LayoutWrapper><Resources /></LayoutWrapper>} />
              <Route path="/gallery" element={<LayoutWrapper><Gallery /></LayoutWrapper>} />
              <Route path="/contact" element={<LayoutWrapper><Contact /></LayoutWrapper>} />
              <Route path="/president" element={<LayoutWrapper><PresidentSector /></LayoutWrapper>} />
            </Routes>
          </Router>
        </AdminProvider>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;