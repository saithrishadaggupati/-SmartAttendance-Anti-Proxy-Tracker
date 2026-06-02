import React, { useState, useEffect } from "react";

// Mock data to simulate active students in a lecture
const INITIAL_STUDENTS = [
  { id: "22CS201", name: "Ananya Rao", status: "Present", time: "10:02 AM" },
  { id: "22CS216", name: "Sai Thrisha", status: "Present", time: "10:01 AM" },
  { id: "22CS245", name: "Rahul Verma", status: "Absent", time: "-" },
];

export default function ProfessorDashboard() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [qrToken, setQrToken] = useState("INITIAL-SECURE-TOKEN-1234");
  const [timeLeft, setTimeLeft] = useState(60);
  const [activeTab, setActiveTab] = useState("attendance");

  // Simulate a rolling backend token that updates every 60 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Token expires on the backend; generate a fresh one
          setQrToken(`ROLLING-TOKEN-${Math.floor(Math.random() * 90000) + 10000}`);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const presentCount = students.filter((s) => s.status === "Present").length;
  const totalCount = students.length;

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif", backgroundColor: "#f9fafb" }}>
      
      {/* Multi-Tab Admin Sidebar */}
      <div style={{ width: "240px", backgroundColor: "#111827", color: "#fff", padding: "24px 16px" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "32px", paddingLeft: "8px" }}>📊 SmartAttendance</h3>
        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <button 
            onClick={() => setActiveTab("attendance")}
            style={{
              padding: "12px", width: "100%", textAlign: "left", borderRadius: "6px", border: "none", cursor: "pointer",
              backgroundColor: activeTab === "attendance" ? "#2563eb" : "transparent", color: "#fff", fontWeight: "bold"
            }}
          >
            📋 Live Tracking
          </button>
          <button 
            onClick={() => setActiveTab("courses")}
            style={{
              padding: "12px", width: "100%", textAlign: "left", borderRadius: "6px", border: "none", cursor: "pointer",
              backgroundColor: activeTab === "courses" ? "#2563eb" : "transparent", color: "#fff", fontWeight: "bold"
            }}
          >
            📚 Manage Courses
          </button>
        </nav>
      </div>

      {/* Main Panel Content */}
      <div style={{ flex: 1, padding: "32px" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", margin: 0, color: "#111827" }}>CS401: Distributed Systems</h1>
            <p style={{ margin: "4px 0 0 0", color: "#6b7280" }}>Final Year CSE • Section A</p>
          </div>
          <div style={{ backgroundColor: "#eff6ff", color: "#1e40af", padding: "8px 16px", borderRadius: "20px", fontWeight: "bold" }}>
            Live Turnout: {presentCount}/{totalCount} ({Math.round((presentCount / totalCount) * 100)}%)
          </div>
        </header>

        {activeTab === "attendance" ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "32px" }}>
            
            {/* Real-time Student Roster List */}
            <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <h3 style={{ marginTop: 0, marginBottom: "16px" }}>Student Log</h3>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #f3f4f6", color: "#6b7280" }}>
                    <th style={{ padding: "12px 8px" }}>Roll No</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      <td style={{ padding: "12px 8px", fontWeight: "500" }}>{student.id}</td>
                      <td>{student.name}</td>
                      <td>
                        <span style={{
                          padding: "4px 8px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: "bold",
                          backgroundColor: student.status === "Present" ? "#d1fae5" : "#fee2e2",
                          color: student.status === "Present" ? "#065f46" : "#991b1b"
                        }}>{student.status}</span>
                      </td>
                      <td style={{ color: "#6b7280" }}>{student.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Anti-Proxy Security Column (60s Expiry Token) */}
            <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", textAlign: "center" }}>
              <h3 style={{ marginTop: 0, marginBottom: "8px" }}>Anti-Proxy Token</h3>
              <p style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "24px" }}>Shared screen grabs break when this cycles.</p>
              
              {/* Fake QR box representation */}
              <div style={{ width: "180px", height: "180px", backgroundColor: "#f3f4f6", margin: "0 auto 16px auto", border: "2px dashed #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "8px" }}>
                <span style={{ fontSize: "2rem" }}>🔲</span>
                <span style={{ fontSize: "0.65rem", fontFamily: "monospace", color: "#6b7280", wordBreak: "break-all", marginTop: "8px" }}>{qrToken}</span>
              </div>

              <div style={{ fontSize: "0.9rem", fontWeight: "bold", color: timeLeft <= 10 ? "#dc2626" : "#111827" }}>
                Cycling code in: {timeLeft}s
              </div>
            </div>

          </div>
        ) : (
          <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <h3 style={{ marginTop: 0 }}>Course Management</h3>
            <p style={{ color: "#6b7280" }}>Add new subjects, adjust GPS range filters, or update registered student databases.</p>
          </div>
        )}
      </div>

    </div>
  );
}
