import { motion } from 'framer-motion';
import { HeroParallaxDemo } from '../components/HeroParallaxDemo';
import { Boxes } from '../components/ui/background-boxes';
import { InteractiveProjectShowcase } from '../components/ui/interactive-project-showcase';
import { DemoOne } from '../components/ui/demo';
import React, { useState, useEffect } from 'react';
import { techStackApi, type TechStack } from '../services/api';

const Home: React.FC = () => {
  const [techStack, setTechStack] = useState<TechStack[]>([]);
  const [techStackLoading, setTechStackLoading] = useState(true);

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
                About Our Agency
              </motion.span>
              
              <motion.h2 
                className="text-4xl md:text-6xl font-bold text-secondary dark:text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Building Digital
                <span className="block text-primary">Experiences</span>
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                We are a forward-thinking digital agency dedicated to transforming ideas into 
                powerful digital solutions that drive real results.
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
                    Our Mission
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Our team combines technical expertise with creative vision to deliver projects that not only 
                    look stunning but also perform flawlessly. We believe in the power of technology to solve 
                    real-world problems and create meaningful connections between brands and their audiences.
                  </p>
                </div>

                <div className="bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
                  <h3 className="text-2xl font-bold text-secondary dark:text-white mb-4">
                    Our Approach
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    From startups to established enterprises, we partner with businesses of all sizes to bring 
                    their digital ambitions to life. Our approach is collaborative, transparent, and focused on 
                    delivering measurable results that exceed expectations.
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
                    Innovation First
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    At our core, we're problem solvers and innovators. We stay ahead of the curve with the latest 
                    technologies and best practices, ensuring that every project we deliver is built for the future.
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
                  Ready to Transform Your Ideas?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  When you work with us, you're not just getting a service provider – you're gaining a partner 
                  committed to your success.
                </p>
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Let's Build Together
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 bg-white dark:bg-secondary-900 py-20">
        <div className="container mx-auto px-4">
          <InteractiveProjectShowcase />
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
              Our Technology Arsenal
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-bold text-secondary dark:text-white mb-8">
              Tech
              <span className="block text-primary">Stack</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore the cutting-edge technologies and tools we use to build exceptional digital experiences.
            </p>
          </motion.div>

          {/* Tech Stack Grid */}
          {techStackLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
          ) : techStack.length > 0 ? (
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech._id}
                  className="group relative text-center p-6 bg-gray-50 dark:bg-secondary-800 rounded-xl hover:bg-gray-100 dark:hover:bg-secondary-700 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors overflow-hidden"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
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
                              // Fallback to icon text if image fails to load
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
                  <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                    {tech.category}
                  </p>
                  
                  {/* Hover tooltip */}
                  {tech.description && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-secondary dark:bg-white text-white dark:text-secondary text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10 max-w-xs">
                      {tech.description.length > 60 ? `${tech.description.substring(0, 60)}...` : tech.description}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-secondary dark:border-t-white"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
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
                View Our Projects
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
              <h2 className="text-5xl md:text-7xl font-bold text-secondary dark:text-white mb-6">
                Start Your
                <span className="block text-primary italic">Project Today</span>
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-secondary/60 dark:text-secondary-300 max-w-2xl mx-auto">
                Ready to bring your vision to life? Let's discuss your project and explore how we can help you achieve your goals.
              </p>
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
                      href="mailto:ihyaet@gmail.com"
                      className="block group"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-1 h-12 bg-primary group-hover:h-16 transition-all duration-300" />
                        <div>
                          <p className="text-sm text-secondary/60 dark:text-secondary-400 uppercase tracking-wider">
                            Email
                          </p>
                          <p className="text-lg font-semibold text-secondary dark:text-white group-hover:text-primary transition-colors">
                            ihyaet@gmail.com
                          </p>
                        </div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="tel:+15551234567"
                      className="block group"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-1 h-12 bg-secondary group-hover:h-16 transition-all duration-300" />
                        <div>
                          <p className="text-sm text-secondary/60 dark:text-secondary-400 uppercase tracking-wider">
                            Phone
                          </p>
                          <p className="text-lg font-semibold text-secondary dark:text-white group-hover:text-primary transition-colors">
                            +1 (555) 123-4567
                          </p>
                        </div>
                      </div>
                    </motion.a>

                    <div className="flex items-center space-x-4">
                      <div className="w-1 h-12 bg-primary/50" />
                      <div>
                        <p className="text-sm text-secondary/60 dark:text-secondary-400 uppercase tracking-wider">
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
                  <div className="space-y-2 text-secondary/70 dark:text-secondary-300">
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
                  <div className="text-secondary/70 dark:text-secondary-300 leading-relaxed">
                    <p>San Francisco, CA</p>
                    <p>United States</p>
                    <p className="text-sm mt-2 text-secondary/50 dark:text-secondary-400">
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
                      Get Started
                    </h3>
                    <p className="text-secondary/70 dark:text-secondary-300">
                      Tell us about your project and we'll get back to you within 24 hours.
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
                          placeholder="+1 (555) 123-4567"
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
                      <p className="text-xs text-secondary/60 dark:text-secondary-400">
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
                        Send Message
                      </motion.button>
                      <p className="text-center text-sm text-secondary/60 dark:text-secondary-400 mt-3">
                        We'll respond within 24 hours
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
    </div>
  );
};

export default Home;
