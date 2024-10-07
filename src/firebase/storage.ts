import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from './config'; // Ensure you have a config.ts that initializes Firebase

const storage = getStorage(app);

/**
 * Uploads a user's profile image to Firebase Storage.
 * @param file - The image file to upload (Blob or File).
 * @param uid - The user's unique ID.
 * @returns The download URL of the uploaded image.
 */
export const uploadProfileImage = async (file: Blob, uid: string): Promise<string> => {
  const storageRef = ref(storage, `profileImages/${uid}.jpg`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};
