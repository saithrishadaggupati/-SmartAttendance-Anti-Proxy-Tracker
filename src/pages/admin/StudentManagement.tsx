import React, { useEffect, useState } from 'react';
import { 
  UserPlus, 
  Edit2, 
  Trash2, 
  CheckCircle, 
  XCircle,
  Search,
  Filter,
  Loader2,
  GraduationCap
} from 'lucide-react';
import { userService } from '../../services/userService';
import type { User } from '../../types';

export const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsersByRole('student');
      setStudents(data);
    } catch (error) {
      console.error("Error loading students:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (uid: string, currentStatus: boolean) => {
    try {
      await userService.setUserStatus(uid, !currentStatus);
      setStudents(prev => prev.map(u => u.uid === uid ? { ...u, isActive: !currentStatus } : u));
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="management-container">
      <div className="page-header">
        <div>
          <h1>Student Management</h1>
          <p className="text-muted">Enroll and manage student records and academic status.</p>
        </div>
        <button className="btn btn-primary">
          <UserPlus size={18} />
          <span>Enroll Student</span>
        </button>
      </div>

      <div className="card table-card">
        <div className="table-actions">
          <div className="search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by name, student ID or email..." 
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
              <p>Loading student records...</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Department</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((user) => (
                    <tr key={user.uid}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar student-avatar">
                            <GraduationCap size={16} />
                          </div>
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td>{user.studentId || 'N/A'}</td>
                      <td>{user.department}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${user.isActive ? 'badge-success' : 'badge-error'}`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button 
                            className="icon-btn" 
                            title={user.isActive ? "Deactivate" : "Activate"}
                            onClick={() => toggleStatus(user.uid, user.isActive)}
                          >
                            {user.isActive ? <XCircle size={18} className="text-red" /> : <CheckCircle size={18} className="text-green" />}
                          </button>
                          <button className="icon-btn" title="Edit">
                            <Edit2 size={18} />
                          </button>
                          <button className="icon-btn" title="Delete">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-8">
                      {searchTerm ? 'No students found matching your search.' : 'No student records found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

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

        .user-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }

        .student-avatar {
          background: #f0fdf4;
          color: #166534;
        }

        .action-btns {
          display: flex;
          gap: 0.5rem;
        }

        .text-red { color: #ef4444; }
        .text-green { color: #22c55e; }

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
