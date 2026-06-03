import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Search,
  Loader2,
  BookOpen,
  UserPlus,
  Trash2,
  Calendar
} from 'lucide-react';
import { enrollmentService } from '../../services/enrollmentService';
import { courseService } from '../../services/courseService';
import { userService } from '../../services/userService';
import type { Course, User, Enrollment } from '../../types';

export const EnrollmentManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [students, setStudents] = useState<User[]>([]);
  const [classList, setClassList] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  
  // Human-added search query state
  const [studentSearch, setStudentSearch] = useState('');

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      loadClassList(selectedCourse);
    } else {
      setClassList([]);
    }
  }, [selectedCourse]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [coursesData, studentsData] = await Promise.all([
        courseService.getAllCourses(),
        userService.getUsersByRole('student')
      ]);
      setCourses(coursesData);
      setStudents(studentsData);
    } catch (error) {
      console.error("Error loading enrollment data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadClassList = async (courseId: string) => {
    try {
      const list = await enrollmentService.getEnrollmentsByCourse(courseId);
      setClassList(list);
    } catch (error) {
      console.error("Error loading class list:", error);
    }
  };

  const enrollStudent = async (studentId: string) => {
    if (!selectedCourse) return;
    try {
      setEnrolling(true);
      await enrollmentService.enrollStudent(selectedCourse, studentId);
      await loadClassList(selectedCourse);
    } catch (error) {
      console.error("Error enrolling student:", error);
    } finally {
      setEnrolling(false);
    }
  };

  // Human-added unenroll action
  const handleUnenrollStudent = async (enrollmentId: string) => {
    if (window.confirm("Are you sure you want to remove this student from the course?")) {
      try {
        setEnrolling(true);
        await enrollmentService.unenrollStudent(enrollmentId);
        await loadClassList(selectedCourse);
      } catch (error) {
        console.error("Error removing student from enrollment:", error);
      } finally {
        setEnrolling(false);
      }
    }
  };

  const getStudentInfo = (uid: string) => {
    return students.find(s => s.uid === uid);
  };

  // Filter out students based on what the admin types into the search box
  const filteredAvailableStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(studentSearch.toLowerCase()) || 
                          (student.studentId && student.studentId.toLowerCase().includes(studentSearch.toLowerCase()));
    
    // Don't show students who are already inside the active class list
    const isAlreadyEnrolled = classList.some(e => e.studentId === student.uid);
    
    return matchesSearch && !isAlreadyEnrolled;
  });

  return (
    <div className="management-container">
      <div className="page-header">
        <div>
          <h1>Enrollment Management</h1>
          <p className="text-muted">Register students into academic courses and manage class lists.</p>
        </div>
      </div>

      <div className="enrollment-layout">
        <div className="card selection-card">
          <h3>Select Course</h3>
          <div className="course-selector">
            <select 
              value={selectedCourse} 
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="form-select"
            >
              <option value="">-- Select a Course --</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.name}
                </option>
              ))}
            </select>
          </div>
          
          {selectedCourse && (
            <div className="course-quick-info">
              <div className="info-item">
                <Calendar size={16} />
                <span>{courses.find(c => c.id === selectedCourse)?.schedule}</span>
              </div>
              <div className="info-item">
                <Users size={16} />
                <span>{classList.length} Enrolled</span>
              </div>
            </div>
          )}
        </div>

        <div className="dashboard-grid">
          <div className="card main-card">
            <div className="card-header">
              <h3>Class List</h3>
              <span className="badge badge-success">{classList.length} Students</span>
            </div>
            
            <div className="table-container">
              {loading || enrolling ? (
                <div className="table-loader">
                  <Loader2 size={32} className="animate-spin" />
                  <p>Processing class rosters...</p>
                </div>
              ) : !selectedCourse ? (
                <div className="empty-state">
                  <BookOpen size={48} className="text-muted" />
                  <p>Please select a course to view the class list.</p>
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Student ID</th>
                      <th>Status</th>
                      <th>Enrolled On</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classList.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-8">
                          No students currently enrolled in this section.
                        </td>
                      </tr>
                    ) : (
                      classList.map((enrollment) => {
                        const student = getStudentInfo(enrollment.studentId);
                        return (
                          <tr key={enrollment.id}>
                            <td>{student?.name || 'Unknown'}</td>
                            <td>{student?.studentId || 'N/A'}</td>
                            <td>
                              <span className="badge badge-success">Active</span>
                            </td>
                            <td>
                              {enrollment.enrolledAt?.toDate 
                                ? enrollment.enrolledAt.toDate().toLocaleDateString() 
                                : 'Recent'}
                            </td>
                            <td>
                              <button 
                                className="icon-btn text-red" 
                                title="Remove Student"
                                onClick={() => handleUnenrollStudent(enrollment.id)}
                              >
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="card side-card">
            <h3>Enroll New Student</h3>
            <div className="student-search">
              <div className="search-box">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Search available students..." 
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="enroll-student-list">
              {!selectedCourse ? (
                <p className="text-muted text-center py-4 text-xs">Select a course to enable enrollment</p>
              ) : filteredAvailableStudents.length === 0 ? (
                <p className="text-muted text-center py-4 text-xs">No matching eligible students found</p>
              ) : (
                filteredAvailableStudents.map(student => (
                  <div key={student.uid} className="enroll-item">
                    <div className="enroll-info">
                      <span className="enroll-name">{student.name}</span>
                      <span className="enroll-id">{student.studentId || student.email}</span>
                    </div>
                    <button 
                      className="btn btn-outline btn-sm"
                      disabled={enrolling}
                      onClick={() => enrollStudent(student.uid)}
                    >
                      <UserPlus size={14} />
                      <span>Enroll</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .management-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .enrollment-layout {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .selection-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 2rem;
        }
        .course-selector {
          flex: 1;
          max-width: 500px;
          margin: 0 2rem;
        }
        .form-select {
          width: 100%;
          padding: 0.625rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: white;
          font-size: 0.875rem;
        }
        .course-quick-info {
          display: flex;
          gap: 1.5rem;
        }
        .info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--text-muted);
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: 2.5fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .dashboard-grid { grid-template-columns: 1fr; }
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .empty-state {
          padding: 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: var(--text-muted);
        }
        .student-search {
          margin: 1.25rem 0;
        }
        .enroll-student-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: 450px;
          overflow-y: auto;
          padding-right: 0.25rem;
        }
        .enroll-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: #fff;
        }
        .enroll-info {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }
        .enroll-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-main);
        }
        .enroll-id {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .btn-sm {
          padding: 0.375rem 0.625rem;
          font-size: 0.75rem;
        }
        .text-red { color: #ef4444; }
        .text-xs { font-size: 0.75rem; }
        .table-loader {
          padding: 4rem;
          display: flex;       
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: var(--text-muted);
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
