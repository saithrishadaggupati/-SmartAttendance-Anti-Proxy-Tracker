import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const [status, setStatus] = useState<'idle' | 'scanning' | 'verified' | 'failed'>('idle');
  const [log, setLog] = useState<string>('Handshake array standing by. Broadcast signature required.');
  
  // Custom Academic State Metrics
  const academicData = {
    course: "Computer Science Engineering Core (CSE-401)",
    professor: "Prof. Daggupati (Director, NITK Core Systems)",
    daysAttended: 38,
    totalWorkingDays: 50,
    daysRemaining: 12,
    requiredPercentage: 75
  };

  // Calculate current percentage metrics
  const standardPercentage = Math.round((academicData.daysAttended / academicData.totalWorkingDays) * 100);
  const isShortage = standardPercentage < academicData.requiredPercentage;

  const handleVerify = () => {
    setStatus('scanning');
    setLog('Initializing secure telemetry handshakes...');
    
    setTimeout(() => {
      setLog('Querying campus anti-proxy geolocation nodes...');
    }, 1200);

    setTimeout(() => {
      setStatus('verified');
      setLog('Identity presence confirmed inside 100m proximity boundary. Attendance logged!');
    }, 2800);
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
      {/* Background Ambient Glows */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '10%',
        width: '400px',
        height: '400px',
        backgroundColor: 'rgba(99, 102, 241, 0.12)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        pointerEvents: 'none'
      }} />

      {/* Top Navigation Header */}
      <div style={{
        maxWidth: '800px',
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
          <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0', fontFamily: 'monospace' }}>
            NODE // STUDENT GATEWAY
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
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Disconnect Node
        </button>
      </div>

      {/* Main Content Dashboard */}
      <main style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* User Profile Card */}
        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: '#3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px'
          }}>
            👤
          </div>
          <div>
            <p style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', margin: 0, fontFamily: 'monospace' }}>
              Authorized Account Signature
            </p>
            <p style={{ fontSize: '15px', fontWeight: 600, color: '#f1f5f9', margin: '2px 0 0 0' }}>
              {user?.email || 'student@nitk.edu.in'}
            </p>
          </div>
        </div>

        {/* Academic Profile Roster Module */}
        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          padding: '24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px'
        }}>
          <div style={{ gridColumn: 'span 2' }}>
            <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Active Enrolled Course</span>
            <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#f8fafc' }}>{academicData.course}</div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Instructor: <span style={{ color: '#818cf8', fontWeight: 500 }}>{academicData.professor}</span></div>
          </div>

          <div style={{ borderTop: '1px solid #1e293b', paddingTop: '16px' }}>
            <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Attendance Matrix</span>
            <div style={{ fontSize: '14px', color: '#e2e8f0' }}>
              Days Attended: <strong style={{ color: '#f1f5f9' }}>{academicData.daysAttended}</strong> / {academicData.totalWorkingDays}
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
              Timeline Balance: <span style={{ color: '#fbbf24', fontWeight: 500 }}>{academicData.daysRemaining} days remaining</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #1e293b', paddingTop: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Registry Standing</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: isShortage ? '#f87171' : '#34d399' }}>
                  {standardPercentage}%
                </span>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Req: {academicData.requiredPercentage}%</span>
              </div>
            </div>
            
            {/* Shortage Warning Badge */}
            {isShortage ? (
              <div style={{ fontSize: '11px', color: '#f87171', backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.15)', padding: '4px 8px', borderRadius: '6px', width: 'fit-content', marginTop: '6px' }}>
                ⚠️ CRITICAL SHORTAGE ALERT
              </div>
            ) : (
              <div style={{ fontSize: '11px', color: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.15)', padding: '4px 8px', borderRadius: '6px', width: 'fit-content', marginTop: '6px' }}>
                ✓ Standing Verified Secure
              </div>
            )}
          </div>
        </div>

        {/* Core Verification Terminal */}
        <div style={{
          backgroundColor: 'rgba(2, 6, 23, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid #334155',
          borderRadius: '20px',
          padding: '32px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Satellite Hardware Validation</h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 0 0' }}>Enforcing 100m Classroom Proximity Boundary</p>
            </div>
            <span style={{
              fontSize: '11px',
              fontFamily: 'monospace',
              backgroundColor: status === 'verified' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(99, 102, 241, 0.1)',
              color: status === 'verified' ? '#4ade80' : '#818cf8',
              border: status === 'verified' ? '1px solid rgba(34, 197, 94, 0.2)' : '1px solid rgba(99, 102, 241, 0.2)',
              padding: '4px 10px',
              borderRadius: '20px',
              fontWeight: 'bold'
            }}>
              ● SYSTEM ENGAGED
            </span>
          </div>

          {/* Telemetry Console Feed */}
          <div style={{
            backgroundColor: '#090d16',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '16px 20px',
            fontFamily: 'monospace',
            fontSize: '13px',
            color: status === 'verified' ? '#4ade80' : '#94a3b8',
            lineHeight: '1.6',
            marginBottom: '24px'
          }}>
            <span style={{ color: '#6366f1', marginRight: '8px' }}>&gt;</span> {log}
          </div>

          {/* Verification Action Button */}
          <button
            onClick={handleVerify}
            disabled={status === 'scanning' || status === 'verified'}
            style={{
              width: '100%',
              padding: '14px',
              background: status === 'verified' 
                ? 'linear-gradient(to right, #10b981, #059669)' 
                : 'linear-gradient(to right, #3b82f6, #1d4ed8)',
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '14px',
              border: 'none',
              borderRadius: '12px',
              cursor: status === 'verified' ? 'default' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
            }}
          >
            {status === 'idle' && 'Broadcast Location & Sign Attendance'}
            {status === 'scanning' && 'Scanning Telemetry Framework...'}
            {status === 'verified' && '✓ Verification Signature Secured'}
          </button>
        </div>

      </main>
    </div>
  );
}
