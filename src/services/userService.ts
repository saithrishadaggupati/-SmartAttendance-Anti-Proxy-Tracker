import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  query, 
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import type { User } from '../types/index';

const USERS_COLLECTION = 'users';

/**
 * Service for managing user profile data in Firestore.
 */
export const userService = {
  /**
   * Fetches users by their assigned role (e.g., 'faculty' or 'student').
   */
  getUsersByRole: async (role: 'faculty' | 'student'): Promise<User[]> => {
    const q = query(collection(db, USERS_COLLECTION), where('role', '==', role));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as User);
  },

  /**
   * Fetches a single user's data by UID.
   */
  getUser: async (uid: string): Promise<User | null> => {
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, uid));
    return userDoc.exists() ? (userDoc.data() as User) : null;
  },

  /**
   * Creates a new user profile document in Firestore.
   * This should be called after a user is successfully created in Firebase Auth.
   */
  createUser: async (userData: Omit<User, 'createdAt'>): Promise<void> => {
    await setDoc(doc(db, USERS_COLLECTION, userData.uid), {
      ...userData,
      isActive: true, // Default to active on creation
      createdAt: Timestamp.now(),
    });
  },

  /**
   * Updates specific fields of a user's profile.
   */
  updateUser: async (uid: string, data: Partial<User>): Promise<void> => {
    await updateDoc(doc(db, USERS_COLLECTION, uid), data);
  },

  /**
   * Specifically toggles the active status of a user.
   */
  setUserStatus: async (uid: string, isActive: boolean): Promise<void> => {
    await updateDoc(doc(db, USERS_COLLECTION, uid), { isActive });
  }
};
