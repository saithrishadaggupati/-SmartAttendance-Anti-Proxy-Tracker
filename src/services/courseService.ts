import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import type { Course } from '../types';

const COURSES_COLLECTION = 'courses';

/**
 * Service for managing academic course records.
 */
export const courseService = {
  /**
   * Creates a new course. Generates a unique ID automatically.
   */
  createCourse: async (data: Omit<Course, 'id' | 'createdAt'>): Promise<void> => {
    const newCourseRef = doc(collection(db, COURSES_COLLECTION));
    await setDoc(newCourseRef, {
      ...data,
      id: newCourseRef.id,
      createdAt: Timestamp.now(),
    });
  },

  /**
   * Retrieves a single course by its unique ID.
   */
  getCourse: async (id: string): Promise<Course | null> => {
    const courseDoc = await getDoc(doc(db, COURSES_COLLECTION, id));
    return courseDoc.exists() ? (courseDoc.data() as Course) : null;
  },

  /**
   * Fetches all courses available in the system.
   */
  getAllCourses: async (): Promise<Course[]> => {
    const querySnapshot = await getDocs(collection(db, COURSES_COLLECTION));
    return querySnapshot.docs.map(doc => doc.data() as Course);
  },

  /**
   * Returns courses assigned to a specific faculty member.
   */
  getCoursesByFaculty: async (facultyId: string): Promise<Course[]> => {
    const q = query(collection(db, COURSES_COLLECTION), where('facultyId', '==', facultyId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Course);
  },

  /**
   * Updates an existing course record.
   */
  updateCourse: async (id: string, data: Partial<Course>): Promise<void> => {
    await updateDoc(doc(db, COURSES_COLLECTION, id), data);
  },

  /**
   * Permanently deletes a course record.
   */
  deleteCourse: async (id: string): Promise<void> => {
    await deleteDoc(doc(db, COURSES_COLLECTION, id));
  }
};
