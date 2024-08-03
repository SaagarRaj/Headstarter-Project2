import { db } from './fireBaseConfig';
import { PantryItem } from '../shared/types';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

const pantryCollection = collection(db, 'Pantry'); // Ensure collection name is consistent

export const addItem = async (item: PantryItem): Promise<void> => {
  try {
    await addDoc(pantryCollection, item);
  } catch (err) {
    console.error('Error adding document: ', err);
  }
};

export const getItems = async (): Promise<PantryItem[]> => {
  try {
    const snapshot = await getDocs(pantryCollection);
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as PantryItem,
    );
  } catch (err) {
    console.error('Error getting documents: ', err);
    return [];
  }
};

export const updateItem = async (
  id: string,
  updatedFields: Partial<PantryItem>,
): Promise<void> => {
  try {
    const itemDoc = doc(db, 'Pantry', id);
    await updateDoc(itemDoc, updatedFields);
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

export const deleteItem = async (id: string): Promise<void> => {
  try {
    const itemDoc = doc(db, 'Pantry', id);
    await deleteDoc(itemDoc);
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
};
