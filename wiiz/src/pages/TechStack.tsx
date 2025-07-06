import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { techStackApi, type TechStack as TechStackType } from '../services/api';

interface Technology extends TechStackType {
  proficiency?: number;
  experience?: string;
}

const categoryDisplayNames: { [key: string]: string } = {
  'frontend': 'Frontend',
  'backend': 'Backend',
  'database': 'Database',
  'devops': 'DevOps',
  'mobile': 'Mobile',
  'other': 'Other'
};

const TechCard = ({ tech, index }: { tech: Technology; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative bg-white dark:bg-secondary-800 rounded-3xl overflow-hidden border border-primary/20 dark:border-secondary-600 hover:border-primary/40 dark:hover:border-primary/30 transition-all duration-300 h-[320px] min-w-0 flex flex-col hover:shadow-lg hover:shadow-primary/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${tech.color || 'from-primary to-secondary'} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      
      {/* Content */}
      <div className="relative p-6 flex flex-col flex-grow min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <motion.div
            className="text-4xl"
            animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {tech.icon || '🔧'}
          </motion.div>
          <div className="text-right">
            <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
              {categoryDisplayNames[tech.category] || tech.category}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-secondary dark:text-white mb-3 group-hover:text-primary transition-colors flex-shrink-0">
          {tech.name}
        </h3>

        {/* Description */}
        <div className="flex-grow min-h-0 mb-4">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed h-full overflow-y-auto">
            {tech.description}
          </p>
        </div>

        {/* Logo/Website Link */}
        {tech.officialWebsite && (
          <div className="flex-shrink-0 mt-auto">
            <a 
              href={tech.officialWebsite} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary text-sm font-medium hover:underline"
            >
              Learn more →
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const TechStack: React.FC = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredTechs, setFilteredTechs] = useState<Technology[]>([]);

  useEffect(() => {
    fetchTechStack();
  }, []);

  useEffect(() => {
    handleCategoryChange(activeCategory);
  }, [technologies, activeCategory]);

  const fetchTechStack = async () => {
    try {
      const data = await techStackApi.getAll();
      setTechnologies(data);
    } catch (error) {
      console.error('Error fetching tech stack:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", ...Array.from(new Set(technologies.map(tech => categoryDisplayNames[tech.category] || tech.category)))];

  const handleCategoryChange = (category: string) => {
    const filtered = category === "All" 
      ? technologies 
      : technologies.filter(tech => {
          const displayName = categoryDisplayNames[tech.category] || tech.category;
          return displayName === category;
        });
    setFilteredTechs(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-secondary-900 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Technology Arsenal
          </motion.span>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-secondary dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Tech
            <span className="block text-primary">Stack</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Explore the cutting-edge technologies and tools we use to build exceptional digital experiences. 
            From frontend frameworks to AI integration, discover our comprehensive skill set.
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
                onClick={() => {
                  setActiveCategory(category);
                  handleCategoryChange(category);
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-white dark:bg-secondary-800 text-gray-600 dark:text-gray-300 hover:bg-primary/10 border border-primary/20 dark:border-secondary-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Tech Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8"
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, staggerChildren: 0.05 }}
          >
            {filteredTechs.map((tech, index) => (
              <motion.div
                key={tech._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
              >
                <TechCard tech={tech} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredTechs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No technologies found in this category.
            </p>
          </div>
        )}

        {/* Stats Section */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Technologies", value: `${technologies.length}+` },
            { label: "Categories", value: `${categories.length - 1}` },
            { label: "Projects Built", value: "100+" },
            { label: "Years Experience", value: "5+" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white dark:bg-secondary-800 rounded-2xl border border-primary/20 dark:border-secondary-600"
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TechStack;