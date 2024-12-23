import { useEffect, useState } from 'react';
import { ProjectType } from '../types';
import { fetchProjectsFromDB } from '../actions/projectActions';

const useFetchProjects = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchProjects = async () => {
        const projectsData = await fetchProjectsFromDB();
        setProjects(projectsData);
      };
      fetchProjects();
    } catch (error) {
      const err = error as Error;
      console.error('Error fetching projects:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  return { projects, loading, error };
};

export default useFetchProjects;
