import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { LoadingProvider, useLoadingContext } from './contexts/LoadingContext';
import { GooeyText } from './components/ui/gooey-text-morphing';
import Layout from './layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import AllProjects from './pages/AllProjects';
import TechStack from './pages/TechStack';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProjects from './pages/admin/Projects';
import AdminTechStack from './pages/admin/TechStack';
import AdminEmails from './pages/admin/Emails';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingScreen from './components/LoadingScreen';

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isGooeyTextReady, setIsGooeyTextReady } = useLoadingContext();

  const [loadingTimerComplete, setLoadingTimerComplete] = useState(false);

  const handleLoadingComplete = () => {
    setLoadingTimerComplete(true);
  };

  const handleGooeyTextReady = () => {
    setIsGooeyTextReady(true);
  };

  useEffect(() => {
    // If timer is complete, wait a bit for gooey text or use fallback
    if (loadingTimerComplete) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, isGooeyTextReady ? 0 : 300); // Wait 300ms max for gooey text
      
      return () => clearTimeout(timeout);
    }
  }, [loadingTimerComplete, isGooeyTextReady]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <>
          <LoadingScreen key="loading" onLoadingComplete={handleLoadingComplete} />
          {/* Hidden preloader for gooey text */}
          <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
            <GooeyText
              texts={[
                "Growth-Driven",
                "Future-Ready",
                "Results-Focused",
                "Brand-Powered",
                "Success-Built"
              ]}
              morphTime={1.5}
              cooldownTime={1}
              onReady={handleGooeyTextReady}
            />
          </div>
        </>
      ) : (
        <Router key="app">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="projects" element={<Projects />} />
              <Route path="all-projects" element={<AllProjects />} />
              <Route path="tech-stack" element={<TechStack />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/projects" element={<ProtectedRoute><AdminProjects /></ProtectedRoute>} />
            <Route path="/admin/techstack" element={<ProtectedRoute><AdminTechStack /></ProtectedRoute>} />
            <Route path="/admin/emails" element={<ProtectedRoute><AdminEmails /></ProtectedRoute>} />
          </Routes>
        </Router>
      )}
    </AnimatePresence>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <LoadingProvider>
            <AppContent />
          </LoadingProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
