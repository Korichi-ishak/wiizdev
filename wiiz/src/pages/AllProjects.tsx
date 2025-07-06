import React, { useState, useMemo, useCallback, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '../hooks/useProjects';
import ProjectFilters from '../components/ProjectFilters';
import ProjectCard from '../components/ProjectCard';
import ProjectSkeleton from '../components/ProjectSkeleton';
import SEO from '../components/SEO';

const AllProjects: React.FC = () => {
  const { projects, loading, hasMore, loadMore } = useProjects(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Optimized handlers with transitions
  const handleSearchChange = useCallback((term: string) => {
    startTransition(() => {
      setSearchTerm(term);
    });
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    startTransition(() => {
      setSelectedCategory(category);
    });
  }, []);

  const handleSortChange = useCallback((sort: 'newest' | 'oldest' | 'title') => {
    startTransition(() => {
      setSortBy(sort);
    });
  }, []);

  // Optimized filtering and sorting with useMemo
  const { categories, filteredProjects } = useMemo(() => {
    const cats = ['all', ...Array.from(new Set(projects.map(p => p.category)))];
    
    const filtered = projects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return { categories: cats, filteredProjects: filtered };
  }, [projects, selectedCategory, searchTerm, sortBy]);

  if (loading && projects.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-secondary-900 dark:to-gray-900 py-20">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              All Projects
            </motion.h1>
            <motion.p 
              className="text-xl text-secondary/70 dark:text-secondary-200 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Explore our complete portfolio of innovative digital solutions and creative projects.
            </motion.p>
          </div>

          <ProjectSkeleton viewMode={viewMode} count={12} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-secondary-900 dark:to-gray-900 py-20">
      <SEO 
        title="Tous nos Projets | Portfolio Wiiz Dev - Développement Web & Mobile"
        description="Découvrez notre portfolio complet de projets web et mobile. Applications e-commerce, sites vitrine, plateformes sur mesure développées avec React, Node.js, MongoDB."
        keywords="portfolio, projets web, applications mobiles, e-commerce, React, Node.js, MongoDB, développement sur mesure"
        url="https://wiizdev.com/all-projects"
      />
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            All Projects
          </motion.h1>
          <motion.p 
            className="text-xl text-secondary/70 dark:text-secondary-200 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Explore our complete portfolio of innovative digital solutions and creative projects.
          </motion.p>
        </div>

        {/* Enhanced Filter Controls */}
        <ProjectFilters
          searchTerm={searchTerm}
          setSearchTerm={handleSearchChange}
          sortBy={sortBy}
          setSortBy={handleSortChange}
          viewMode={viewMode}
          setViewMode={setViewMode}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
          projects={projects}
          filteredCount={filteredProjects.length}
          isPending={isPending}
        />

        {/* Enhanced Projects Grid/List with optimized animations */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isPending && (
            <motion.div 
              className="absolute inset-0 bg-white/50 dark:bg-secondary-900/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-lg flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                <span className="text-secondary dark:text-white font-medium">Filtering projects...</span>
              </div>
            </motion.div>
          )}
          
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div 
                key="grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, staggerChildren: 0.1 }}
                layout
              >
                <AnimatePresence>
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project._id}
                      project={project}
                      index={index}
                      viewMode="grid"
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div 
                key="list"
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, staggerChildren: 0.05 }}
                layout
              >
                <AnimatePresence>
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project._id}
                      project={project}
                      index={index}
                      viewMode="list"
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-secondary-800 rounded-2xl p-12 shadow-lg border border-gray-200 dark:border-secondary-700 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-secondary dark:text-white mb-3">No projects found</h3>
              <p className="text-secondary/60 dark:text-secondary-400 mb-6">
                {searchTerm 
                  ? `No projects match "${searchTerm}" in ${selectedCategory === 'all' ? 'any category' : selectedCategory}.`
                  : `No projects found in ${selectedCategory}.`
                }
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>
        )}

        {/* Enhanced Load More Button */}
        {!loading && hasMore && filteredProjects.length > 0 && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={loadMore}
              className="bg-gradient-to-r from-primary to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-primary/25"
            >
              Load More Projects
            </button>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && projects.length > 0 && (
          <motion.div 
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
            <p className="text-secondary/60 dark:text-secondary-400 mt-4">Loading more projects...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllProjects;