import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { bubuUniversityStudents } from './StudentRosterData';

export default function ProfessorDashboard() {
  const { logout } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncLog, setSyncLog] = useState('Camera array ready for QR intake matrix scans.');
  const [viewMode, setViewMode] = useState<'faculty' | 'students'>('faculty');

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
    setSyncLog('Opening hardware camera viewports... Scanning token credentials...');
    setTimeout(() => {
      setSyncLog('✓ QR Read Match Success: Identity validation hash verified securely.');
      setIsSyncing(false);
    }, 1500);
  };

  return (
    <div style={{ color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px', backgroundColor: '#020617', minHeight: '100vh' }}>
      
      {/* Top Header Row */}
      <div style={{ maxWidth: '1100px', margin: '0 auto 24px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>BUBU UNIVERSITY</h1>
          <p style={{ fontSize: '11px', fontFamily: 'monospace', color: '#a855f7', margin: '4px 0 0 0' }}>ADMINISTRATIVE HUB</p>
        </div>
        <button onClick={logout} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '8px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
          Disconnect Console
        </button>
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Header Metadata Panels */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748b' }}>ACTIVE CORE MONITOR STATUS</span>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: '6px 0 0 0' }}>Institutional Split: <strong>BUBU (3), DUDU (2), BUDU (1)</strong> | Total Pool: <strong>20 Registered Students</strong></p>
            </div>
            <div style={{ backgroundColor: '#090d16', border: '1px solid #1e293b', padding: '12px 16px', borderRadius: '10px', fontFamily: 'monospace', fontSize: '12px', color: '#a855f7' }}>
              <span style={{ color: '#64748b' }}>System Feedback Logs:</span> {syncLog}
            </div>
          </div>

          {/* Fixed: Replaced justifyBox with valid layout rules */}
          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#64748b' }}>⚡ FACULTY PASSPORT QR PORT</span>
            {/* Fixed: Replaced shadow with boxShadow property */}
            <div style={{ width: '100%', height: '90px', backgroundColor: '#020617', borderRadius: '12px', border: '2px dashed #a855f7', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#475569' }}>[ CAMERA VIEWPORT ACTIVE ]</span>
            </div>
            <button onClick={handleQRScanSimulation} disabled={isSyncing} style={{ width: '100%', backgroundColor: '#a855f7', border: 'none', color: '#fff', padding: '10px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
              {isSyncing ? 'Parsing Scanning Grids...' : '📷 Scan Identification Pass'}
            </button>
          </div>
        </div>

        {/* View Toggle Bar */}
        <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
          <button onClick={() => setViewMode('faculty')} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', backgroundColor: viewMode === 'faculty' ? '#a855f7' : '#1e293b', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
            📋 Faculty Distribution Matrix (3-2-1)
          </button>
          <button onClick={() => setViewMode('students')} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', backgroundColor: viewMode === 'students' ? '#a855f7' : '#1e293b', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
            👥 Student Database Registry ({bubuUniversityStudents.length} Profiles)
          </button>
        </div>

        {/* Dynamic Data Grids */}
        {viewMode === 'faculty' ? (
          <div style={{ backgroundColor: 'rgba(2, 6, 23, 0.7)', border: '1px solid #334155', borderRadius: '20px', padding: '24px', overflowX: 'auto' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px 0' }}>Bubu University Structural Authority Map</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e293b', color: '#64748b', fontFamily: 'monospace' }}>
                  <th style={{ padding: '10px' }}>Staff Reference Token</th>
                  <th style={{ padding: '10px' }}>Faculty Authority Name</th>
                  <th style={{ padding: '10px' }}>Course Code Mapped</th>
                  <th style={{ padding: '10px' }}>Target Course Specialization Track</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Security Link</th>
                </tr>
              </thead>
              <tbody>
                {facultyRoster.map((staff, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #0f172a' }}>
                    <td style={{ padding: '12px 10px', fontFamily: 'monospace', color: '#94a3b8' }}>{staff.id}</td>
                    <td style={{ padding: '12px 10px', fontWeight: 600 }}>{staff.name}</td>
                    <td style={{ padding: '12px 10px', fontFamily: 'monospace', color: '#6366f1', fontWeight: 'bold' }}>{staff.code}</td>
                    <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>{staff.role}</td>
                    <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '6px', backgroundColor: 'rgba(52, 211, 153, 0.1)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.2)' }}>{staff.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ backgroundColor: 'rgba(2, 6, 23, 0.7)', border: '1px solid #334155', borderRadius: '20px', padding: '24px', overflowX: 'auto' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px 0' }}>BUBU UNIVERSITY Core Student Attendance Pool</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e293b', color: '#64748b', fontFamily: 'monospace' }}>
                  <th style={{ padding: '10px' }}>Student Matric ID</th>
                  <th style={{ padding: '10px' }}>Account Name</th>
                  <th style={{ padding: '10px' }}>Institutional Email</th>
                  <th style={{ padding: '10px' }}>Enrolled Code</th>
                  <th style={{ padding: '10px' }}>Attendance Metrics</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Image Verification</th>
                </tr>
              </thead>
              <tbody>
                {bubuUniversityStudents.map((student, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #0f172a', backgroundColor: idx % 2 === 0 ? 'rgba(15, 23, 42, 0.1)' : 'transparent' }}>
                    <td style={{ padding: '10px', fontFamily: 'monospace', color: '#94a3b8' }}>{student.id}</td>
                    <td style={{ padding: '10px', fontWeight: 600, color: '#f1f5f9' }}>{student.name}</td>
                    <td style={{ padding: '10px', color: '#cbd5e1' }}>{student.email}</td>
                    <td style={{ padding: '10px', fontFamily: 'monospace', color: '#6366f1' }}>{student.courseCode}</td>
                    <td style={{ padding: '10px', fontWeight: '500', color: student.attendance.includes('62%') || student.attendance.includes('56%') || student.attendance.includes('60%') ? '#f87171' : '#e2e8f0' }}>{student.attendance}</td>
                    <td style={{ padding: '10px', textAlign: 'right' }}>
                      <span style={{ fontSize: '10px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px', backgroundColor: student.imageStatus === 'PASSED' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: student.imageStatus === 'PASSED' ? '#34d399' : '#f87171' }}>
                        ● {student.imageStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
