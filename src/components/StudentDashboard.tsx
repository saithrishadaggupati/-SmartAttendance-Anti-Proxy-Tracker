import React, { useState, useEffect } from 'react';
import { useAuth, globalStudentMockRegistry } from '../contexts/AuthContext';

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentEmail = user?.email || 'aman.d@bubu.edu.in';
  const profileDetails = globalStudentMockRegistry.find(s => s.email === currentEmail.toLowerCase().trim()) || globalStudentMockRegistry[0];

  return (
    <div style={{ color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px', backgroundColor: '#020617', minHeight: '100vh' }}>
      
      {/* Top Header Controls */}
      <div style={{ maxWidth: '600px', margin: '0 auto 24px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>BUBU UNIVERSITY</h1>
          <p style={{ fontSize: '11px', fontFamily: 'monospace', color: '#3b82f6', margin: '4px 0 0 0' }}>STUDENT CARD MATRIX</p>
        </div>
        <button onClick={logout} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '8px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
          Disconnect
        </button>
      </div>

      {/* Main Streamlined Card Layout */}
      <main style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Verification Token Receipt */}
        <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', textAlign: 'center' }}>
          
          <div>
            <p style={{ fontSize: '11px', fontFamily: 'monospace', color: '#64748b', margin: 0, uppercase: 'true' }}>INSTITUTIONAL PASSPORT RECOGNITION KEY</p>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f1f5f9', margin: '4px 0 0 0' }}>{profileDetails.name}</h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '2px 0 0 0', fontFamily: 'monospace' }}>Roll No: {profileDetails.rollNumber} | {profileDetails.email}</p>
          </div>

          {/* Centralized High-Contrast Identification QR Block for Faculty Scan */}
          <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
            <div style={{ width: '160px', height: '160px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
              <div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#fff' }} /><div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#000' }} />
              <div style={{ backgroundColor: '#fff' }} /><div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#fff' }} /><div style={{ backgroundColor: '#fff' }} /><div style={{ backgroundColor: '#fff' }} />
              <div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#fff' }} /><div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#fff' }} />
              <div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#fff' }} /><div style={{ backgroundColor: '#fff' }} /><div style={{ backgroundColor: '#000' }} />
              <div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#fff' }} /><div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#000' }} />
            </div>
          </div>

          <div style={{ borderTop: '1px solid #1e293b', width: '100%', paddingTop: '20px', display: 'flex', justifyContent: 'space-around', fontSize: '13px' }}>
            <div>
              <span style={{ color: '#64748b', display: 'block', fontSize: '11px', fontFamily: 'monospace' }}>ENROLLED TRACK</span>
              <strong style={{ color: '#3b82f6' }}>CSE-401 Core</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', display: 'block', fontSize: '11px', fontFamily: 'monospace' }}>ATTENDANCE STATE</span>
              <strong style={{ color: '#34d399' }}>{profileDetails.status} (38/50)</strong>
            </div>
          </div>
          
          <p style={{ fontSize: '11px', fontFamily: 'monospace', color: '#475569', margin: 0 }}>
            Present this authentication barcode to the Faculty terminal console array for tracking confirmation.
          </p>
        </div>

      </main>
    </div>
  );
}
