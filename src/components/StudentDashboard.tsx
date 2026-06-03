import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const [status, setStatus] = useState<'idle' | 'scanning' | 'verified'>('idle');
  const [log, setLog] = useState<string>('Biometric telemetry array standing by.');
  
  const academicData = {
    course: "Computer Science Engineering Core (CSE-401)",
    instructor: "Director BUBU (Head of Department)",
    counselor: "DUDU (PA of BUBU / Dept Counselor)",
    daysAttended: 38,
    totalWorkingDays: 50,
    requiredPercentage: 75
  };

  const handleVerify = () => {
    setStatus('scanning');
    setLog('Analyzing webcam facial matrices & processing image validation hash...');
    setTimeout(() => {
      setStatus('verified');
      setLog('✓ Image Match 99.4% Verified. Attendance Signature successfully logged!');
    }, 2500);
  };

  return (
    <div style={{ color: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
      <main style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Profile Card with Mock Image Verification Status */}
        <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Simulated Live Webcam / Image Preview Box */}
            <div style={{ width: '64px', height: '64px', borderRadius: '12px', backgroundColor: '#1e293b', border: '2px solid #3b82f6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <span style={{ fontSize: '24px' }}>👤</span>
              <div style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(59, 130, 246, 0.8)', color: '#fff', fontSize: '8px', textAlign: 'center', fontFamily: 'monospace' }}>CAM LIVE</div>
            </div>
            <div>
              <p style={{ fontSize: '11px', fontFamily: 'monospace', color: '#64748b', margin: 0 }}>BUBU UNIVERSITY VERIFIED ACCOUNT</p>
              <p style={{ fontSize: '16px', fontWeight: 600, color: '#f1f5f9', margin: '2px 0 0 0' }}>{user?.email || 'student@bubu.edu.in'}</p>
            </div>
          </div>
          <span style={{ fontSize: '11px', fontFamily: 'monospace', backgroundColor: 'rgba(52, 211, 153, 0.1)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.2)', padding: '6px 12px', borderRadius: '8px' }}>
            ✓ IMAGE PASSED
          </span>
        </div>

        {/* Dashboard Panels Split: Course Details and Dynamic QR Code Generation */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '24px' }}>
          
          {/* Left Block: Course Details */}
          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748b', display: 'block' }}>ENROLLED COURSE TRACK</span>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#f8fafc', marginTop: '4px' }}>{academicData.course}</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '6px' }}>Instructor: <span style={{ color: '#6366f1', fontWeight: 600 }}>{academicData.instructor}</span></div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Counselor: <span style={{ color: '#a855f7' }}>{academicData.counselor}</span></div>
            </div>
            <div style={{ borderTop: '1px solid #1e293b', paddingTop: '14px' }}>
              <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748b', display: 'block' }}>ATTENDANCE METRIC</span>
              <div style={{ fontSize: '14px', marginTop: '4px' }}>Logged Matrix Balance: <strong>{academicData.daysAttended} / {academicData.totalWorkingDays} Days</strong> (76%)</div>
            </div>
          </div>

          {/* Right Block: Dynamic QR Generation Token */}
          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748b', marginBottom: '12px', display: 'block' }}>PERSONAL ATTENDANCE QR</span>
            
            {/* Interactive Grid-based CSS Mock QR Code */}
            <div style={{ padding: '8px', backgroundColor: '#ffffff', borderRadius: '12px', display: 'inline-block' }}>
              <div style={{ width: '120px', height: '120px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(4, 1fr)', gap: '4px' }}>
                <div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#fff' }} /><div style={{ backgroundColor: '#000' }} />
                <div style={{ backgroundColor: '#fff' }} /><div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#fff' }} />
                <div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#fff' }} /><div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#000' }} />
                <div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#fff' }} /><div style={{ backgroundColor: '#000' }} />
              </div>
            </div>
            <p style={{ fontSize: '9px', fontFamily: 'monospace', color: '#64748b', margin: '8px 0 0 0' }}>REFRESHES EVERY 30S</p>
          </div>
        </div>

        {/* Live Facial Tracking Hardware Form Terminal */}
        <div style={{ backgroundColor: 'rgba(2, 6, 23, 0.7)', border: '1px solid #334155', borderRadius: '20px', padding: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Faculty Hardware & Image Validation</h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 24px 0' }}>Processes dual-layer spatial image matrices for security check-in.</p>
          
          <div style={{ backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px 20px', fontFamily: 'monospace', fontSize: '13px', color: status === 'verified' ? '#4ade80' : '#94a3b8', marginBottom: '24px' }}>
            <span style={{ color: '#6366f1', marginRight: '8px' }}>&gt;</span> {log}
          </div>

          <button onClick={handleVerify} disabled={status === 'scanning' || status === 'verified'} style={{ width: '100%', padding: '14px', background: status === 'verified' ? 'linear-gradient(to right, #10b981, #059669)' : 'linear-gradient(to right, #3b82f6, #1d4ed8)', color: '#ffffff', fontWeight: 'bold', fontSize: '14px', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>
            {status === 'idle' && 'Verify Facial Scan & Register Entry'}
            {status === 'scanning' && 'Running Image Vector Matching algorithms...'}
            {status === 'verified' && '✓ Verification Node Locked'}
          </button>
        </div>
      </main>
    </div>
  );
}
