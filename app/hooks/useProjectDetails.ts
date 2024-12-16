import { useEffect, useState } from 'react';
import { ItemType, ProjectType } from '../types';
import { fetchProjectByIdFromDB } from '../actions/projectActions';
import { fetchItemsByProjectFromDB } from '../actions/itemActions';

const useProjectDetails = (projectId: string) => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [project, setProject] = useState<ProjectType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await fetchProjectByIdFromDB(projectId);
        const itemsData = await fetchItemsByProjectFromDB(projectId);
        setProject(projectData);
        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching project details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [projectId]);

  return { project, items, setItems, loading };
};

export default useProjectDetails;
