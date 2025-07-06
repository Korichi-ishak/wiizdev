import React from 'react';
import { useThemeContext } from '../hooks/useThemeContext';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  const { theme } = useThemeContext();
  
  const logoSrc = theme === 'dark' 
    ? 'https://storage.googleapis.com/wiiz/fordarkmode.svg'
    : 'https://storage.googleapis.com/wiiz/Logo.svg'


  return (
    <img 
      src={logoSrc} 
      alt="Wiiz Dev Logo" 
      className={className}
    />
  );
};

export default Logo;
