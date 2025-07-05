import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";

import { GooeyText } from "./gooey-text-morphing";
import { SplashCursor } from "./splash-cursor";

// Floating particles component
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
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setParticles(newParticles);
  }, []);

  useAnimationFrame(() => {
    setParticles(prev => prev.map(particle => ({
      ...particle,
      y: particle.y - particle.speed,
      x: particle.x + Math.sin(particle.y * 0.01) * 0.5,
    })).filter(particle => particle.y > -10).concat(
      particles.length < 50 ? [{
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 10,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.3 + 0.1,
      }] : []
    ));
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/20 dark:bg-white/10"
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

// Geometric shapes component
const GeometricShapes = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [360, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        style={{ rotate: rotate1, scale }}
        className="absolute top-20 right-20 w-32 h-32 border-2 border-primary/20 rounded-full"
      />
      <motion.div
        style={{ rotate: rotate2 }}
        className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg"
      />
      <motion.div
        style={{ rotate: rotate1 }}
        className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-secondary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        style={{ rotate: rotate2 }}
        className="absolute bottom-20 right-1/4 w-20 h-20 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full"
      />
    </div>
  );
};

export const HeroParallax = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Multiple parallax layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const midgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1]);

  // Mouse movement effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX - innerWidth / 2) / 50);
    mouseY.set((clientY - innerHeight / 2) / 50);
  };

  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  return (
    <div
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Fluid background effect */}
      <SplashCursor />
      
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900"
        style={{ y: backgroundY }}
      />
      
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(99, 102, 241, 0.05) 0%, transparent 50%, rgba(168, 85, 247, 0.05) 100%)",
            "linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, transparent 50%, rgba(99, 102, 241, 0.05) 100%)",
            "linear-gradient(225deg, rgba(99, 102, 241, 0.05) 0%, transparent 50%, rgba(168, 85, 247, 0.05) 100%)",
            "linear-gradient(315deg, rgba(168, 85, 247, 0.05) 0%, transparent 50%, rgba(99, 102, 241, 0.05) 100%)",
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating particles */}
      <motion.div style={{ y: midgroundY }}>
        <FloatingParticles />
      </motion.div>

      {/* Geometric shapes */}
      <motion.div style={{ y: foregroundY }}>
        <GeometricShapes scrollYProgress={scrollYProgress} />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex items-center justify-center h-full"
        style={{
          opacity,
          scale,
          x: mouseXSpring,
          y: mouseYSpring,
        }}
      >
        <div className="text-center max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 dark:bg-white/10 text-primary dark:text-white rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-primary/20 dark:border-white/20">
              🚀 Digital Brilliance, Delivered
            </span>
          </motion.div>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
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
              className="h-[120px] md:h-[180px] flex items-center justify-center"
              textClassName="font-bold bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent text-5xl md:text-8xl leading-tight"
            />
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            We help ambitious brands grow with tailor-made websites, apps, and software that drive real results. Your vision, our expertise – let's build something extraordinary together.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/25 min-w-[200px]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get Your Free Proposal</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </motion.button>

            <motion.button
              className="group px-8 py-4 bg-white/10 dark:bg-black/10 backdrop-blur-sm border-2 border-white/20 dark:border-white/10 text-secondary dark:text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/20 dark:hover:bg-white/5 hover:border-primary/30 dark:hover:border-primary/30 min-w-[200px]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              See Our Success Stories
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-primary/30 dark:border-white/30 rounded-full flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="w-1 h-3 bg-primary dark:bg-white rounded-full mt-2"
                animate={{ scaleY: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

    </div>
  );
};

export default HeroParallax;