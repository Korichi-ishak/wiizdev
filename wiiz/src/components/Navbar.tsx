import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useThemeContext } from '../hooks/useThemeContext';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useThemeContext();
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  
  const navItems = useMemo(() => [
    { name: 'Home', id: 'home', path: '/' },
    { name: 'About', id: 'about', path: '/#about' },
    { name: 'Projects', id: 'projects', path: '/all-projects' },
    { name: 'Tech Stack', id: 'tech-stack', path: '/#tech-stack' },
    { name: 'Contact', id: 'contact', path: '/#contact' }
  ], []);

  const handleNavigation = (item: { name: string; id: string; path: string }) => {
    if (item.path.startsWith('/#')) {
      // Navigate to home page with section
      if (isHomePage) {
        // Already on home page, just scroll
        const sectionId = item.path.substring(2);
        scrollToSection(sectionId);
      } else {
        // Navigate to home page first, then scroll after navigation
        navigate('/');
        setTimeout(() => {
          const sectionId = item.path.substring(2);
          scrollToSection(sectionId);
        }, 100);
      }
    } else {
      // Direct navigation
      navigate(item.path);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const getActiveItem = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/all-projects') return 'projects';
    if (location.pathname === '/about') return 'about';
    if (location.pathname === '/contact') return 'contact';
    if (location.pathname === '/tech-stack') return 'tech-stack';
    return activeSection;
  };

  const isActive = (sectionId: string) => {
    return getActiveItem() === sectionId;
  };

  useEffect(() => {
    // Only set up scroll listener on home page
    if (!isHomePage) return;

    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial active section

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage, navItems]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-8">
      <motion.nav 
        className="w-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="bg-secondary/95 dark:bg-white/95 backdrop-blur-md rounded-full px-6 py-3 border border-white/10 dark:border-secondary/10 shadow-lg">
          <div className="flex items-center space-x-4">
            {/* Navigation Items */}
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full ${
                    isActive(item.id)
                      ? 'text-white dark:text-secondary bg-primary/20'
                      : 'text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-secondary hover:bg-white/10 dark:hover:bg-secondary/10'
                  }`}
                >
                  {item.name}
                  {isActive(item.id) && (
                    <motion.div
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary rounded-full"
                      layoutId="navbar-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
            
            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white/10 dark:bg-secondary/10 hover:bg-white/20 dark:hover:bg-secondary/20 text-white dark:text-secondary transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
