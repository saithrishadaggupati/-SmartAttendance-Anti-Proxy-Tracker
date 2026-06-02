import React, { useState } from 'react';
import { db } from '../services/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

interface StudentScannerProps {
  studentId?: string;
  studentName?: string;
}

export default function StudentScanner({ 
  studentId = "22CS216", 
  studentName = "Sai Thrisha" 
}: StudentScannerProps) {
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('Ready to verify');
  const [loading, setLoading] = useState(false);
  
  // DEVELOPMENT OVERRIDE TOGGLE: Set to false to test the geofence check from anywhere!
  const [strictGeofenceActive, setStrictGeofenceActive] = useState(false);

  // Target Location Center Point: NITK Campus Coordinates
  const TARGET_LAT = 13.0108; 
  const TARGET_LON = 74.7943; 
  const ALLOWED_RADIUS_METERS = 100;

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; 
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) *
      Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
  };

  const handleManualCheckIn = () => {
    setLoading(true);
    setScanStatus('scanning');
    setStatusMessage("Synchronizing device GPS telemetry...");

    if (!navigator.geolocation) {
      setScanStatus('error');
      setStatusMessage("❌ Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const studentLat = position.coords.latitude;
        const studentLon = position.coords.longitude;

        const distance = calculateDistance(studentLat, studentLon, TARGET_LAT, TARGET_LON);
        console.log(`📡 GPS Sync: Lat ${studentLat}, Lon ${studentLon}`);
        console.log(`📏 Distance to NITK: ${distance.toFixed(2)} meters`);

        // Check if Geofence restriction is active
        if (strictGeofenceActive && distance > ALLOWED_RADIUS_METERS) {
          setScanStatus('error');
          setStatusMessage(`❌ Out of Bounds! You are ${distance.toFixed(0)}m away from the campus.`);
          alert(`❌ Access Denied! Geofencing validation requires you to be inside classroom boundaries.`);
          setLoading(false);
          return;
        }

        try {
          const tokensRef = collection(db, "active_tokens");
          const q = query(tokensRef, where("status", "==", "active"));
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            setScanStatus('error');
            setStatusMessage("❌ No active lecture token found on the board!");
            alert("❌ Check-in failed: Ensure the professor has generated an active QR session.");
            setLoading(false);
            return;
          }

          const activeTokenDoc = querySnapshot.docs[0].data();
          const activeCourseCode = activeTokenDoc.course || "CSE-101";

          await addDoc(collection(db, "attendance"), {
            studentId: studentId,
            studentName: studentName,
            course: activeCourseCode,
            timestamp: serverTimestamp(),
            locationVerified: {
              lat: studentLat,
              lon: studentLon,
              distanceMeters: Math.round(distance),
              geofenceBypassed: !strictGeofenceActive
            }
          });

          setScanStatus('success');
          setStatusMessage(`🎉 Attendance marked successfully for ${activeCourseCode}!`);
          alert(`🎉 Check-In Verified Successfully for ${activeCourseCode}!`);
        } catch (error) {
          console.error("Firebase Verification Error:", error);
          setScanStatus('error');
          setStatusMessage("❌ Database communication failed.");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("GPS Error:", error);
        setScanStatus('error');
        setStatusMessage("❌ Location access denied. Please grant GPS permissions.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
      
      {/* Interactive Geofence Controller Toggle */}
      <div style={{ width: '100%', maxWidth: '380px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: strictGeofenceActive ? '#FEE2E2' : '#D1FAE5', padding: '10px 14px', borderRadius: '8px', marginBottom: '12px', border: strictGeofenceActive ? '1px solid #FCA5A5' : '1px solid #A7F3D0', fontSize: '13px' }}>
        <span style={{ fontWeight: '600', color: strictGeofenceActive ? '#991B1B' : '#065F46' }}>
          {strictGeofenceActive ? "🛡️ Proximity Guard: ACTIVE" : "🔓 Testing Mode: OVERRIDE BYPASS"}
        </span>
        <button 
          onClick={() => setStrictGeofenceActive(!strictGeofenceActive)}
          style={{ backgroundColor: strictGeofenceActive ? '#EF4444' : '#10B981', color: 'white', padding: '4px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}
        >
          {strictGeofenceActive ? "Bypass" : "Activate Guard"}
        </button>
      </div>

      <div 
        style={{ 
          width: '100%', 
          maxWidth: '380px', 
          backgroundColor: '#111827', 
          borderRadius: '12px', 
          padding: '24px', 
          textAlign: 'center',
          color: '#F3F4F6',
          border: '2px dashed #4F46E5',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
          marginBottom: '1rem'
        }}
      >
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>📡</div>
        <h4 style={{ margin: '0 0 6px 0', color: '#FFF' }}>Secure Location Check-In</h4>
        <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0 }}>
          {strictGeofenceActive 
            ? "Verifies strict 100m proximity constraints against NITK lecture hall center points." 
            : "Development mode active: Location logging simulated successfully."}
        </p>
      </div>

      <button
        onClick={handleManualCheckIn}
        disabled={loading}
        style={{
          width: '100%',
          maxWidth: '380px',
          backgroundColor: loading ? '#9CA3AF' : '#4F46E5',
          color: 'white',
          padding: '12px',
          borderRadius: '8px',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          fontSize: '14px'
        }}
      >
        {loading ? "Verifying Satellite Sync..." : "⚡ Secure Verification Check-in"}
      </button>
      
      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <p style={{ 
          fontSize: '15px', 
          fontWeight: 'bold', 
          color: scanStatus === 'success' ? '#10B981' : scanStatus === 'error' ? '#EF4444' : '#374151' 
        }}>
          {statusMessage}
        </p>
      </div>
    </div>
  );
}
