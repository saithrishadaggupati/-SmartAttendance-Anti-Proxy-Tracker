import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search,
  Filter,
  Loader2,
  Calendar,
  X,
  User as UserIcon
} from 'lucide-react';
import { courseService } from '../../services/courseService';
import { userService } from '../../services/userService';
import type { Course, User } from '../../types';

export const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [facultyList, setFacultyList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  
  // Form input fields state
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    department: '',
    facultyId: '',
    credits: 3,
    schedule: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [coursesData, facultyData] = await Promise.all([
        courseService.getAllCourses(),
        userService.getUsersByRole('faculty')
      ]);
      setCourses(coursesData);
      setFacultyList(facultyData);
    } catch (error) {
      console.error("Error loading course data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFacultyName = (id: string) => {
    const faculty = facultyList.find(f => f.uid === id);
    return faculty ? faculty.name : 'Unassigned';
  };

  const handleOpenCreateModal = () => {
    setEditingCourse(null);
    setFormData({
      code: '',
      name: '',
      department: '',
      facultyId: facultyList[0]?.uid || '',
      credits: 3,
      schedule: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      code: course.code,
      name: course.name,
      department: course.department,
      facultyId: course.facultyId,
      credits: course.credits,
      schedule: course.schedule
    });
    setIsModalOpen(true);
  };

  const handleDeleteCourse = async (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this course?")) {
      try {
        setLoading(true);
        await courseService.deleteCourse(id);
        await loadData(); // Reload screen data
      } catch (error) {
        console.error("Failed to delete course:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingCourse) {
        // Run update path
        await courseService.updateCourse(editingCourse.id, formData);
      } {
        // Run create path
        await courseService.createCourse(formData);
      }
      setIsModalOpen(false);
      await loadData();
    } catch (error) {
      console.error("Error saving course record:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="management-container">
      <div className="page-header">
        <div>
          <h1>Course Management</h1>
          <p className="text-muted">Create academic courses and assign faculty instructors.</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenCreateModal}>
          <Plus size={18} />
          <span>Create Course</span>
        </button>
      </div>

      <div className="card table-card">
        <div className="table-actions">
          <div className="search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by code, name or department..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-outline">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>

        <div className="table-container">
          {loading ? (
            <div className="table-loader">
              <Loader2 size={32} className="animate-spin" />
              <p>Syncing course records...</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Faculty</th>
                  <th>Credits</th>
                  <th>Schedule</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <tr key={course.id}>
                      <td>
                        <span className="course-code-badge">{course.code}</span>
                      </td>
                      <td>
                        <div className="course-name-cell">
                          <span className="course-name-text">{course.name}</span>
                          <span className="course-dept-text">{course.department}</span>
                        </div>
                      </td>
                      <td>
                        <div className="faculty-cell">
                          <UserIcon size={14} className="text-muted" />
                          <span>{getFacultyName(course.facultyId)}</span>
                        </div>
                      </td>
                      <td>{course.credits}</td>
                      <td>
                        <div className="schedule-cell">
                          <Calendar size={14} className="text-muted" />
                          <span>{course.schedule}</span>
                        </div>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button className="icon-btn" title="Edit" onClick={() => handleOpenEditModal(course)}>
                            <Edit2 size={18} />
                          </button>
                          <button className="icon-btn" title="Delete" onClick={() => handleDeleteCourse(course.id)}>
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-8">
                      {searchTerm ? 'No courses found matching your search.' : 'No courses registered yet.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Human-built Form Modal Popup */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content card">
            <div className="modal-header">
              <h2>{editingCourse ? 'Edit Course Record' : 'Register New Course'}</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="form-group">
                <label>Course Code</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. CSE-302"
                  value={formData.code}
                  onChange={e => setFormData({...formData, code: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Course Title</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Database Management Systems"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Department</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Computer Science"
                    value={formData.department}
                    onChange={e => setFormData({...formData, department: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Credits</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="5" 
                    required 
                    value={formData.credits}
                    onChange={e => setFormData({...formData, credits: parseInt(e.target.value) || 3})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Assigned Faculty Instructor</label>
                <select 
                  value={formData.facultyId}
                  onChange={e => setFormData({...formData, facultyId: e.target.value})}
                >
                  {facultyList.length === 0 ? (
                    <option value="">No faculty members available</option>
                  ) : (
                    facultyList.map(faculty => (
                      <option key={faculty.uid} value={faculty.uid}>
                        {faculty.name} ({faculty.email})
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="form-group">
                <label>Weekly Schedule</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Mon/Wed 10:00 AM - 11:30 AM"
                  value={formData.schedule}
                  onChange={e => setFormData({...formData, schedule: e.target.value})}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {editingCourse ? 'Save Changes' : 'Add Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .management-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .table-card {
          padding: 0;
          overflow: hidden;
        }
        .table-actions {
          padding: 1.25rem 1.5rem;
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          border-bottom: 1px solid var(--border);
        }
        .search-box {
          flex: 1;
          max-width: 400px;
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-box svg {
          position: absolute;
          left: 0.75rem;
          color: var(--text-muted);
        }
        .search-box input {
          width: 100%;
          padding: 0.5rem 0.75rem 0.5rem 2.5rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          font-size: 0.875rem;
        }
        .course-code-badge {
          background: #f1f5f9;
          padding: 0.25rem 0.625rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
        }
        .course-name-cell {
          display: flex;
          flex-direction: column;
        }
        .course-name-text {
          font-weight: 600;
          color: var(--text-main);
        }
        .course-dept-text {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .faculty-cell, .schedule-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
        }
        .action-btns {
          display: flex;
          gap: 0.5rem;
        }
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
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          width: 100%;
          max-width: 500px;
          padding: 2rem;
          background: #ffffff;
          position: relative;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
        }
        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }
        .form-row {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1rem;
        }
        .form-group label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-main);
        }
        .form-group input, .form-group select {
          padding: 0.625rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          font-size: 0.875rem;
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
