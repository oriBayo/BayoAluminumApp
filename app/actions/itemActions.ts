import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
  DocumentReference,
  DocumentData,
  updateDoc,
} from 'firebase/firestore';
import app from '../firebaseConfig';
import { ItemType, ItemWithoutId } from '../types';

const db = getFirestore(app);

export async function saveItemToDB(
  item: ItemWithoutId
): Promise<DocumentReference<DocumentData, DocumentData>> {
  try {
    const docRef = await addDoc(collection(db, 'items'), {
      height: item.height,
      width: item.width,
      type: item.type,
      comment: item.comment,
      projectId: item.projectId,
    });
    return docRef;
  } catch (error) {
    console.error('Error saving item to DB:', (error as Error).message);
    throw error;
  }
}

export async function deleteItemFromDB(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'items', id);
    await deleteDoc(docRef);
    console.log(`Document with ID ${id} has been deleted.`);
  } catch (error) {
    console.error('Error deleting item from DB:', (error as Error).message);
    throw error;
  }
}

export async function fetchItemsByProjectFromDB(
  projectId: string
): Promise<ItemType[]> {
  try {
    const itemsCollection = collection(db, 'items');
    const q = query(itemsCollection, where('projectId', '==', projectId));
    const snapshot = await getDocs(q);

    const items: ItemType[] = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as ItemType)
    );
    return items;
  } catch (error) {
    console.error('Error fetching items by project ID:', error);
    throw error;
  }
}

export async function updateItemInDB(item: ItemType): Promise<void> {
  try {
    const itemDocRef = doc(db, 'items', item.id);
    await updateDoc(itemDocRef, {
      height: item.height,
      width: item.width,
      comment: item.comment,
      type: item.type,
    });
    console.log(`Item with ID ${item.id} has been updated.`);
  } catch (error) {
    console.error('Error updating item in DB:', (error as Error).message);
    throw error;
  }
}
