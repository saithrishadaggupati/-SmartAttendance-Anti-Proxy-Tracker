import React, { useState, useEffect } from "react";
import { db } from "../../services/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import StudentScanner from "../../components/StudentScanner";

interface AttendanceRecord {
  id: string;
  course: string;
  timestamp: any;
}

export function StudentDashboard() {
  const [history, setHistory] = useState<AttendanceRecord[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  
  const studentId = "std_002";
  const studentName = "Ananya";

  useEffect(() => {
    // We removed orderBy from here so Firestore doesn't demand an index!
    const attendanceRef = collection(db, "attendance");
    const q = query(
      attendanceRef,
      where("studentId", "==", studentId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const records: AttendanceRecord[] = [];
      snapshot.forEach((doc) => {
        records.push({
          id: doc.id,
          ...doc.data()
        } as AttendanceRecord);
      });

      // Sort the records locally by timestamp (newest first)
      records.sort((a, b) => {
        const timeA = a.timestamp?.seconds || 0;
        const timeB = b.timestamp?.seconds || 0;
        return timeB - timeA; 
      });

      setHistory(records);
      setLoadingHistory(false);
    }, (error) => {
      console.error("Error fetching attendance history:", error);
      setLoadingHistory(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9FAFB", padding: "24px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#FFFFFF", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", padding: "32px", border: "1px solid #E5E7EB" }}>
        
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827", margin: "0 0 4px 0" }}>⚙️ Student Attendance Portal</h1>
          <p style={{ color: "#6B7280", fontSize: "14px", margin: "0" }}>Welcome back, <strong style={{ color: "#4F46E5" }}>{studentName}</strong></p>
        </div>

        <p style={{ color: "#4B5563", fontSize: "14px", margin: "0 0 24px 0" }}>
          Scan the active dynamic QR code projected on the classroom board to verify your presence for today's lecture.
        </p>
        
        <div style={{ backgroundColor: "#EEF2F6", borderRadius: "8px", padding: "16px", marginBottom: "32px" }}>
          <StudentScanner studentId={studentId} studentName={studentName} />
        </div>
        
        <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", color: "#111827", marginBottom: "16px" }}>📊 Your Attendance History</h2>
          
          {loadingHistory ? (
            <p style={{ color: "#9CA3AF", fontSize: "14px" }}>Loading records...</p>
          ) : history.length === 0 ? (
            <p style={{ color: "#9CA3AF", fontSize: "14px", fontStyle: "italic" }}>No attendance logs found for this session yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #E5E7EB", color: "#4B5563" }}>
                    <th style={{ padding: "8px 12px", fontWeight: "600" }}>Course Code</th>
                    <th style={{ padding: "8px 12px", fontWeight: "600" }}>Status</th>
                    <th style={{ padding: "8px 12px", fontWeight: "600" }}>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((record) => (
                    <tr key={record.id} style={{ borderBottom: "1px solid #F3F4F6", color: "#111827" }}>
                      <td style={{ padding: "12px", fontWeight: "500" }}>{record.course}</td>
                      <td style={{ padding: "12px" }}>
                        <span style={{ backgroundColor: "#D1FAE5", color: "#065F46", padding: "4px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: "500" }}>
                          Present
                        </span>
                      </td>
                      <td style={{ padding: "12px", color: "#6B7280" }}>
                        {record.timestamp ? new Date(record.timestamp.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "Just now"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div style={{ borderTop: "1px solid #E5E7EB", marginTop: "32px", paddingTop: "16px", textAlign: "center" }}>
          <span style={{ fontSize: "12px", color: "#9CA3AF" }}>🔒 Powered by Real-Time Cryptographic Verification Engine</span>
        </div>
      </div>
    </div>
  );
}
