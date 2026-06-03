import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginForm() {
  const { login } = useAuth();
  const [role, setRole] = useState<'student' | 'professor'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);

    // Bypassed Validation: Generates dummy fallback handles if inputs are left blank
    setTimeout(() => {
      login({
        email: email || (role === 'student' ? 'harish.v@bubu.edu.in' : 'director.bubu@bubu.edu.in'),
        name: role === 'student' ? 'Harish Venkat' : 'Director BUBU Cluster',
        role: role
      });
      setIsConnecting(false);
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#020617',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '440px',
        width: '100%',
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid #1e293b',
        borderRadius: '24px',
        padding: '40px 32px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '48px',
            width: '48px',
            borderRadius: '16px',
            background: role === 'student' ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 'linear-gradient(135deg, #a855f7, #6b21a8)',
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}>
            BU
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 900, margin: 0, letterSpacing: '-0.5px' }}>
            BUBU UNIVERSITY
          </h2>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '6px 0 0 0', fontFamily: 'monospace' }}>
            IDENTITY AUTHENTICATION GATEWAY
          </p>
        </div>

        <div style={{ display: 'flex', backgroundColor: '#0f172a', padding: '4px', borderRadius: '12px', border: '1px solid #1e293b', marginBottom: '28px' }}>
          <button type="button" onClick={() => setRole('student')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: role === 'student' ? '#1e293b' : 'transparent', color: role === 'student' ? '#3b82f6' : '#94a3b8', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
            🔑 Student Node
          </button>
          <button type="button" onClick={() => setRole('professor')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: role === 'professor' ? '#1e293b' : 'transparent', color: role === 'professor' ? '#a855f7' : '#94a3b8', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
            📊 Faculty Core
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontFamily: 'monospace', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
              University Email Handle
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === 'student' ? 'harish.v@bubu.edu.in' : 'director.bubu@bubu.edu.in'}
              style={{ width: '100%', padding: '12px 16px', backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '12px', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontFamily: 'monospace', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
              Security Password Key
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Bypass Mode Enabled"
              style={{ width: '100%', padding: '12px 16px', backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '12px', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <button
            type="submit"
            disabled={isConnecting}
            style={{
              width: '100%',
              padding: '14px',
              background: role === 'student' ? 'linear-gradient(to right, #3b82f6, #1d4ed8)' : 'linear-gradient(to right, #a855f7, #7c3aed)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {isConnecting ? 'Bypassing Gate Matrix...' : `Instant Login as ${role === 'student' ? 'Student' : 'Professor'}`}
          </button>
        </form>
      </div>
    </div>
  );
}
