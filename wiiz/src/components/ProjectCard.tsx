import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Tag, Eye, Github, Star } from 'lucide-react';
import type { Project } from '../services/api';

interface ProjectCardProps {
  project: Project;
  index: number;
  viewMode: 'grid' | 'list';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, viewMode }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  if (viewMode === 'list') {
    return (
      <motion.div
        className="group bg-white dark:bg-secondary-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-secondary-700"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        whileHover={{ scale: 1.01 }}
        layout
      >
        <div className="flex flex-col md:flex-row">
          {/* List Image */}
          <div className="md:w-1/3 aspect-video md:aspect-square bg-gradient-to-br from-primary/10 to-purple-600/10 relative overflow-hidden">
            <div className={`absolute inset-0 bg-gray-200 dark:bg-secondary-700 animate-pulse ${imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} />
            <img 
              src={project.thumbnail || '/placeholder.jpg'} 
              alt={project.title}
              className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 left-4">
              <span className="bg-primary/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm font-medium shadow-lg">
                {project.category}
              </span>
            </div>
            {/* Enhanced hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="flex gap-2">
                <div className="bg-white/90 dark:bg-secondary-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="bg-white/90 dark:bg-secondary-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  <Github className="h-4 w-4 text-secondary dark:text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* List Content */}
          <div className="md:w-2/3 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-2xl font-bold text-secondary dark:text-white group-hover:text-primary transition-colors duration-300">
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

              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.slice(0, 4).map(tech => (
                  <span 
                    key={tech} 
                    className="text-xs px-3 py-1 bg-gradient-to-r from-primary/10 to-purple-600/10 text-primary border border-primary/20 rounded-full hover:bg-primary/20 transition-all duration-200 hover:scale-105"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-secondary-700 text-secondary/60 dark:text-secondary-400 rounded-full border border-gray-200 dark:border-secondary-600">
                    +{project.techStack.length - 4} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-all duration-200 group/link hover:scale-105"
              >
                View Project 
                <ExternalLink className="ml-2 h-4 w-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
              </a>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1 hover:text-primary transition-colors duration-200">
                  <Tag className="h-4 w-4" />
                  <span>{project.techStack.length} techs</span>
                </div>
                <div className="flex items-center gap-1 hover:text-primary transition-colors duration-200">
                  <Eye className="h-4 w-4" />
                  <span>Live Demo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="group bg-white dark:bg-secondary-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-secondary-700 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -12, scale: 1.02, rotateX: 5 }}
      layout
    >
      {/* Enhanced Image Container */}
      <div className="aspect-video bg-gradient-to-br from-primary/10 to-purple-600/10 relative overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-secondary-700 animate-pulse" />
        )}
        <img 
          src={project.thumbnail || '/placeholder.jpg'} 
          alt={project.title}
          className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Enhanced hover overlay with actions */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex gap-2">
            <motion.div 
              className="bg-white/90 dark:bg-secondary-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Star className="h-4 w-4 text-yellow-500" />
            </motion.div>
            <motion.div 
              className="bg-white/90 dark:bg-secondary-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="h-4 w-4 text-secondary dark:text-white" />
            </motion.div>
            <motion.div 
              className="bg-white/90 dark:bg-secondary-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="h-4 w-4 text-primary" />
            </motion.div>
          </div>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-primary/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm font-medium shadow-lg">
            {project.category}
          </span>
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
          <h3 className="text-xl font-bold text-secondary dark:text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {project.title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 ml-2">
            <Calendar className="h-3 w-3" />
            {new Date(project.createdAt).getFullYear()}
          </div>
        </div>
        
        <p className="text-secondary/70 dark:text-secondary-200 mb-4 line-clamp-3 text-sm leading-relaxed">
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + techIndex * 0.05 }}
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
  );
};

export default ProjectCard;
