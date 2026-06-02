import React from 'react';
import { 
  Users, 
  BookOpen, 
  QrCode, 
  Plus,
  ArrowRight
} from 'lucide-react';

interface Course {
  id: string;
  name: string;
  code: string;
  students: number;
  schedule: string;
}

const myCourses: Course[] = [
  { id: '1', name: 'Advanced Java Programming', code: 'CS305', students: 45, schedule: 'Mon, Wed 10:00 AM' },
  { id: '2', name: 'Software Engineering', code: 'CS301', students: 52, schedule: 'Tue, Thu 02:00 PM' },
  { id: '3', name: 'Object Oriented Analysis', code: 'CS308', students: 38, schedule: 'Fri 09:00 AM' },
];

export const FacultyDashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <div className="welcome-section">
        <h1>Faculty Dashboard</h1>
        <p className="text-muted">Manage your courses and track student attendance.</p>
      </div>

      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-icon bg-blue">
            <BookOpen size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Active Courses</span>
            <span className="stat-value">3</span>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon bg-green">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Students</span>
            <span className="stat-value">135</span>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon bg-purple">
            <QrCode size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Sessions This Week</span>
            <span className="stat-value">8</span>
          </div>
        </div>
      </div>

      <div className="section-header">
        <h3>My Courses</h3>
        <button className="btn btn-outline btn-sm">
          <Plus size={16} />
          <span>Add Course</span>
        </button>
      </div>

      <div className="courses-grid">
        {myCourses.map((course) => (
          <div key={course.id} className="card course-card">
            <div className="course-header">
              <span className="course-code">{course.code}</span>
              <div className="student-count">
                <Users size={14} />
                <span>{course.students} Students</span>
              </div>
            </div>
            <h4>{course.name}</h4>
            <div className="course-info">
              <span className="schedule">{course.schedule}</span>
            </div>
            <div className="course-actions">
              <button className="btn btn-primary btn-sm">
                <QrCode size={16} />
                <span>Start Session</span>
              </button>
              <button className="btn btn-outline btn-sm">
                <span>View Attendance</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .welcome-section h1 {
          font-size: 1.875rem;
          margin-bottom: 0.25rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bg-blue { background-color: #eff6ff; color: #2563eb; }
        .bg-green { background-color: #f0fdf4; color: #166534; }
        .bg-purple { background-color: #f5f3ff; color: #7c3aed; }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1rem;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .course-card {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .course-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .course-code {
          background: #f1f5f9;
          padding: 0.25rem 0.625rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .student-count {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .course-card h4 {
          font-size: 1.125rem;
          margin: 0;
        }

        .course-info {
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .course-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .btn-sm {
          padding: 0.5rem 0.75rem;
          font-size: 0.8125rem;
        }

        .mt-4 {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
};
