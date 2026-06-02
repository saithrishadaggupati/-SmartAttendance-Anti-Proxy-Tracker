import { Timestamp } from 'firebase/firestore';

export interface User {
  uid: string;
  email: string;
  role: 'admin' | 'faculty' | 'student';
  name: string;
  department: string;
  isActive: boolean;
  studentId?: string; // e.g., S1001
  facultyId?: string; // e.g., F2001
  createdAt: Timestamp;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  credits: number;
  facultyId: string; // Reference to User.uid
  semester: string;
  schedule: string;
  createdAt: Timestamp;
}

export interface Enrollment {
  id: string; // Document ID: {courseId}_{studentUid}
  courseId: string;
  studentId: string; // Reference to User.uid
  status: 'active' | 'dropped' | 'completed';
  enrolledAt: Timestamp;
}

export interface AttendanceSession {
  id: string;
  courseId: string;
  date: string;
  startTime: string;
  endTime: string;
  active: boolean;
  qrCode: string;
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  studentId: string;
  studentName: string;
  courseId: string;
  timestamp: Timestamp;
  status: 'present' | 'absent' | 'late';
}
