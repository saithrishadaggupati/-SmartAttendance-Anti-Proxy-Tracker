import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import ProfessorDashboard from './components/ProfessorDashboard';
import StudentDashboard from './components/StudentDashboard';

function MainAppLayout() {
  const [activeTab, setActiveTab] = useState<'login' | 'student' | 'professor'>('login');
  const [isMounted, setIsMounted] = useState(false);

  // Absolute barrier against Hydration Mismatch crashes
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontFamily: 'monospace', fontSize: '13px' }}>
        INITIALIZING BUBU UNIVERSITY CORE SECURITY ARRAY...
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', position: 'relative' }}>
      
      {/* Universal Institutional Header Switcher */}
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
            style={{ padding: '6px 14px', backgroundColor: activeTab === 'login' ? '#3b82f6' : '#1e293b', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            🔒 1. Login Gateway
          </button>
          <button 
            onClick={() => setActiveTab('student')} 
            style={{ padding: '6px 14px', backgroundColor: activeTab === 'student' ? '#3b82f6' : '#1e293b', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            🔑 2. Student Terminal
          </button>
          <button 
            onClick={() => setActiveTab('professor')} 
            style={{ padding: '6px 14px', backgroundColor: activeTab === 'professor' ? '#a855f7' : '#1e293b', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            📊 3. Faculty Core
          </button>
        </div>
      </div>

      {/* Screen Portal Viewports */}
      <div style={{ paddingTop: '80px', paddingBottom: '40px' }}>
        {activeTab === 'login' && <LoginForm />}
        {activeTab === 'student' && <StudentDashboard />}
        {activeTab === 'professor' && <ProfessorDashboard />}
      </div>

    </div>
  );
}

// Master Root Wrapper supplying the required Authentication state to all children nodes
export default function App() {
  return (
    <AuthProvider>
      <MainAppLayout />
    </AuthProvider>
  );
}
