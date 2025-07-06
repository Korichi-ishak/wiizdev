import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, TrendingUp, Calendar, Hash } from 'lucide-react';
import type { Project } from '../services/api';

interface ProjectFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: 'newest' | 'oldest' | 'title';
  setSortBy: (sort: 'newest' | 'oldest' | 'title') => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  projects: Project[];
  filteredCount: number;
  isPending?: boolean;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  showFilters,
  setShowFilters,
  categories,
  selectedCategory,
  setSelectedCategory,
  projects,
  filteredCount,
  isPending = false
}) => {
  // Memoize sort options for better performance
  const sortOptions = useMemo(() => [
    { value: 'newest', label: 'Newest First', icon: TrendingUp },
    { value: 'oldest', label: 'Oldest First', icon: Calendar },
    { value: 'title', label: 'Alphabetical', icon: Hash }
  ], []);

  // Enhanced category stats
  const categoryStats = useMemo(() => {
    return categories.map(category => ({
      name: category,
      count: category === 'all' ? projects.length : projects.filter(p => p.category === category).length,
      percentage: category === 'all' 
        ? 100 
        : Math.round((projects.filter(p => p.category === category).length / projects.length) * 100)
    }));
  }, [categories, projects]);
  return (
    <motion.div 
      className="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-secondary-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Search and View Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search projects, technologies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-secondary-600 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white dark:bg-secondary-700 text-secondary dark:text-white transition-all duration-200 ${
              isPending ? 'opacity-50' : ''
            }`}
          />
          {isPending && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
            </div>
          )}
        </div>

        {/* Enhanced Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'title')}
            className="appearance-none px-4 py-3 pr-10 border border-gray-200 dark:border-secondary-600 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white dark:bg-secondary-700 text-secondary dark:text-white transition-all duration-200 hover:border-primary/30"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {sortOptions.find(opt => opt.value === sortBy)?.icon && 
              React.createElement(sortOptions.find(opt => opt.value === sortBy)!.icon, { 
                className: "h-4 w-4 text-gray-400" 
              })
            }
          </div>
        </div>

        {/* Enhanced View Mode Toggle */}
        <div className="flex bg-gray-100 dark:bg-secondary-600 rounded-xl p-1 shadow-inner">
          <motion.button
            onClick={() => setViewMode('grid')}
            className={`p-3 rounded-lg transition-all duration-200 ${
              viewMode === 'grid' 
                ? 'bg-white dark:bg-secondary-800 text-primary shadow-md' 
                : 'text-gray-500 hover:text-primary hover:bg-white/50 dark:hover:bg-secondary-700/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Grid className="h-5 w-5" />
          </motion.button>
          <motion.button
            onClick={() => setViewMode('list')}
            className={`p-3 rounded-lg transition-all duration-200 ${
              viewMode === 'list' 
                ? 'bg-white dark:bg-secondary-800 text-primary shadow-md' 
                : 'text-gray-500 hover:text-primary hover:bg-white/50 dark:hover:bg-secondary-700/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <List className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Enhanced Filter Toggle */}
        <motion.button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 ${
            showFilters 
              ? 'bg-primary text-white shadow-lg shadow-primary/25' 
              : 'bg-gray-100 dark:bg-secondary-600 text-secondary dark:text-white hover:bg-primary/10 hover:text-primary'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Filter className="h-5 w-5" />
          <span className="font-medium">Filters</span>
          {filteredCount !== projects.length && (
            <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">
              {filteredCount}
            </span>
          )}
        </motion.button>
      </div>

      {/* Category Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 dark:border-secondary-600 pt-6"
          >
            <h3 className="text-sm font-semibold text-secondary dark:text-white mb-4 flex items-center gap-2">
              <Hash className="h-4 w-4 text-primary" />
              Categories
            </h3>
            <div className="flex flex-wrap gap-3">
              {categoryStats.map((stat) => (
                <motion.button
                  key={stat.name}
                  onClick={() => setSelectedCategory(stat.name)}
                  className={`group relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 overflow-hidden ${
                    selectedCategory === stat.name
                      ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
                      : 'bg-gray-100 dark:bg-secondary-600 text-secondary/70 dark:text-secondary-300 hover:bg-primary/10 hover:scale-105 hover:shadow-md'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  layout
                >
                  <div className="flex flex-col items-center gap-1">
                    <span>{stat.name.charAt(0).toUpperCase() + stat.name.slice(1)}</span>
                    <div className="flex items-center gap-2 text-xs opacity-70">
                      <span>{stat.count} projects</span>
                      <div className={`w-2 h-2 rounded-full ${
                        selectedCategory === stat.name ? 'bg-white/60' : 'bg-primary/60'
                      }`} />
                      <span>{stat.percentage}%</span>
                    </div>
                  </div>
                  
                  {/* Animated background effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    animate={selectedCategory === stat.name ? { opacity: 0.2 } : { opacity: 0 }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Results Count */}
      <motion.div 
        className="mt-6 pt-4 border-t border-gray-200 dark:border-secondary-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <p className="text-secondary/60 dark:text-secondary-400">
            Showing <span className="font-semibold text-primary">{filteredCount}</span> of{' '}
            <span className="font-semibold">{projects.length}</span> projects
            {searchTerm && <span className="text-primary"> for "{searchTerm}"</span>}
            {selectedCategory !== 'all' && <span className="text-primary"> in {selectedCategory}</span>}
          </p>
          
          {/* Quick stats */}
          <div className="flex items-center gap-4 text-xs text-secondary/50 dark:text-secondary-500">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{projects.filter(p => p.status === 'published' || !p.status).length} Published</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>{new Set(projects.flatMap(p => p.techStack)).size} Technologies</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>{new Set(projects.map(p => p.category)).size} Categories</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectFilters;
