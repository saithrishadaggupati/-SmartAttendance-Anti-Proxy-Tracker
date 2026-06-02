import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { MainLayout } from './components/layout/MainLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import { FacultyDashboard } from './pages/faculty/FacultyDashboard';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { FacultyManagement } from './pages/admin/FacultyManagement';
import { StudentManagement } from './pages/admin/StudentManagement';
import { CourseManagement } from './pages/admin/CourseManagement';
import { EnrollmentManagement } from './pages/admin/EnrollmentManagement';
import { NotFound } from './pages/shared/NotFound';

function App() {
  const { currentUser, role } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            currentUser
              ? <Navigate to={`/${role}`} replace />
              : <LoginForm />
          }
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {role && (
            <Route
              path="/"
              element={<Navigate to={`/${role}`} replace />}
            />
          )}

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={<ProtectedRoute allowedRoles={['admin']} />}
          >
            <Route element={<MainLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="faculty" element={<FacultyManagement />} />
              <Route path="users" element={<StudentManagement />} />
              <Route path="courses" element={<CourseManagement />} />
              <Route path="enrollments" element={<EnrollmentManagement />} />
              <Route
                path="settings"
                element={
                  <div style={{ padding: '20px' }}>
                    <h2>Settings Page</h2>
                    <p>Settings module coming soon.</p>
                  </div>
                }
              />
            </Route>
          </Route>

          {/* Faculty Routes */}
          <Route
            path="/faculty"
            element={<ProtectedRoute allowedRoles={['faculty']} />}
          >
            <Route element={<MainLayout />}>
              <Route index element={<FacultyDashboard />} />
            </Route>
          </Route>

          {/* Student Routes */}
          <Route
            path="/student"
            element={<ProtectedRoute allowedRoles={['student']} />}
          >
            <Route element={<MainLayout />}>
              <Route index element={<StudentDashboard />} />
            </Route>
          </Route>
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;