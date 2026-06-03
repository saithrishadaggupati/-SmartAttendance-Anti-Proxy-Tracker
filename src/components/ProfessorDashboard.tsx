import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfessorDashboard() {
  const { user, logout } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncLog, setSyncLog] = useState('Camera array ready for QR intake matrix scans.');

  const facultyRoster = [
    { id: "EXEC//01", name: "Director BUBU", code: "CSE-401 (Core)", role: "Advanced Operating Systems", status: "Secure Core" },
    { id: "EXEC//02", name: "Director BUBU", code: "CSE-403 (Core)", role: "Distributed Cloud Architecture", status: "Secure Core" },
    { id: "EXEC//03", name: "Director BUBU", code: "CSE-407 (Core)", role: "Neural Network Telemetry", status: "Secure Core" },
    { id: "EXEC//04", name: "DUDU", code: "CSE-202 (Found)", role: "PA of BUBU & Counselor // Data Structures", status: "Secure Core" },
    { id: "EXEC//05", name: "DUDU", code: "CSE-304 (Found)", role: "PA of BUBU & Counselor // Database Systems", status: "Secure Core" },
    { id: "EXEC//06", name: "BUDU", code: "ECE-301 (Elect)", role: "Other Dept Head // Digital Electronics", status: "Active External" }
  ];

  const handleQRScanSimulation = () => {
    setIsSyncing(true);
    setSyncLog('Opening hardware camera feeds... Scanning incoming authentication QR token...');
    setTimeout(() => {
      setSyncLog('✓ QR Code Verification Decrypted Successful: Node token mapped to internal directory.');
      setIsSyncing(false);
    }, 2000);
  };

  return (
    <div style={{ color: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
      <main style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Top Analytics Panel and Live Cam Scan Widget */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
          
          {/* Administrative Summary Track */}
          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748b' }}>ACTIVE BUBU UNIVERSITY CONSOLE</span>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#f8fafc', marginTop: '4px' }}>{user?.email || 'director.bubu@bubu.edu.in'}</div>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: '6px 0 0 0' }}>Institutional Course Distribution Split: <strong>BUBU (3), DUDU (2), BUDU (1)</strong></p>
            </div>
            <div style={{ backgroundColor: '#090d16', border: '1px solid #1e293b', padding: '12px 16px', borderRadius: '10px', fontFamily: 'monospace', fontSize: '12px', color: '#a855f7' }}>
              <span style={{ color: '#64748b' }}>Hardware Log:</span> {syncLog}
            </div>
          </div>

          {/* Interactive QR Camera Scanner Mock Block */}
          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyBox: 'center', gap: '12px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#64748b' }}>⚡ FACULTY QR AUTH INTENTION</span>
            
            {/* Simulated Scanning Viewport Frame */}
            <div style={{ width: '100%', height: '110px', backgroundColor: '#020617', borderRadius: '12px', border: '2px dashed #a855f7', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '2px', backgroundColor: '#a855f7', position: 'absolute', top: '50%', left: 0, shadow: '0 0 10px #a855f7', animation: 'none' }} />
              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#475569', zIndex: 5 }}>[ HARDWARE CAMERA VIEWPORT ]</span>
            </div>

            <button onClick={handleQRScanSimulation} disabled={isSyncing} style={{ width: '100%', backgroundColor: '#a855f7', border: 'none', color: '#fff', padding: '8px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
              {isSyncing ? 'Processing Scan Matrix...' : '📷 Trigger Quick QR Reader Scan'}
            </button>
          </div>
        </div>

        {/* Structural Matrix Logs Grid Table */}
        <div style={{ backgroundColor: 'rgba(2, 6, 23, 0.7)', border: '1px solid #334155', borderRadius: '20px', padding: '28px', overflowX: 'auto' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 20px 0' }}>Bubu University Department Structural Authority Map</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e293b', color: '#64748b', fontFamily: 'monospace', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 8px' }}>Staff ID Token</th>
                <th style={{ padding: '12px 8px' }}>Faculty Authority Name</th>
                <th style={{ padding: '12px 8px' }}>Course Code Mapped</th>
                <th style={{ padding: '12px 8px' }}>Verified Institutional Target Track</th>
                <th style={{ padding: '12px 8px', textAlign: 'right' }}>Grid Security Status</th>
              </tr>
            </thead>
            <tbody>
              {facultyRoster.map((staff, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #0f172a', backgroundColor: idx % 2 === 0 ? 'rgba(15, 23, 42, 0.2)' : 'transparent' }}>
                  <td style={{ padding: '14px 8px', fontFamily: 'monospace', color: '#94a3b8' }}>{staff.id}</td>
                  <td style={{ padding: '14px 8px', fontWeight: 600, color: '#f1f5f9' }}>{staff.name}</td>
                  <td style={{ padding: '14px 8px', fontFamily: 'monospace', fontSize: '13px', color: '#6366f1', fontWeight: 'bold' }}>{staff.code}</td>
                  <td style={{ padding: '14px 8px', color: '#e2e8f0' }}>{staff.role}</td>
                  <td style={{ padding: '14px 8px', textAlign: 'right' }}>
                    <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '8px', backgroundColor: staff.status === 'Secure Core' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(129, 140, 248, 0.1)', color: staff.status === 'Secure Core' ? '#34d399' : '#818cf8', border: staff.status === 'Secure Core' ? '1px solid rgba(52, 211, 153, 0.2)' : '1px solid rgba(129, 140, 248, 0.2)' }}>
                      {staff.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
