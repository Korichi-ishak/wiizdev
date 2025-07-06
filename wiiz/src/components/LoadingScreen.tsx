import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useThemeContext } from '../hooks/useThemeContext';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.4 + 0.1,
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - particle.speed,
        x: particle.x + Math.sin(particle.y * 0.01) * 0.3,
      })).filter(particle => particle.y > -10).concat(
        prev.length < 20 ? [{
          id: Math.random(),
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + 10,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.4 + 0.1,
        }] : []
      ));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/20 dark:bg-primary/30"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const { theme } = useThemeContext();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 200);
          return 100;
        }
        return prevProgress + Math.random() * 25 + 10; // Faster progress increments
      });
    }, 80); // Faster interval

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(66, 48, 111, 0.05) 0%, transparent 50%, rgba(26, 19, 48, 0.05) 100%)",
            "linear-gradient(135deg, rgba(26, 19, 48, 0.05) 0%, transparent 50%, rgba(66, 48, 111, 0.05) 100%)",
            "linear-gradient(225deg, rgba(66, 48, 111, 0.05) 0%, transparent 50%, rgba(26, 19, 48, 0.05) 100%)",
            "linear-gradient(315deg, rgba(26, 19, 48, 0.05) 0%, transparent 50%, rgba(66, 48, 111, 0.05) 100%)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-24 h-24 border-2 border-primary/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-32 left-16 w-16 h-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-12 h-12 border-2 border-secondary/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 text-center">
        {/* Logo/Brand area */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-[250px] h-[250px] mx-auto mb-4 flex items-center justify-center">
            <img 
              src={theme === 'dark' 
                ? 'https://storage.googleapis.com/wiiz/fordarkmode.svg'
                : 'https://storage.googleapis.com/wiiz/Logo.svg'
              }
              alt="Wiiz Logo" 
              className="w-[250px] h-[250px]"
            />
          </div>
        </motion.div>

        {/* Loading animation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <div className="relative">
            <motion.div
              className="w-12 h-12 mx-auto border-3 border-primary/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute inset-0 border-3 border-transparent border-t-primary rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Text content */}
        <motion.h1
          className="text-2xl font-bold text-gray-800 dark:text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Loading Experience
        </motion.h1>

        {/* Progress bar */}
        <motion.div
          className="w-80 max-w-sm mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full bg-white rounded-full shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          
          <motion.p
            className="mt-4 text-sm text-gray-700 dark:text-gray-300 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {Math.round(progress)}% Complete
          </motion.p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="mt-6 text-sm text-gray-600 dark:text-gray-400 max-w-xs mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Preparing your digital experience...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;