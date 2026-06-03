import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import StudentCheckIn from './components/StudentCheckIn';
import ProfessorDashboard from './components/ProfessorDashboard';

function NavigationWrapper() {
  const { user, logout } = useAuth();

  // If no active auth payload signature is located, redirect to account log gateway form
  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col antialiased">
      {/* Top Header Control Area */}
      <header className="bg-slate-950/50 backdrop-blur-md border-b border-slate-800/60 p-4 md:p-6 flex justify-between items-center sticky top-0 z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🛡️</span>
            <h1 className="text-lg font-black text-white tracking-wide">
              {user.role === 'student' ? 'ProxyGuard Terminal' : 'ProxyGuard Faculty Operations'}
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">
            Active Identity Node: <span className="text-indigo-400 font-semibold">{user.name}</span> ({user.role})
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800 text-xs font-semibold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Node Secure
          </div>
          <button
            onClick={logout}
            className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 px-3 py-1.5 rounded-xl transition-all font-semibold active:scale-95"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Dynamic Content Container - Access-restricted by user account configuration signature */}
      <main className="flex-1 p-4 md:p-8 max-w-5xl w-full mx-auto overflow-y-auto">
        {user.role === 'student' ? <StudentCheckIn /> : <ProfessorDashboard />}
      </main>
    </div>
  );
}

// Master wrapper ensuring context mapping constraints exist globally
function App() {
  return (
    <AuthProvider>
      <NavigationWrapper />
    </AuthProvider>
  );
}

export default App;
