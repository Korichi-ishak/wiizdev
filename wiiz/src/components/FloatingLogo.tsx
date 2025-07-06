import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

interface FloatingLogoProps {
  onLogoClick?: () => void;
}

const FloatingLogo: React.FC<FloatingLogoProps> = ({ onLogoClick }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    if (onLogoClick) {
      onLogoClick();
    }
  };

  return (
    <motion.div 
      className="fixed top-8 left-8 z-50"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.button
        onClick={scrollToTop}
        className="transition-all duration-300"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Go to top"
      >
        <Logo className="w-20 h-20" />
      </motion.button>
    </motion.div>
  );
};

export default FloatingLogo;