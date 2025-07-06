import React from 'react';
import { motion } from 'framer-motion';

interface ProjectSkeletonProps {
  viewMode: 'grid' | 'list';
  count?: number;
}

const ProjectSkeleton: React.FC<ProjectSkeletonProps> = ({ viewMode, count = 6 }) => {
  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
        {Array.from({ length: count }).map((_, index) => (
          <motion.div
            key={index}
            className="group bg-white dark:bg-secondary-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-secondary-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <div className="flex flex-col md:flex-row">
              {/* Image Skeleton */}
              <div className="md:w-1/3 aspect-video md:aspect-square bg-gray-200 dark:bg-secondary-700 animate-pulse" />
              
              {/* Content Skeleton */}
              <div className="md:w-2/3 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-6 bg-gray-200 dark:bg-secondary-700 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded animate-pulse w-16" />
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded animate-pulse w-full" />
                    <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded animate-pulse w-5/6" />
                  </div>

                  <div className="flex gap-2 mb-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-6 bg-gray-200 dark:bg-secondary-700 rounded-full animate-pulse w-16" />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="h-5 bg-gray-200 dark:bg-secondary-700 rounded animate-pulse w-24" />
                  <div className="flex gap-4">
                    <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded animate-pulse w-16" />
                    <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded animate-pulse w-16" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="group bg-white dark:bg-secondary-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-secondary-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          {/* Image Skeleton */}
          <div className="aspect-video bg-gray-200 dark:bg-secondary-700 animate-pulse" />

          {/* Content Skeleton */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="h-5 bg-gray-200 dark:bg-secondary-700 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-gray-200 dark:bg-secondary-700 rounded animate-pulse w-12" />
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-gray-200 dark:bg-secondary-700 rounded animate-pulse w-full" />
              <div className="h-3 bg-gray-200 dark:bg-secondary-700 rounded animate-pulse w-5/6" />
              <div className="h-3 bg-gray-200 dark:bg-secondary-700 rounded animate-pulse w-4/5" />
            </div>

            <div className="flex gap-2 mb-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-5 bg-gray-200 dark:bg-secondary-700 rounded-full animate-pulse w-12" />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded animate-pulse w-20" />
              <div className="h-3 bg-gray-200 dark:bg-secondary-700 rounded animate-pulse w-16" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectSkeleton;
