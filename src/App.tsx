import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import ProfessorDashboard from './components/ProfessorDashboard';
import StudentDashboard from './components/StudentDashboard';

function AppContent() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Absolute Hydration Safeguard: Blocks old server cache layout streams entirely
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontFamily: 'monospace' }}>
        INITIALIZING BUBU UNIVERSITY IDENTITY SYSTEM...
      </div>
    );
  }

  // If no session token is stored, force show the clean bypass login gate
  if (!user) {
    return <LoginForm />;
  }

  // If authorized as faculty core, drop instantly into the 3-2-1 admin track view
  if (user.role === 'professor') {
    return <ProfessorDashboard />;
  }

  // Otherwise, lock access window straight to the student node track view
  return <StudentDashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
