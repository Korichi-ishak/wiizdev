import React from 'react';
import { useThemeContext } from '../hooks/useThemeContext';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-8 h-8" }) => {
  const { theme } = useThemeContext();
  
  const logoSrc = theme === 'dark' 
    ? 'https://storage.googleapis.com/wiiz/Logo.svg'
    : 'https://storage.googleapis.com/wiiz/fordarkmode.svg'


  return (
    <img 
      src={logoSrc} 
      alt="Wiiz Dev Logo" 
      className={className}
    />
  );
};

export default Logo;
