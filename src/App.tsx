import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import ProfessorDashboard from './components/ProfessorDashboard';
import StudentDashboard from './components/StudentDashboard';

function MainAppLayout() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'student' | 'professor'>('login');
  const [isMounted, setIsMounted] = useState(false);

  // Sync tab navigation state with authentication logging signatures
  useEffect(() => {
    setIsMounted(true);
    if (user) {
      if (user.role === 'professor') {
        setActiveTab('professor');
      } else if (user.role === 'student') {
        setActiveTab('student');
      }
    } else {
      setActiveTab('login');
    }
  }, [user]);

  if (!isMounted) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontFamily: 'monospace', fontSize: '13px' }}>
        INITIALIZING BUBU UNIVERSITY CORE SECURITY ARRAY...
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', position: 'relative' }}>
      
      {/* Universal Institutional Header (Tabs are locked based on Login Status) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#0f172a',
        borderBottom: '1px solid #1e293b',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 99999
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ padding: '4px 8px', backgroundColor: '#a855f7', borderRadius: '6px', fontWeight: 'bold', color: '#fff', fontSize: '12px', fontFamily: 'sans-serif' }}>BU</div>
          <span style={{ color: '#f8fafc', fontSize: '14px', fontWeight: 800, fontFamily: 'sans-serif', letterSpacing: '0.5px' }}>BUBU UNIVERSITY PORTAL</span>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('login')} 
            style={{ padding: '6px 14px', backgroundColor: activeTab === 'login' ? '#1e293b' : 'transparent', border: activeTab === 'login' ? '1px solid #3b82f6' : 'none', color: activeTab === 'login' ? '#3b82f6' : '#94a3b8', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '8px' }}
          >
            {user ? 'ℹ️ Identity Active' : '🔒 1. Login Gateway'}
          </button>
          
          <button 
            onClick={() => user?.role === 'student' && setActiveTab('student')} 
            disabled={user?.role !== 'student'}
            style={{ padding: '6px 14px', backgroundColor: activeTab === 'student' ? '#1e293b' : 'transparent', border: activeTab === 'student' ? '1px solid #3b82f6' : 'none', color: activeTab === 'student' ? '#3b82f6' : '#475569', fontSize: '12px', fontWeight: 'bold', cursor: user?.role === 'student' ? 'pointer' : 'not-allowed', borderRadius: '8px', opacity: user?.role === 'student' ? 1 : 0.4 }}
          >
            🔑 2. Student Terminal
          </button>
          
          <button 
            onClick={() => user?.role === 'professor' && setActiveTab('professor')} 
            disabled={user?.role !== 'professor'}
            style={{ padding: '6px 14px', backgroundColor: activeTab === 'professor' ? '#1e293b' : 'transparent', border: activeTab === 'professor' ? '1px solid #a855f7' : 'none', color: activeTab === 'professor' ? '#a855f7' : '#475569', fontSize: '12px', fontWeight: 'bold', cursor: user?.role === 'professor' ? 'pointer' : 'not-allowed', borderRadius: '8px', opacity: user?.role === 'professor' ? 1 : 0.4 }}
          >
            📊 3. Faculty Core
          </button>
        </div>
      </div>

      {/* Screen Portal Viewports with Backend Security Guard Checks */}
      <div style={{ paddingTop: '80px', paddingBottom: '40px' }}>
        {activeTab === 'login' && <LoginForm />}
        
        {activeTab === 'student' && (
          user?.role === 'student' ? <StudentDashboard /> : <div style={{ color: '#f87171', textAlign: 'center', marginTop: '40px', fontFamily: 'monospace' }}>⚠️ ACCESS DENIED: Student Clearance Token Missing.</div>
        )}
        
        {activeTab === 'professor' && (
          user?.role === 'professor' ? <ProfessorDashboard /> : <div style={{ color: '#f87171', textAlign: 'center', marginTop: '40px', fontFamily: 'monospace' }}>⚠️ ACCESS DENIED: Faculty Core Authorization Missing.</div>
        )}
      </div>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppLayout />
    </AuthProvider>
  );
}
