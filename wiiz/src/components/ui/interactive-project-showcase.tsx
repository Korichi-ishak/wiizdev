import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import { type Project as APIProject } from '../../services/api';


const ProjectCard = ({ project, index }: { project: APIProject; index: number }) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative bg-white dark:bg-secondary-800 rounded-3xl overflow-hidden border border-primary/20 dark:border-secondary-600 hover:border-primary/40 dark:hover:border-primary/30 transition-all duration-300 h-[480px] min-w-0 flex flex-col hover:shadow-lg hover:shadow-primary/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 dark:to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      

      {/* Image Container */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        {!isImgLoaded && !hasError && (
          <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 w-full h-full">
            <span className="text-xs text-gray-600 dark:text-gray-400">Loading...</span>
          </div>
        )}
        <motion.img
          src={project.thumbnail}
          alt={project.title}
          onLoad={() => setIsImgLoaded(true)}
          onError={() => {
            setIsImgLoaded(false);
            setHasError(true);
          }}
          className={`w-full h-full object-cover ${(!isImgLoaded || hasError) ? "hidden" : ""}`}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {hasError && (
          <div className="flex items-center justify-center bg-red-200 dark:bg-red-800 w-full h-full">
            <span className="text-sm text-red-600 dark:text-red-300">Failed to load image</span>
          </div>
        )}
        
        {/* Minimal overlay */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300" />
        
        {/* Action buttons */}
        <motion.div
          className="absolute top-4 right-4 flex space-x-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-secondary hover:text-primary hover:bg-white transition-colors shadow-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow min-h-0">
        <div className="flex justify-between items-center mb-3 flex-shrink-0">
          <span className="text-xs font-medium text-primary dark:text-primary bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full truncate max-w-[60%]">
            {project.category}
          </span>
          <span className="text-xs text-secondary/60 dark:text-secondary-300 font-mono flex-shrink-0">
            {new Date(project.createdAt).getFullYear()}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-secondary dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary transition-colors line-clamp-2 flex-shrink-0">
          {project.title}
        </h3>
        
        <div className="flex-grow min-h-0 mb-3">
          <p className="text-secondary/70 dark:text-secondary-200 text-sm leading-relaxed h-full overflow-y-auto">
            {project.description}
          </p>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3 flex-shrink-0 max-h-16 overflow-y-auto">
          {project.techStack.map((tag, tagIndex) => (
            <motion.span
              key={tag}
              className="text-xs px-2 py-1 bg-secondary/5 dark:bg-secondary-700 text-secondary/80 dark:text-secondary-300 rounded-md font-medium flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + tagIndex * 0.05 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        
        {/* Minimal interaction indicator */}
        <motion.div
          className="flex items-center text-sm text-secondary/60 dark:text-secondary-400 group-hover:text-primary dark:group-hover:text-primary transition-colors flex-shrink-0"
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <span className="font-medium">View Project</span>
          <svg className="w-4 h-4 ml-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const InteractiveProjectShowcase = () => {
  const { projects: apiProjects, loading } = useProjects();
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState<APIProject[]>([]);
  

  // Get unique categories
  const categories = React.useMemo(() => {
    const uniqueCategories = Array.from(new Set(apiProjects.map(p => p.category)));
    return ["All", ...uniqueCategories];
  }, [apiProjects]);

  React.useEffect(() => {
    handleCategoryChange(activeCategory);
  }, [apiProjects, activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const filtered = category === "All" 
      ? apiProjects 
      : apiProjects.filter(project => project.category === category);
    setFilteredProjects(filtered);
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header with Storytelling */}
      <div className="text-center mb-16">
        <motion.span 
          className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Stories of Transformation
        </motion.span>
        
        <motion.h2 
          className="text-4xl md:text-6xl font-bold text-secondary dark:text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Every Project Tells
          <span className="block text-primary">A Success Story</span>
        </motion.h2>
        
        <motion.div 
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Behind every pixel and line of code lies a vision brought to life. These aren't just projects – they're digital transformations that solved real problems, drove tangible growth, and exceeded expectations.
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            From startups finding their digital voice to enterprises revolutionizing their processes, each story represents a partnership that changed everything.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-white dark:bg-secondary-800 text-gray-700 dark:text-gray-300 hover:bg-primary/10 border border-gray-200 dark:border-secondary-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 auto-rows-fr"
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, staggerChildren: 0.05 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Bottom CTA */}
      <motion.div 
        className="text-center mt-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <Link to="/all-projects">
          <motion.button
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default InteractiveProjectShowcase;