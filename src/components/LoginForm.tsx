import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginForm() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'student' | 'professor'>('student');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!email.trim()) {
      setErrorMsg('Please enter a valid university email node access signature.');
      return;
    }

    const success = await login(email, role);
    if (!success) {
      setErrorMsg('Authorization failed. Unrecognized campus directory signature.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Soft natural background flares */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-950/60 backdrop-blur-xl border border-slate-800/80 rounded-[2rem] p-6 md:p-8 shadow-2xl relative">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
        
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 items-center justify-center font-bold text-white shadow-xl shadow-indigo-500/10 text-lg mb-4">
            PG
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">ProxyGuard Gateway</h2>
          <p className="text-xs text-slate-400 mt-1.5 font-medium">Anti-Spoof Satellite Attendance Registry Verification</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Target Toggle Selection Deck */}
          <div>
            <label className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block mb-2.5">
              Gate Authorization Target
            </label>
            <div className="grid grid-cols-2 gap-3 bg-slate-900/60 border border-slate-800/60 p-1.5 rounded-xl">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all duration-150 ${
                  role === 'student'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📱 Student Node
              </button>
              <button
                type="button"
                onClick={() => setRole('professor')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all duration-150 ${
                  role === 'professor'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📊 Faculty Core
              </button>
            </div>
          </div>

          {/* Email Input Node */}
          <div>
            <label className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block mb-2">
              University Email Signature
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === 'student' ? 'aarav@nitk.edu.in' : 'bubu@nitk.edu.in'}
              className="w-full bg-slate-900/50 border border-slate-800 focus:border-indigo-500/80 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none transition-colors"
            />
          </div>

          {errorMsg && (
            <p className="text-xs font-mono font-medium text-rose-400 bg-rose-500/5 border border-rose-500/10 p-3 rounded-xl">
              ⚠️ {errorMsg}
            </p>
          )}

          {/* Submit Action Block */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold tracking-wide text-sm rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-indigo-600/10"
          >
            {isLoading ? 'Syncing Network Handshake...' : `Initialize Access as ${role === 'student' ? 'Student' : 'Professor'}`}
          </button>
        </form>
      </div>
    </div>
  );
}
