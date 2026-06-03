import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfessorDashboard() {
  const { user, logout } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncLog, setSyncLog] = useState('All faculty telemetry tracks fully synchronized.');

  // System Roster updated precisely: BUBU (3 courses), DUDU (2 courses), BUDU (1 course)
  const facultyRoster = [
    { id: "EXEC//01", name: "Director BUBU", department: "Computer Science Core", role: "Director & Head (Advanced Core 1)", status: "Secure Core" },
    { id: "EXEC//02", name: "Director BUBU", department: "Computer Science Core", role: "Director & Head (Advanced Core 2)", status: "Secure Core" },
    { id: "EXEC//03", name: "Director BUBU", department: "Computer Science Core", role: "Director & Head (Advanced Core 3)", status: "Secure Core" },
    { id: "EXEC//04", name: "DUDU", department: "Computer Science Core", role: "PA of BUBU / Counselor (Course 1)", status: "Secure Core" },
    { id: "EXEC//05", name: "DUDU", department: "Computer Science Core", role: "PA of BUBU / Counselor (Course 2)", status: "Secure Core" },
    { id: "EXEC//06", name: "BUDU", department: "Peripheral Allied Engineering", role: "Other Dept Head (Core Course)", status: "Active External" }
  ];

  const triggerTelemetrySync = () => {
    setIsSyncing(true);
    setSyncLog('Querying cluster logs for administrative node validation...');
    
    setTimeout(() => {
      setSyncLog('Sync complete. Mapped 3 high-level courses for BUBU, 2 for DUDU, and 1 for BUDU.');
      setIsSyncing(false);
    }, 2000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '40px 24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '10%',
        width: '400px',
        height: '400px',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        pointerEvents: 'none'
      }} />

      {/* Top Header */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto 32px auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #1e293b',
        paddingBottom: '20px'
      }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, letterSpacing: '0.5px' }}>
            Smart Attendance
          </h1>
          <p style={{ fontSize: '12px', color: '#a855f7', margin: '4px 0 0 0', fontFamily: 'monospace', fontWeight: 'bold' }}>
            CORE // FACULTY ARBITRATION VIEW
          </p>
        </div>
        <button
          onClick={logout}
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#f87171',
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Disconnect Terminal
        </button>
      </div>

      <main style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Core Synchronization Analytics */}
        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          padding: '24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '20px'
        }}>
          <div>
            <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748b', textTransform: 'uppercase', display: 'block' }}>Active Administration Terminal</span>
            <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#f8fafc', marginTop: '4px' }}>{user?.email || 'bubu@nitk.edu.in'}</div>
          </div>
          <div>
            <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748b', textTransform: 'uppercase', display: 'block' }}>Directory State Summary</span>
            <div style={{ fontSize: '14px', color: '#e2e8f0', marginTop: '4px' }}>
              Monitored Nodes: <strong style={{ color: '#ffffff' }}>6 Mapped Assignments</strong>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <button
              onClick={triggerTelemetrySync}
              disabled={isSyncing}
              style={{
                backgroundColor: '#6366f1',
                color: '#ffffff',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)'
              }}
            >
              {isSyncing ? 'Syncing Map...' : '🔄 Sync Hardware Feed'}
            </button>
          </div>

          <div style={{ gridColumn: 'span 3', backgroundColor: '#090d16', border: '1px solid #1e293b', padding: '12px 16px', borderRadius: '10px', fontFamily: 'monospace', fontSize: '12px', color: '#a855f7' }}>
            <span style={{ color: '#64748b' }}>System Registry Trace:</span> {syncLog}
          </div>
        </div>

        {/* Structural Matrix Logs */}
        <div style={{
          backgroundColor: 'rgba(2, 6, 23, 0.7)',
          border: '1px solid #334155',
          borderRadius: '20px',
          padding: '28px',
          overflowX: 'auto'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 20px 0' }}>Department Structural Authority Map</h3>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e293b', color: '#64748b', fontFamily: 'monospace', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 8px' }}>Staff ID Token</th>
                <th style={{ padding: '12px 8px' }}>Faculty Authority Name</th>
                <th style={{ padding: '12px 8px' }}>Assigned Department Branch</th>
                <th style={{ padding: '12px 8px' }}>Verified Institutional Role</th>
                <th style={{ padding: '12px 8px', textAlign: 'right' }}>Grid Security Status</th>
              </tr>
            </thead>
            <tbody>
              {facultyRoster.map((staff, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #0f172a', backgroundColor: idx % 2 === 0 ? 'rgba(15, 23, 42, 0.2)' : 'transparent' }}>
                  <td style={{ padding: '14px 8px', fontFamily: 'monospace', color: '#94a3b8' }}>{staff.id}</td>
                  <td style={{ padding: '14px 8px', fontWeight: 600, color: '#f1f5f9' }}>{staff.name}</td>
                  <td style={{ padding: '14px 8px', color: '#e2e8f0' }}>{staff.department}</td>
                  <td style={{ padding: '14px 8px', fontFamily: 'monospace', fontSize: '12px', color: '#cbd5e1' }}>{staff.role}</td>
                  <td style={{ padding: '14px 8px', textAlign: 'right' }}>
                    <span style={{
                      display: 'inline-block',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: staff.status === 'Secure Core' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(129, 140, 248, 0.1)',
                      color: staff.status === 'Secure Core' ? '#34d399' : '#818cf8',
                      border: staff.status === 'Secure Core' ? '1px solid rgba(52, 211, 153, 0.2)' : '1px solid rgba(129, 140, 248, 0.2)'
                    }}>
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
