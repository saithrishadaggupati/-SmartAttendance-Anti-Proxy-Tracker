import './index.css';
import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import StudentDashboard from './components/StudentDashboard';
import ProfessorDashboard from './components/ProfessorDashboard';

function NavigationWrapper() {
  const { user, logout } = useAuth();

  // If no active auth payload signature is located, redirect to account log gateway form
  if (!user) {
    return <LoginForm />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Fixed Uniform Premium Top Navigation Strip */}
      <nav style={{
        borderBottom: '1px solid rgba(30, 41, 59, 0.6)',
        backgroundColor: 'rgba(2, 6, 23, 0.8)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        padding: '16px 24px'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              height: '32px',
              width: '32px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#ffffff',
              fontSize: '14px',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)'
            }}>
              SA
            </div>
            <div>
              <h1 style={{ fontSize: '14px', fontWeight: 900, margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#ffffff' }}>
                Smart Attendance
              </h1>
              <p style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748b', margin: 0, textTransform: 'uppercase' }}>
                Active Identity Authentication Node
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right', display: 'block' }}>
              <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#e2e8f0', margin: 0 }}>{user.name}</p>
              <p style={{ fontSize: '10px', fontFamily: 'monospace', color: '#818cf8', margin: 0, textTransform: 'capitalize' }}>
                {user.role} Authorization
              </p>
            </div>
            <button
              onClick={logout}
              style={{
                padding: '6px 14px',
                borderRadius: '12px',
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                color: '#94a3b8',
                fontSize: '12px',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              Disconnect Node
            </button>
          </div>
        </div>
      </nav>

      {/* Main Core Viewport Container */}
      <main style={{ flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '32px 16px' }}>
        {user.role === 'student' ? <StudentDashboard /> : <ProfessorDashboard />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationWrapper />
    </AuthProvider>
  );
}
