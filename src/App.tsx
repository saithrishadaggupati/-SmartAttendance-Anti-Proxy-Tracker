import React, { useState } from "react";
import StudentCheckIn from "./components/StudentCheckIn";
import ProfessorDashboard from "./components/ProfessorDashboard";

export default function App() {
  // A simple view switcher so you can test both interfaces easily on localhost
  const [currentView, setCurrentView] = useState<"student" | "professor">("student");

  return (
    <div>
      {/* Quick Environment Switcher Header for testing */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "12px",
        padding: "10px",
        backgroundColor: "#e2e8f0",
        borderBottom: "1px solid #cbd5e1"
      }}>
        <span style={{ fontSize: "0.9rem", fontWeight: "bold", alignSelf: "center", color: "#475569" }}>
          🔄 Environment Simulator:
        </span>
        <button
          onClick={() => setCurrentView("student")}
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            border: "1px solid #cbd5e1",
            cursor: "pointer",
            fontWeight: "bold",
            backgroundColor: currentView === "student" ? "#fff" : "transparent",
            color: currentView === "student" ? "#0070f3" : "#475569",
            boxShadow: currentView === "student" ? "0 1px 2px rgba(0,0,0,0.05)" : "none"
          }}
        >
          📱 Student Device
        </button>
        <button
          onClick={() => setCurrentView("professor")}
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            border: "1px solid #cbd5e1",
            cursor: "pointer",
            fontWeight: "bold",
            backgroundColor: currentView === "professor" ? "#fff" : "transparent",
            color: currentView === "professor" ? "#2563eb" : "#475569",
            boxShadow: currentView === "professor" ? "0 1px 2px rgba(0,0,0,0.05)" : "none"
          }}
        >
          👨‍🏫 Professor Screen
        </button>
      </div>

      {/* Conditionally rendering our anti-proxy layout views */}
      <main>
        {currentView === "student" ? (
          <div style={{ marginTop: "40px" }}>
            <StudentCheckIn />
          </div>
        ) : (
          <ProfessorDashboard />
        )}
      </main>
    </div>
  );
}
