import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import ProfessorDashboard from './components/ProfessorDashboard';
import StudentDashboard from './components/StudentDashboard';

export default function App() {
  const [view, setView] = useState<'login' | 'student' | 'professor'>('login');
  const [mounted, setMounted] = useState(false);

  // Prevent server-side rendering execution to eliminate Hydration Error #418
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontFamily: 'monospace' }}>
        LOADING SYSTEM CORE...
      </div>
    );
  }

  // Manual View Switching Pipeline
  switch (view) {
    case 'student':
      return (
        <div>
          <button onClick={() => setView('login')} style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 100, padding: '8px 12px', backgroundColor: '#1e293b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            ← Back to Gateway
          </button>
          <StudentDashboard />
        </div>
      );
    case 'professor':
      return (
        <div>
          <button onClick={() => setView('login')} style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 100, padding: '8px 12px', backgroundColor: '#1e293b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            ← Back to Gateway
          </button>
          <ProfessorDashboard />
        </div>
      );
    case 'login':
    default:
      return (
        <div style={{ position: 'relative' }}>
          {/* Quick-testing developer hotbar to cycle views one-by-one instantly */}
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: '#1e293b', padding: '10px', display: 'flex', justifyContent: 'center', gap: '10px', zIndex: 1000, borderBottom: '1px solid #334155' }}>
            <span style={{ color: '#94a3b8', fontSize: '13px', alignSelf: 'center', fontFamily: 'sans-serif' }}>🔧 Dev View Switcher:</span>
            <button onClick={() => setView('student')} style={{ padding: '4px 12px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Go to Student Node View</button>
            <button onClick={() => setView('professor')} style={{ padding: '4px 12px', backgroundColor: '#a855f7', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Go to Faculty Core View</button>
          </div>
          <div style={{ paddingTop: '50px' }}>
            <LoginForm />
          </div>
        </div>
      );
  }
}
