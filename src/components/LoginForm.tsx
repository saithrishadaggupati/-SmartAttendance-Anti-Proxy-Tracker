import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginForm() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'student' | 'professor'>('student');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.includes('@')) {
      setError('Please supply a valid university email reference address.');
      return;
    }

    await login(email, role);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 antialiased">
      <div className="max-w-md w-full bg-slate-950/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Decorative subtle ambient lights */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 rounded-2xl bg-indigo-600 items-center justify-center font-bold text-white shadow-xl shadow-indigo-600/30 mb-3 text-xl">
            🛡️
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">ProxyGuard Engine</h2>
          <p className="text-xs text-slate-400 mt-1">Role-Based Anti-Spoof Gateway Identity Verified</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* SDE Skill: Segmented role selector layout control buttons */}
          <div>
            <label className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block mb-2">Gate Authorization Target</label>
            <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-150 ${
                  role === 'student'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📱 Student Node
              </button>
              <button
                type="button"
                onClick={() => setRole('professor')}
                className={`py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-150 ${
                  role === 'professor'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📊 Faculty Core
              </button>
            </div>
          </div>

          {/* Email input field mapping */}
          <div>
            <label htmlFor="email" className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block mb-1.5">University Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === 'student' ? 'std_22cs216@nitk.edu.in' : 'srinivasan@nitk.edu.in'}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Error handling readout module */}
          {error && (
            <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl font-medium animate-fade-in">
              ⚠️ {error}
            </div>
          )}

          {/* Form validation actions */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-600/10 transition-all duration-150 active:scale-[0.98] text-sm"
          >
            {isLoading ? 'Decrypting Security Token...' : `Initialize Access as ${role === 'student' ? 'Student' : 'Professor'}`}
          </button>
        </form>
      </div>
    </div>
  );
}
