import { useState, useEffect } from 'react';
import { projectsApi, type Project } from '../services/api';

export const useProjects = (limit?: number) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsApi.getAll();
        const publishedProjects = data.filter(project => project.status === 'published');
        
        if (limit) {
          setProjects(publishedProjects.slice(0, limit));
        } else {
          setProjects(publishedProjects);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [limit]);

  return { projects, loading, error };
};