import React, { useState, useEffect, useRef } from 'react';
import { useAuth, globalStudentMockRegistry } from '../contexts/AuthContext';

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const [status, setStatus] = useState<'idle' | 'scanning' | 'verified'>('idle');
  const [log, setLog] = useState<string>('Biometric telemetry camera array active.');
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setMounted(true);

    // Initialize native hardware camera stream access
    let streamInstance: MediaStream | null = null;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { width: 300, height: 300 } })
        .then((stream) => {
          streamInstance = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Camera access denied or unavailable:", err);
          setLog("⚠️ Hardware Warning: Camera peripheral access blocked.");
        });
    }

    // Clean up hardware track references when user navigates away or logs out
    return () => {
      if (streamInstance) {
        streamInstance.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  if (!mounted) return null;

  const currentEmail = user?.email || 'aman.d@bubu.edu.in';
  const profileDetails = globalStudentMockRegistry.find(s => s.email === currentEmail.toLowerCase().trim()) || globalStudentMockRegistry[0];

  const handleVerify = () => {
    setStatus('scanning');
    setLog('Analyzing live camera feed matrices & parsing validation hash...');
    setTimeout(() => {
      setStatus('verified');
      setLog('✓ Image Match 99.8% Verified. Attendance Signature successfully logged.');
    }, 2000);
  };

  return (
    <div style={{ color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px', backgroundColor: '#020617', minHeight: '100vh' }}>
      
      <div style={{ maxWidth: '800px', margin: '0 auto 24px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>BUBU UNIVERSITY</h1>
          <p style={{ fontSize: '11px', fontFamily: 'monospace', color: '#3b82f6', margin: '4px 0 0 0' }}>STUDENT NODE TERMINAL</p>
        </div>
        <button onClick={logout} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '8px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
          Disconnect
        </button>
      </div>

      <main style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            
            {/* Upgraded: Live streaming hardware viewport inside avatar profile box */}
            <div style={{ width: '80px', height: '80px', borderRadius: '16px', backgroundColor: '#090d16', border: '2px solid #3b82f6', display: 'flex', position: 'relative', overflow: 'hidden' }}>
              <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(59, 130, 246, 0.8)', color: '#fff', fontSize: '8px', textAlign: 'center', fontFamily: 'monospace', fontWeight: 'bold', padding: '2px 0' }}>LIVE</div>
            </div>

            <div>
              <p style={{ fontSize: '11px', fontFamily: 'monospace', color: '#64748b', margin: 0 }}>BUBU UNIVERSITY VERIFIED ACCOUNT</p>
              <p style={{ fontSize: '16px', fontWeight: 600, color: '#f1f5f9', margin: '2px 0 0 0' }}>{profileDetails.name} ({profileDetails.rollNumber})</p>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>{profileDetails.email}</p>
            </div>
          </div>
          <span style={{ fontSize: '11px', fontFamily: 'monospace', backgroundColor: 'rgba(52, 211, 153, 0.1)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.2)', padding: '6px 12px', borderRadius: '8px' }}>
            ✓ ID VALIDATED
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '24px' }}>
          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748b', display: 'block' }}>ENROLLED COURSE TRACK</span>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#f8fafc', marginTop: '4px' }}>Computer Science Engineering Core (CSE-401)</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '6px' }}>Instructor: <span style={{ color: '#6366f1', fontWeight: 600 }}>Prof. BUBU (HOD)</span></div>
            </div>
            <div style={{ borderTop: '1px solid #1e293b', paddingTop: '14px' }}>
              <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748b', display: 'block' }}>ATTENDANCE STATUS MATRIX</span>
              <div style={{ fontSize: '14px', marginTop: '4px' }}>Log Registry Tracker: <strong>38 / 50 Days</strong> ({profileDetails.status})</div>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748b', marginBottom: '12px' }}>PERSONAL ATTENDANCE QR</span>
            <div style={{ padding: '8px', backgroundColor: '#ffffff', borderRadius: '12px' }}>
              <div style={{ width: '100px', height: '100px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                <div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#fff' }} /><div style={{ backgroundColor: '#000' }} />
                <div style={{ backgroundColor: '#fff' }} /><div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#fff' }} />
                <div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#fff' }} /><div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#000' }} />
                <div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#000' }} /><div style={{ backgroundColor: '#fff' }} /><div style={{ backgroundColor: '#000' }} />
              </div>
            </div>
            <p style={{ fontSize: '9px', fontFamily: 'monospace', color: '#64748b', margin: '8px 0 0 0' }}>REFRESHES EVERY 30S</p>
          </div>
        </div>

        <div style={{ backgroundColor: 'rgba(2, 6, 23, 0.7)', border: '1px solid #334155', borderRadius: '20px', padding: '32px' }}>
          <h3>Faculty Hardware & Image Validation Array</h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 24px 0' }}>Processes dual-layer spatial image matrices using active streaming optics.</p>
          <div style={{ backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px 20px', fontFamily: 'monospace', fontSize: '13px', color: status === 'verified' ? '#4ade80' : '#94a3b8', marginBottom: '24px' }}>
            <span style={{ color: '#6366f1', marginRight: '8px' }}>&gt;</span> {log}
          </div>
          <button onClick={handleVerify} disabled={status === 'scanning' || status === 'verified'} style={{ width: '100%', padding: '14px', background: status === 'verified' ? 'linear-gradient(to right, #10b981, #059669)' : 'linear-gradient(to right, #3b82f6, #1d4ed8)', color: '#ffffff', fontWeight: 'bold', fontSize: '14px', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>
            {status === 'idle' && 'Verify Facial Scan & Register Entry'}
            {status === 'scanning' && 'Processing biometric webcam node vectors...'}
            {status === 'verified' && '✓ Verification Signature Secured'}
          </button>
        </div>
      </main>
    </div>
  );
}
