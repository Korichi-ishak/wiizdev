import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Eye } from 'lucide-react';
import { HeroParallaxDemo } from '../components/HeroParallaxDemo';
import { Boxes } from '../components/ui/background-boxes';
import { DemoOne } from '../components/ui/demo';
import Testimonials from '../components/ui/testimonials';
import SEO from '../components/SEO';
import React, { useState, useEffect } from 'react';
import { techStackApi, type TechStack } from '../services/api';
import { useProjects } from '../hooks/useProjects';

// Tech Stack Carousel Component
const TechStackCarousel: React.FC<{ techStack: TechStack[] }> = ({ techStack }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Triple the techStack array for seamless infinite scroll
  const extendedTechStack = [...techStack, ...techStack, ...techStack];
  const cardWidth = 200; // Width + gap
  const totalWidth = techStack.length * cardWidth;

  return (
    <motion.div
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <motion.div
          className="flex gap-6"
          animate={{
            x: isHovered ? undefined : [-totalWidth, 0]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: totalWidth / 60, // Faster speed - doubled from /30 to /60
              ease: "linear",
            }
          }}
          style={{
            width: `${extendedTechStack.length * cardWidth}px`,
            willChange: "transform" // Optimize for smooth animations
          }}
        >
          {extendedTechStack.map((tech, index) => (
            <motion.div
              key={`${tech._id}-${index}`}
              className="group relative text-center p-6 bg-gray-50 dark:bg-secondary-800 rounded-xl hover:bg-gray-100 dark:hover:bg-secondary-700 transition-all duration-200 hover:shadow-lg hover:shadow-primary/10 flex-shrink-0 w-48"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (index % techStack.length) * 0.02 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -8 }}
              style={{ willChange: "transform" }}
            >
              <motion.div
                className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors overflow-hidden"
                whileHover={{ scale: 1.15, rotate: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ willChange: "transform" }}
              >
                {(() => {
                  const imageUrl = tech.logoUrl || tech.icon;
                  const isImageUrl = imageUrl && (imageUrl.startsWith('http') || imageUrl.startsWith('/'));
                  
                  if (isImageUrl) {
                    return (
                      <img 
                        src={imageUrl} 
                        alt={`${tech.name} logo`}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                          if (nextSibling) {
                            nextSibling.style.display = 'block';
                          }
                        }}
                      />
                    );
                  }
                  return null;
                })()}
                <span 
                  className={`text-primary text-2xl ${(() => {
                    const imageUrl = tech.logoUrl || tech.icon;
                    const isImageUrl = imageUrl && (imageUrl.startsWith('http') || imageUrl.startsWith('/'));
                    return isImageUrl ? 'hidden' : 'block';
                  })()}`}
                >
                  {tech.icon && !tech.icon.startsWith('http') && !tech.icon.startsWith('/') ? tech.icon : '⚡'}
                </span>
              </motion.div>
              <motion.h3 
                className="text-lg font-semibold text-secondary dark:text-white mb-2 group-hover:text-primary transition-colors"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {tech.name}
              </motion.h3>
              <motion.p 
                className="text-sm text-gray-600 dark:text-gray-300 capitalize"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {tech.category}
              </motion.p>
              
              {/* Hover tooltip */}
              {tech.description && (
                <motion.div 
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-secondary dark:bg-white text-white dark:text-secondary text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10 max-w-xs"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {tech.description.length > 60 ? `${tech.description.substring(0, 60)}...` : tech.description}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-secondary dark:border-t-white"></div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const Home: React.FC = () => {
  const [techStack, setTechStack] = useState<TechStack[]>([]);
  const [techStackLoading, setTechStackLoading] = useState(true);
  const { projects, loading } = useProjects(4);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    const fetchTechStack = async () => {
      try {
        const data = await techStackApi.getAll(); // Only visible items by default
        setTechStack(data);
      } catch (error) {
        console.error('Error fetching tech stack:', error);
      } finally {
        setTechStackLoading(false);
      }
    };

    fetchTechStack();
  }, []);

  return (
    <div className="w-full">
      <SEO 
        title="Wiiz Dev - Développement Web & Mobile | Solutions Digitales Innovantes"
        description="Transformez votre vision en réalité digitale avec Wiiz Dev. Développement d'applications web et mobile sur mesure, e-commerce, et solutions innovantes. Contact gratuit."
        keywords="développement web, application mobile, React, Node.js, MongoDB, e-commerce, site web, développeur, solutions digitales, agence web"
        url="https://wiizdev.com"
      />
      {/* Custom CSS for advanced animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(-15px) rotate(0.5deg); }
        }
        
        @keyframes drift {
          0% { transform: translateX(0px); }
          50% { transform: translateX(20px); }
          100% { transform: translateX(0px); }
        }
        
        .float-animation {
          animation: float 8s ease-in-out infinite;
        }
        
        .drift-animation {
          animation: drift 12s ease-in-out infinite;
        }
      `}</style>
      {/* Hero Section */}
      <section id="home" className="relative">
        <HeroParallaxDemo />
      </section>
      
      {/* About Section */}
      <section id="about" className="relative overflow-hidden bg-gray-50 dark:bg-secondary-900 py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gray-50 dark:bg-secondary-900 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
        
        <div className="container mx-auto px-4 relative z-20">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Header */}
            <div className="text-center mb-16">
              <motion.span 
                className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
Why Choose Wiiz Dev
              </motion.span>
              
              <motion.h2 
                className="text-4xl md:text-6xl font-bold text-secondary dark:text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Your Digital Success
                <span className="block text-primary">Starts Here</span>
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                We're not just coders – we're your digital partners. Every project we deliver transforms businesses, drives growth, and creates lasting impact for ambitious brands.
              </motion.p>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
                  <h3 className="text-2xl font-bold text-secondary dark:text-white mb-4">
                    Our Promise
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We deliver more than websites and apps – we deliver competitive advantages. Our team combines cutting-edge technology with strategic thinking to create digital solutions that don't just look incredible, but drive measurable business growth.
                  </p>
                </div>

                <div className="bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
                  <h3 className="text-2xl font-bold text-secondary dark:text-white mb-4">
                    Our Partnership
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    When you work with Wiiz Dev, you gain a strategic partner invested in your success. We listen, understand your goals, and craft solutions that align with your vision – delivering results that don't just meet expectations, but shatter them.
                  </p>
                </div>
              </motion.div>

              {/* Right Content */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
                  <h3 className="text-2xl font-bold text-secondary dark:text-white mb-4">
                    Future-Proofed
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Your investment deserves longevity. We build with tomorrow's technologies today, ensuring your digital presence remains competitive, scalable, and ready for whatever comes next in your industry.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    className="bg-primary/10 backdrop-blur-sm rounded-xl p-6 text-center border border-primary/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl font-bold text-primary mb-2">100+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Projects Delivered</div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-secondary/10 backdrop-blur-sm rounded-xl p-6 text-center border border-secondary/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl font-bold text-secondary dark:text-white mb-2">5+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Years Experience</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Bottom CTA */}
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-secondary dark:text-white mb-4">
                  Ready to Accelerate Your Growth?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Tell us your vision, and we'll build the roadmap to transform it into reality. Your success is our mission.
                </p>
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Transformation
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section - Enhanced Design */}
      <section id="projects" className="relative z-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-secondary-900 dark:to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Our Latest Work
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-8">
              Featured Projects
            </h2>
            <p className="text-xl text-secondary/70 dark:text-secondary-200 max-w-3xl mx-auto mb-8">
              Discover our latest innovative digital solutions and creative projects that showcase our expertise.
            </p>
          </motion.div>

          {/* Projects Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="group bg-white dark:bg-secondary-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-secondary-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="aspect-video bg-gray-200 dark:bg-secondary-700 animate-pulse" />
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 dark:bg-secondary-700 rounded animate-pulse mb-3" />
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded animate-pulse" />
                      <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded animate-pulse w-3/4" />
                    </div>
                    <div className="flex gap-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-6 bg-gray-200 dark:bg-secondary-700 rounded-full animate-pulse w-16" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {projects.slice(0, 4).map((project, index) => (
                <motion.div
                  key={project._id}
                  className="group bg-white dark:bg-secondary-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-secondary-700 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  viewport={{ once: true }}
                >
                  {/* Enhanced Image Container */}
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-purple-600/10 relative overflow-hidden">
                    <img 
                      src={project.thumbnail || '/placeholder.jpg'} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm font-medium shadow-lg">
                        {project.category}
                      </span>
                    </div>
                    
                    {/* Enhanced hover overlay with actions */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <motion.div 
                        className="bg-white/90 dark:bg-secondary-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="h-4 w-4 text-primary" />
                      </motion.div>
                    </div>
                    
                    {/* Live indicator */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="flex items-center gap-2 bg-green-500/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        Live
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-secondary dark:text-white group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        {new Date(project.createdAt).getFullYear()}
                      </div>
                    </div>
                    
                    <p className="text-secondary/70 dark:text-secondary-200 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Enhanced Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 3).map((tech, techIndex) => (
                        <motion.span 
                          key={tech} 
                          className="text-xs px-3 py-1 bg-gradient-to-r from-primary/10 to-purple-600/10 text-primary border border-primary/20 rounded-full hover:bg-primary/20 transition-all duration-200 cursor-pointer"
                          whileHover={{ scale: 1.05, y: -2 }}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                          viewport={{ once: true }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-secondary-700 text-secondary/60 dark:text-secondary-400 rounded-full border border-gray-200 dark:border-secondary-600">
                          +{project.techStack.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Enhanced CTA */}
                    <div className="flex items-center justify-between">
                      <motion.a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-all duration-200 group/link"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Project 
                        <ExternalLink className="ml-2 h-4 w-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                      </motion.a>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <motion.div 
                          className="flex items-center gap-1 hover:text-primary transition-colors duration-200 cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Eye className="h-3 w-3" />
                          <span>Live Demo</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* View All Projects CTA */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/all-projects"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
              <motion.div
                className="ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                →
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech-stack" className="relative z-10 bg-white dark:bg-secondary-900 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Battle-Tested Excellence
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-bold text-secondary dark:text-white mb-8">
              Technologies You Can
              <span className="block text-primary">Trust & Rely On</span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                We don't chase trends – we master proven technologies that power the world's most successful applications. Every tool in our arsenal has been battle-tested in real-world scenarios.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Your project deserves stability, performance, and reliability. That's why we choose technologies backed by thriving communities, comprehensive documentation, and enterprise-grade support.
              </p>
            </div>
          </motion.div>

          {/* Tech Stack Carousel */}
          {techStackLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
          ) : techStack.length > 0 ? (
            <TechStackCarousel techStack={techStack} />
          ) : (
            <div className="text-center py-16">
              <motion.div
                className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-gray-400 text-2xl">🔧</span>
              </motion.div>
              <p className="text-gray-500 dark:text-gray-400">
                No technologies found. Check back soon!
              </p>
            </div>
          )}

          {/* View More CTA */}
          {techStack.length > 0 && (
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={() => scrollToSection('projects')}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                See These Technologies in Action
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 bg-white dark:bg-secondary-900 py-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse float-animation" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse drift-animation" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/3 rounded-full blur-2xl animate-pulse float-animation" style={{ animationDelay: '2s' }} />
          
          {/* Geometric Shapes */}
          <div className="absolute top-32 right-1/4 w-2 h-2 bg-primary rotate-45 animate-bounce" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-secondary/50 rotate-45 animate-bounce" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-primary/70 rounded-full animate-ping" style={{ animationDelay: '2.5s' }} />
          
          {/* Floating Lines */}
          <div className="absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" />
          <div className="absolute bottom-1/3 right-0 w-40 h-px bg-gradient-to-l from-transparent via-secondary/20 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(39, 62, 71, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(39, 62, 71, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }} />
          </div>
          
          {/* Floating Particles */}
          <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }} />
          <div className="absolute top-3/4 left-1/6 w-1 h-1 bg-secondary/60 rounded-full animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }} />
          <div className="absolute top-1/3 right-1/5 w-0.5 h-0.5 bg-primary/80 rounded-full animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
          <div className="absolute bottom-1/4 right-1/6 w-1 h-1 bg-secondary/40 rounded-full animate-pulse" style={{ animationDelay: '3s', animationDuration: '3.5s' }} />
          <div className="absolute top-2/5 left-2/3 w-0.5 h-0.5 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '4s', animationDuration: '4.5s' }} />
          
          {/* Gradient Waves */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-pulse" style={{ animationDelay: '1s', animationDuration: '6s' }} />
          <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-secondary/10 to-transparent animate-pulse" style={{ animationDelay: '3s', animationDuration: '7s' }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.span 
                className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Your Growth Starts Here
              </motion.span>
              <h2 className="text-5xl md:text-7xl font-bold text-secondary dark:text-white mb-6">
                Turn Your Vision Into
                <span className="block text-primary italic">Revenue Reality</span>
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <div className="max-w-3xl mx-auto">
                <p className="text-xl text-gray-700 dark:text-gray-200 mb-4">
                  Stop wondering "what if" and start building what works. Every successful digital transformation begins with a single conversation.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Whether you're launching your first app or scaling your enterprise, we'll craft a solution that doesn't just meet your needs – it accelerates your success.
                </p>
              </div>
            </motion.div>

            {/* Contact Content */}
            <div className="grid lg:grid-cols-3 gap-16">
              {/* Left Side - Contact Info */}
              <motion.div
                className="lg:col-span-1 space-y-8 relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Contact Info Background Effects */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute top-10 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-xl animate-pulse float-animation" />
                  <div className="absolute bottom-20 -right-2 w-16 h-16 bg-secondary/10 rounded-full blur-lg animate-pulse drift-animation" style={{ animationDelay: '1.5s' }} />
                  <div className="absolute top-1/2 right-0 w-2 h-32 bg-gradient-to-b from-primary/10 to-transparent blur-sm animate-pulse" style={{ animationDelay: '3s' }} />
                </div>
                {/* Direct Contact */}
                <div>
                  <h3 className="text-2xl font-bold text-secondary dark:text-white mb-8">
                    Get in Touch
                  </h3>
                  <div className="space-y-6">
                    <motion.a
                      href="mailto:contact@wiizdev.com"
                      className="block group"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-1 h-12 bg-primary group-hover:h-16 transition-all duration-300" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Email
                          </p>
                          <p className="text-lg font-semibold text-secondary dark:text-white group-hover:text-primary transition-colors">
                            contact@wiizdev.com
                          </p>
                        </div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="tel:+213 541945025"
                      className="block group"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-1 h-12 bg-secondary group-hover:h-16 transition-all duration-300" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Phone
                          </p>
                          <p className="text-lg font-semibold text-secondary dark:text-white group-hover:text-primary transition-colors">
                            +213 541945025
                          </p>
                        </div>
                      </div>
                    </motion.a>

                    <div className="flex items-center space-x-4">
                      <div className="w-1 h-12 bg-primary/50" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Response Time
                        </p>
                        <p className="text-lg font-semibold text-secondary dark:text-white">
                          Within 24 hours
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div>
                  <h3 className="text-xl font-bold text-secondary dark:text-white mb-6">
                    Business Hours
                  </h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3 className="text-xl font-bold text-secondary dark:text-white mb-4">
                    Location
                  </h3>
                  <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    <p>Annaba</p>
                    <p>Algeria</p>
                    <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                      Remote consultations available worldwide
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Contact Form */}
              <motion.div
                className="lg:col-span-2 relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* Form Background Effects */}
                <div className="absolute inset-0 bg-gray-50 dark:bg-secondary-800 rounded-none">
                  <div className="absolute top-8 right-8 w-32 h-32 bg-primary/3 rounded-full blur-2xl animate-pulse" />
                  <div className="absolute bottom-12 left-8 w-20 h-20 bg-secondary/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
                  <div className="absolute top-1/2 right-1/4 w-1 h-16 bg-gradient-to-b from-primary/20 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
                  <div className="absolute bottom-1/3 left-1/3 w-12 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-pulse" style={{ animationDelay: '3s' }} />
                </div>
                
                <div className="relative z-10 p-8">
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-secondary dark:text-white mb-3">
                      Let's Build Your Success Story
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Share your vision, challenges, and goals. We'll respond within 24 hours with a strategic roadmap to turn your ideas into profitable reality.
                    </p>
                  </div>

                  <form className="space-y-6">
                    {/* Essential Fields */}
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-secondary dark:text-white">
                            Name *
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-white dark:bg-secondary-700 border border-secondary/20 dark:border-secondary-600 rounded-lg transition-colors duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-secondary dark:text-white"
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-secondary dark:text-white">
                            Email *
                          </label>
                          <input
                            type="email"
                            className="w-full px-4 py-3 bg-white dark:bg-secondary-700 border border-secondary/20 dark:border-secondary-600 rounded-lg transition-colors duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-secondary dark:text-white"
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-secondary dark:text-white">
                          Phone (Optional)
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 bg-white dark:bg-secondary-700 border border-secondary/20 dark:border-secondary-600 rounded-lg transition-colors duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-secondary dark:text-white"
                          placeholder="+213 541945025"
                        />
                      </div>
                    </div>

                    {/* Project Type */}
                    <div className="space-y-3">
                      <label htmlFor="service-select" className="block text-sm font-medium text-secondary dark:text-white">
                        Service Needed
                      </label>
                      <select id="service-select" className="w-full px-4 py-3 bg-white dark:bg-secondary-700 border border-secondary/20 dark:border-secondary-600 rounded-lg transition-colors duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-secondary dark:text-white">
                        <option value="">Select a service</option>
                        <option value="web">Web Development</option>
                        <option value="mobile">Mobile App Development</option>
                        <option value="design">UI/UX Design</option>
                        <option value="consulting">Consulting</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Budget */}
                    <div className="space-y-3">
                      <label htmlFor="budget-select" className="block text-sm font-medium text-secondary dark:text-white">
                        Budget Range (Optional)
                      </label>
                      <select id="budget-select" className="w-full px-4 py-3 bg-white dark:bg-secondary-700 border border-secondary/20 dark:border-secondary-600 rounded-lg transition-colors duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-secondary dark:text-white">
                        <option value="">Select budget range</option>
                        <option value="5k">Under $5,000</option>
                        <option value="15k">$5,000 - $15,000</option>
                        <option value="50k">$15,000 - $50,000</option>
                        <option value="100k">$50,000+</option>
                        <option value="discuss">Let's discuss</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-secondary dark:text-white">
                        Project Details *
                      </label>
                      <textarea
                        rows={5}
                        className="w-full px-4 py-3 bg-white dark:bg-secondary-700 border border-secondary/20 dark:border-secondary-600 rounded-lg transition-colors duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none text-secondary dark:text-white"
                        placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                        required
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Please provide as much detail as possible to help us understand your needs.
                      </p>
                    </div>

                    {/* Submit Section */}
                    <div className="pt-6">
                      <motion.button
                        type="submit"
                        className="w-full bg-primary hover:bg-secondary text-white py-4 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Start My Digital Transformation
                      </motion.button>
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                        Strategic consultation & project roadmap within 24 hours
                      </p>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Interactive CTA Section */}
      <section className="relative z-10">
        <DemoOne />
      </section>

      {/* Testimonials Section */}
      <Testimonials />

    </div>
  );
};

export default Home;
