import React, { useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import { isWithinClassroom } from "../utils/geoDistance";

// Mocking the professor's classroom coordinates for testing.
// In production, this would be fetched dynamically from Firestore via the scanned QR code.
const PROFESSOR_CLASSROOM_LOCATION = {
  latitude: 13.0108, // Example: NITK campus latitude coordinates
  longitude: 74.7943, // Example: NITK campus longitude coordinates
};

export default function StudentCheckIn() {
  const { latitude, longitude, error, loading, requestLocation } = useGeolocation();
  const [checkInStatus, setCheckInStatus] = useState<string | null>(null);

  const handleCheckIn = () => {
    // 1. Kickstart the device GPS tracking
    requestLocation();
    
    // We wait for the coordinates to register from the hook
    if (latitude && longitude) {
      // 2. Run the math to see if the student is within 100 meters
      const verified = isWithinClassroom(
        { latitude, longitude },
        PROFESSOR_CLASSROOM_LOCATION,
        100 // 100 meters boundary
      );

      if (verified) {
        setCheckInStatus("Success! Your attendance has been securely marked.");
        // Here is where we would also run: docRef.update() to sync with Firebase
      } else {
        setCheckInStatus("Check-in Failed: You are outside the 100-meter classroom radius.");
      }
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "400px", margin: "auto", fontFamily: "sans-serif" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>📍 Classroom Verification</h2>
      <p style={{ color: "#666", marginBottom: "24px" }}>
        Make sure your browser location is enabled so we can verify you are physically in the room.
      </p>

      <button
        onClick={handleCheckIn}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: loading ? "#ccc" : "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        {loading ? "Verifying coordinates..." : "Mark My Attendance"}
      </button>

      {/* Display error notifications from the browser's Geolocation API */}
      {error && (
        <div style={{ marginTop: "16px", padding: "12px", backgroundColor: "#ffebee", color: "#c62828", borderRadius: "6px" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Display internal check-in status (Proxy check math results) */}
      {checkInStatus && (
        <div style={{
          marginTop: "16px", 
          padding: "12px", 
          backgroundColor: checkInStatus.includes("Success") ? "#e8f5e9" : "#fff3e0", 
          color: checkInStatus.includes("Success") ? "#2e7d32" : "#ef6c00", 
          borderRadius: "6px"
        }}>
          {checkInStatus}
        </div>
      )}
    </div>
  );
}
