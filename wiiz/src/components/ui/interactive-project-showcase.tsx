import React, { useState, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useProjects } from '../../hooks/useProjects';
import { type Project as APIProject } from '../../services/api';

interface Project extends APIProject {
  tags?: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  year?: string;
}

const defaultProjects: Partial<Project>[] = [
  {
    id: 1,
    title: "E-Commerce Revolution",
    category: "Web Development",
    description: "A cutting-edge e-commerce platform with AI-powered recommendations and seamless checkout experience.",
    tags: ["React", "Node.js", "AI/ML", "Stripe"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    year: "2024"
  },
  {
    id: 2,
    title: "FinTech Mobile App",
    category: "Mobile Development",
    description: "Revolutionary banking app with biometric security and real-time financial insights.",
    tags: ["React Native", "Python", "Blockchain", "Security"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    year: "2024"
  },
  {
    id: 3,
    title: "AI Dashboard Analytics",
    category: "Data Visualization",
    description: "Intelligent dashboard providing real-time analytics with machine learning insights.",
    tags: ["Vue.js", "D3.js", "TensorFlow", "AWS"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    year: "2024"
  },
  {
    id: 4,
    title: "Healthcare Portal",
    category: "Web Development",
    description: "Comprehensive healthcare management system with telemedicine capabilities.",
    tags: ["Angular", "Spring Boot", "MongoDB", "WebRTC"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    year: "2023"
  },
  {
    id: 5,
    title: "Real Estate VR Platform",
    category: "VR/AR",
    description: "Immersive virtual reality platform for property viewing and interior design.",
    tags: ["Three.js", "WebXR", "React", "Firebase"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    year: "2024"
  },
  {
    id: 6,
    title: "Smart IoT Dashboard",
    category: "IoT",
    description: "Comprehensive IoT monitoring system for smart city infrastructure management.",
    tags: ["React", "MQTT", "InfluxDB", "Grafana"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    year: "2023"
  }
];

// Categories are now dynamically derived from projects

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
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
      
      {/* Featured indicator */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-20">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
          <div className="absolute inset-0 w-3 h-3 bg-primary rounded-full animate-ping" />
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        {/* Minimal overlay */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300" />
        
        {/* Action buttons */}
        <motion.div
          className="absolute top-4 right-4 flex space-x-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-secondary hover:text-primary hover:bg-white transition-colors shadow-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-secondary hover:text-primary hover:bg-white transition-colors shadow-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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
            {project.year}
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
          {project.tags.map((tag, tagIndex) => (
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
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Convert API projects to display format
  const projects: Project[] = React.useMemo(() => {
    if (apiProjects.length > 0) {
      return apiProjects.map(project => ({
        ...project,
        image: project.thumbnail,
        tags: project.techStack,
        featured: true,
        year: new Date(project.createdAt).getFullYear().toString()
      }));
    }
    // Fallback to default projects if no API data
    return defaultProjects as Project[];
  }, [apiProjects]);

  // Get unique categories
  const categories = React.useMemo(() => {
    const uniqueCategories = Array.from(new Set(projects.map(p => p.category)));
    return ["All", ...uniqueCategories];
  }, [projects]);

  React.useEffect(() => {
    handleCategoryChange(activeCategory);
  }, [projects, activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const filtered = category === "All" 
      ? projects 
      : projects.filter(project => project.category === category);
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
    <div ref={containerRef} className="w-full">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.span 
          className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our Portfolio
        </motion.span>
        
        <motion.h2 
          className="text-4xl md:text-6xl font-bold text-secondary dark:text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Featured
          <span className="block text-primary">Projects</span>
        </motion.h2>
        
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Discover our most impactful projects and the innovative solutions we've crafted for our clients.
        </motion.p>

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
              key={project.id}
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
      </motion.div>
    </div>
  );
};

export default InteractiveProjectShowcase;