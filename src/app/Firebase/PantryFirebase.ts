import { db } from './fireBaseConfig';
import { PantryItem } from '../shared/types';

export const AddItem = async (item: PantryItem): Promise<void> => {
  try {
    await db.collection('Pantry').add(item);
  } catch (err) {
    console.log('Error adding document: ', err);
  }
};

export const GetItem = async (): Promise<PantryItem[]> => {
  try {
    const snapashot = await db.collection('Pantry').get();
    return snapashot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as PantryItem,
    );
  } catch (err) {
    console.log('Error adding document: ', err);
    return [];
  }
};

export const UpdateItem = async (
  id: string,
  updatedFields: Partial<PantryItem>,
): Promise<void> => {
  try {
    await db.collection('pantry').doc(id).update(updatedFields);
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

export const DeleteItem = async (id: string): Promise<void> => {
  try {
    await db.collection('pantry').doc(id).delete();
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
};
