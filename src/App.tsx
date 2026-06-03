import './index.css';
import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import StudentDashboard from './components/StudentDashboard';
import ProfessorDashboard from './components/ProfessorDashboard';

function NavigationWrapper() {
  const { user, logout } = useAuth();

  // If no active auth payload signature is located, redirect to account log gateway form
  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 antialiased selection:bg-indigo-500/30 flex flex-col">
      {/* Premium Global Top Navigation Strip */}
      <nav className="border-b border-slate-800/60 bg-slate-950/40 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 text-sm">
              SA
            </div>
            <div>
              <h1 className="text-sm font-black tracking-wider text-white uppercase">Smart Attendance</h1>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-tight">Active Identity Authentication Node</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-200">{user.name}</p>
              <p className="text-[10px] font-mono text-indigo-400 capitalize">{user.role} Authorization</p>
            </div>
            <button
              onClick={logout}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs font-bold font-mono uppercase tracking-wide transition-all duration-150 active:scale-95 shadow-inner"
            >
              Disconnect Node
            </button>
          </div>
        </div>
      </nav>

      {/* Main Core Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
        {/* Switched from old StudentCheckIn to our new premium StudentDashboard */}
        {user.role === 'student' ? <StudentDashboard /> : <ProfessorDashboard />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationWrapper />
    </AuthProvider>
  );
}
