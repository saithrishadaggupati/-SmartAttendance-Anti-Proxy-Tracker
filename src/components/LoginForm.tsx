import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginForm() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'student' | 'professor'>('student');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!email.trim()) {
      setErrorMsg('Please enter a valid university email node access signature.');
      return;
    }

    const success = await login(email, role);
    if (!success) {
      setErrorMsg('Authorization failed. Unrecognized campus directory signature.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glow Elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '20%',
        width: '300px',
        height: '300px',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '20%',
        width: '300px',
        height: '300px',
        backgroundColor: 'rgba(147, 51, 234, 0.12)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      {/* Main Glassmorphic Panel */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: 'rgba(2, 6, 23, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(51, 65, 85, 0.8)',
        borderRadius: '24px',
        padding: '40px 32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '2px',
          background: 'linear-gradient(to right, transparent, #6366f1, #a855f7, transparent)'
        }} />
        
        {/* Un-mingled Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#ffffff',
            fontSize: '18px',
            boxShadow: '0 10px 20px rgba(99, 102, 241, 0.2)',
            marginBottom: '20px'
          }}>
            SA
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', margin: '0 0 10px 0', letterSpacing: '0.5px' }}>
            SmartAttendance
          </h2>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, fontWeight: 500, letterSpacing: '0.2px', lineHeight: '1.5' }}>
            Anti-Proxy Verification Gateway
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Authorization Selector */}
          <div>
            <label style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              Gate Authorization Target
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', backgroundColor: '#090d16', border: '1px solid #1e293b', padding: '6px', borderRadius: '14px' }}>
              <button
                type="button"
                onClick={() => setRole('student')}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: role === 'student' ? '#4f46e5' : 'transparent',
                  color: role === 'student' ? '#ffffff' : '#64748b'
                }}
              >
                📱 Student Node
              </button>
              <button
                type="button"
                onClick={() => setRole('professor')}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: role === 'professor' ? '#4f46e5' : 'transparent',
                  color: role === 'professor' ? '#ffffff' : '#64748b'
                }}
              >
                📊 Faculty Core
              </button>
            </div>
          </div>

          {/* Email Signature Field */}
          <div>
            <label style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              University Email Signature
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === 'student' ? 'aarav@nitk.edu.in' : 'bubu@nitk.edu.in'}
              style={{
                width: '100%',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid #1e293b',
                borderRadius: '12px',
                padding: '12px 16px',
                fontSize: '14px',
                color: '#f8fafc',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {errorMsg && (
            <p style={{ fontSize: '12px', fontFamily: 'monospace', color: '#f87171', backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '12px', borderRadius: '12px', margin: 0 }}>
              ⚠️ {errorMsg}
            </p>
          )}

          {/* Gateway Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(to right, #4f46e5, #6366f1)',
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '14px',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)'
            }}
          >
            {isLoading ? 'Syncing Handshake Module...' : `Initialize Access as ${role === 'student' ? 'Student' : 'Professor'}`}
          </button>
        </form>
      </div>
    </div>
  );
}
