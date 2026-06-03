import React, { useState } from 'react';

export default function StudentCheckIn() {
  const [status, setStatus] = useState<'idle' | 'locating' | 'success' | 'drift' | 'error'>('idle');
  const [distance, setDistance] = useState<number | null>(null);

  const handleCheckIn = () => {
    setStatus('locating');
    setTimeout(() => {
      const simulatedDistance = Math.floor(Math.random() * 140);
      setDistance(simulatedDistance);

      if (simulatedDistance > 100) {
        setStatus('error');
      } else if (simulatedDistance > 75) {
        setStatus('drift');
      } else {
        setStatus('success');
      }
    }, 1200);
  };

  return (
    <div className="max-w-xl mx-auto mt-4 relative">
      {/* Organic Soft Radial Background Glows to break rigid box tracking layout */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-slate-950/40 backdrop-blur-xl border border-slate-800/80 rounded-[2rem] p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Sleek top ambient light indicator strip */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Satellite Hardware Validation</h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">Enforcing 100m Classroom Proximity Boundary</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl font-mono text-[11px] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            NODE // 15_PINK
          </div>
        </div>

        {/* Terminal Screen Interface */}
        <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-5 mb-8 font-mono text-xs space-y-4 relative overflow-hidden shadow-inner">
          <div className="flex justify-between border-b border-slate-800/60 pb-3 text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
            <span>Satellite Telemetry Feed</span>
            <span className="text-indigo-400 animate-pulse">● System Engaged</span>
          </div>

          {status === 'idle' && (
            <p className="text-slate-400 leading-relaxed">
              &gt; Handshake array standing by. Move within physical classroom architecture coordinates and broadcast identity presence signature below.
            </p>
          )}

          {status === 'locating' && (
            <div className="space-y-2 py-1">
              <p className="text-indigo-400 animate-pulse tracking-wide">&gt; Fetching hardware coordinate telemetry maps...</p>
              <p className="text-slate-500 tracking-wide">&gt; Evaluating spherical Haversine matrix radius delta...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-3 bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl text-emerald-400 animate-fade-in">
              <p className="font-bold tracking-wider text-[13px]">✓ GEOFENCE INTEGRITY VERIFIED</p>
              <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
                Computed proximity distance is <span className="text-emerald-400 font-bold font-mono">{distance}m</span> from classroom node center. Roster ledger signed and updated across network nodes.
              </p>
            </div>
          )}

          {status === 'drift' && (
            <div className="space-y-3 bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl text-amber-400 animate-fade-in">
              <p className="font-bold tracking-wider text-[13px]">⚠️ SIGNAL ACCURACY DEGRADATION</p>
              <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
                Proximity vector read <span className="text-amber-400 font-bold font-mono">{distance}m</span>. Structural signal scatter located. Entry logged cleanly using fallback signal tolerances.
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-3 bg-rose-500/5 border border-rose-500/20 p-4 rounded-xl text-rose-400 animate-fade-in">
              <p className="font-bold tracking-wider text-[13px]">❌ PROXY EXCEPTION: OUT OF BOUNDS</p>
              <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
                Computed proximity distance is <span className="text-rose-400 font-bold font-mono">{distance}m</span>. Authentication payload dropped. Device is located beyond authorized lecture hall grid bounds.
              </p>
            </div>
          )}
        </div>

        {/* Custom High-Fidelity Button controls */}
        <button
          onClick={handleCheckIn}
          disabled={status === 'locating'}
          className={`w-full py-4 px-6 rounded-xl font-bold tracking-wide text-sm transition-all duration-200 active:scale-[0.98] ${
            status === 'locating'
              ? 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-xl shadow-indigo-600/10 hover:shadow-indigo-600/20'
          }`}
        >
          {status === 'locating' ? 'Syncing Satellite Handshake...' : 'Broadcast Location & Sign Attendance'}
        </button>

        {status !== 'idle' && status !== 'locating' && (
          <button
            onClick={() => setStatus('idle')}
            className="w-full mt-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-300 transition-colors tracking-wide font-mono uppercase text-center block"
          >
            [ Reset Transceiver Module ]
          </button>
        )}
      </div>
    </div>
  );
}
