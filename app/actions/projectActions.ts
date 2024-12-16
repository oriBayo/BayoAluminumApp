import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  DocumentReference,
  DocumentData,
} from 'firebase/firestore';
import app from '../firebaseConfig';
import { ProjectType } from '../types';

const db = getFirestore(app);

export async function fetchProjectsFromDB(): Promise<ProjectType[]> {
  const projectCollection = collection(db, 'projects');
  try {
    const projectSnapshot = await getDocs(projectCollection);
    const projects: ProjectType[] = [];
    projectSnapshot.forEach((doc) => {
      const data = doc.data();
      projects.push({
        city: data.city,
        id: doc.id,
        name: data.name,
      });
    });
    return projects;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchProjectByIdFromDB(
  projectId: string
): Promise<ProjectType | null> {
  const projectDocRef = doc(db, 'projects', projectId);
  try {
    const projectsSnapshot = await getDoc(projectDocRef);
    if (projectsSnapshot.exists()) {
      const data = projectsSnapshot.data();

      const project: ProjectType = {
        id: projectsSnapshot.id,
        name: data?.name ?? '',
        city: data?.city ?? '',
      };
      return project;
    } else {
      console.log('No such project!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    throw error;
  }
}

export async function saveProjectToDB(
  project: ProjectType
): Promise<DocumentReference<DocumentData, DocumentData>> {
  try {
    const docRef = await addDoc(collection(db, 'projects'), {
      name: project.name,
      city: project.city,
    });
    return docRef;
  } catch (error) {
    console.error('Error saving project to DB:', (error as Error).message);
    throw error;
  }
}
