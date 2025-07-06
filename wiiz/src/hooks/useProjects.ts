import { useState, useEffect } from 'react';
import { projectsApi, type Project } from '../services/api';

export const useProjects = (initialLimit?: number) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('🔄 Fetching projects from API...');
        const res = await projectsApi.getAll({
          limit: initialLimit,
          page
        });
        console.log('📊 API Response:', res);
        
        // Show all projects for now (remove published filter for debugging)
        const allProjects = res.projects || [];
        console.log('📋 All projects:', allProjects);
        
        const publishedProjects = allProjects.filter((p: Project) => p.status === 'published');
        console.log('✅ Published projects:', publishedProjects);
        
        if (page === 1) {
          setProjects(publishedProjects);
        } else {
          setProjects((prev) => [...prev, ...publishedProjects]);
        }
        if (publishedProjects.length < (initialLimit || 0)) {
          setHasMore(false);
        }
      } catch (err) {
        console.error('❌ Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [initialLimit, page]);

  const loadMore = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  return { projects, loading, error, hasMore, loadMore };
};