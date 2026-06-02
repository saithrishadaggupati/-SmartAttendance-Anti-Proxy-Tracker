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
import type { Enrollment, Course } from '../types';

const ENROLLMENTS_COLLECTION = 'enrollments';
const COURSES_COLLECTION = 'courses';

/**
 * Service for managing student enrollments in courses.
 */
export const enrollmentService = {
  /**
   * Enrolls a student in a course. 
   * Uses a deterministic ID '{courseId}_{studentId}' to prevent duplicates.
   */
  enrollStudent: async (courseId: string, studentId: string): Promise<void> => {
    const enrollmentId = `${courseId}_${studentId}`;
    await setDoc(doc(db, ENROLLMENTS_COLLECTION, enrollmentId), {
      id: enrollmentId,
      courseId,
      studentId,
      status: 'active',
      enrolledAt: Timestamp.now(),
    });
  },

  /**
   * Updates the status of an enrollment (e.g., 'dropped' or 'completed').
   */
  updateEnrollmentStatus: async (
    enrollmentId: string, 
    status: 'dropped' | 'completed'
  ): Promise<void> => {
    await updateDoc(doc(db, ENROLLMENTS_COLLECTION, enrollmentId), { status });
  },

  /**
   * Returns all active enrollments for a specific course (class list).
   */
  getEnrollmentsByCourse: async (courseId: string): Promise<Enrollment[]> => {
    const q = query(
      collection(db, ENROLLMENTS_COLLECTION), 
      where('courseId', '==', courseId),
      where('status', '==', 'active')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Enrollment);
  },

  /**
   * Returns all enrollment records for a specific student.
   */
  getEnrollmentsByStudent: async (studentId: string): Promise<Enrollment[]> => {
    const q = query(collection(db, ENROLLMENTS_COLLECTION), where('studentId', '==', studentId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Enrollment);
  },

  /**
   * Helper that returns full Course objects for a student's active enrollments.
   */
  getStudentCourses: async (studentId: string): Promise<Course[]> => {
    const q = query(
      collection(db, ENROLLMENTS_COLLECTION), 
      where('studentId', '==', studentId),
      where('status', '==', 'active')
    );
    const enrollmentSnapshot = await getDocs(q);
    const courseIds = enrollmentSnapshot.docs.map(doc => doc.data().courseId);
    
    // Resolve course details
    const courses: Course[] = [];
    for (const id of courseIds) {
      const courseDoc = await getDoc(doc(db, COURSES_COLLECTION, id));
      if (courseDoc.exists()) {
        courses.push(courseDoc.data() as Course);
      }
    }
    return courses;
  }
};
