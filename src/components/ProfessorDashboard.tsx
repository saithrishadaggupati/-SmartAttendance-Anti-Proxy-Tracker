import React, { useState } from 'react';
import { globalStudentMockRegistry, StudentRecord } from '../contexts/AuthContext';

interface CourseData {
  id: string;
  code: string;
  name: string;
  time: string;
  room: string;
}

const ACADEMIC_COURSES: CourseData[] = [
  { id: 'c1', code: 'CS401', name: 'Distributed Cloud Architecture', time: '09:00 AM', room: 'LHC-102' },
  { id: 'c2', code: 'CS402', name: 'Cryptographic Protocols & Anti-Tamper Systems', time: '10:30 AM', room: 'MAC-204' },
  { id: 'c3', code: 'CS403', name: 'Advanced Machine Learning Datasets', time: '12:00 PM', room: 'LHC-105' },
  { id: 'c4', code: 'CS404', name: 'Mobile Hardware & Wireless Telemetry', time: '02:00 PM', room: 'Seminar-1' },
  { id: 'c5', code: 'CS405', name: 'Real-Time Edge Network Computation', time: '03:30 PM', room: 'LHC-201' },
  { id: 'c6', code: 'CS406', name: 'Full-Stack Software Engineering Practices', time: '05:00 PM', room: 'Lab-3 Core' }
];

export default function ProfessorDashboard() {
  const [selectedCourse, setSelectedCourse] = useState<CourseData>(ACADEMIC_COURSES[0]);
  const [students, setStudents] = useState<StudentRecord[]>(globalStudentMockRegistry);

  const toggleAttendance = (uid: string) => {
    setStudents(prev => prev.map(student => {
      if (student.uid === uid) {
        const nextStatus: StudentRecord['status'] = student.status === 'Present' ? 'Absent' : 'Present';
        return {
          ...student,
          status: nextStatus,
          timestamp: nextStatus === 'Present' ? '12:47 PM' : '--',
          verifiedBy: nextStatus === 'Present' ? 'Manual Override' : 'None'
        };
      }
      return student;
    }));
  };

  const presentCount = students.filter(s => s.status === 'Present' || s.status === 'Drifting').length;
  const liveTurnoutPercent = Math.round((presentCount / students.length) * 100);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Course Enrollment Selector Deck */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-mono tracking-widest text-slate-500 uppercase">
            Active Enrollment Hub Channels (6 Channels Online)
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACADEMIC_COURSES.map((course) => {
            const isActive = selectedCourse.id === course.id;
            return (
              <button
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-br from-slate-900 to-indigo-950/40 border-indigo-500/80 shadow-xl shadow-indigo-950/10'
                    : 'bg-slate-950/40 border-slate-900 hover:border-slate-800 hover:bg-slate-950/70'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
                )}
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-[10px] font-mono px-2.5 py-1 rounded-lg font-bold tracking-wider uppercase ${
                    isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' : 'bg-slate-900 text-slate-400 border border-slate-800/60'
                  }`}>
                    {course.code}
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-slate-500">{course.room}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200 tracking-tight line-clamp-1">{course.name}</h4>
                <p className="text-[11px] text-slate-400 font-medium font-mono mt-1.5">{course.time}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Analytics Readout Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/30 backdrop-blur-md border border-slate-900 rounded-2xl p-4 relative overflow-hidden">
        <div className="p-4 bg-slate-900/40 border border-slate-800/40 rounded-xl">
          <p className="text-[10px] font-mono font-semibold tracking-wider text-slate-500 uppercase">Target Stream Core</p>
          <p className="text-lg font-black text-white mt-1 tracking-wide">{selectedCourse.code} <span className="text-slate-500 font-normal text-xs font-mono">// {selectedCourse.room}</span></p>
        </div>
        <div className="p-4 bg-slate-900/40 border border-slate-800/40 rounded-xl">
          <p className="text-[10px] font-mono font-semibold tracking-wider text-slate-500 uppercase">Identity Match Index</p>
          <p className="text-lg font-black text-indigo-400 mt-1 tracking-wide">{presentCount} <span className="text-slate-500 font-normal text-xs">/ {students.length} verified</span></p>
        </div>
        <div className="p-4 bg-slate-900/40 border border-slate-800/40 rounded-xl">
          <p className="text-[10px] font-mono font-semibold tracking-wider text-slate-500 uppercase">Turnout Probability</p>
          <p className="text-lg font-black text-emerald-400 mt-1 tracking-wide">
            {liveTurnoutPercent}% <span className="text-slate-500 font-normal text-xs font-mono">live</span>
          </p>
        </div>
      </div>

      {/* Roster Live Ledger Grid */}
      <div className="bg-slate-950/40 backdrop-blur-xl border border-slate-900 rounded-[2rem] overflow-hidden shadow-2xl relative">
        <div className="p-5 bg-slate-950/80 border-b border-slate-900/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Telemetry Stream Ledger</h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">Channel: <span className="text-indigo-400">{selectedCourse.name}</span></p>
          </div>
          <span className="text-[11px] bg-slate-900/80 border border-slate-800 text-slate-400 px-4 py-1.5 rounded-xl font-mono font-medium">
            Roster Load: 15 Unique Nodes
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/30 border-b border-slate-900 font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                <th className="p-4 pl-6">Roll No</th>
                <th className="p-4">Student Node</th>
                <th className="p-4">Verification State</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Validation Source</th>
                <th className="p-4 pr-6 text-right">Administrative Gate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/50 font-medium text-slate-300">
              {students.map((student) => (
                <tr key={student.uid} className="hover:bg-slate-900/20 transition-all duration-150">
                  <td className="p-4 pl-6 font-mono text-[11px] text-slate-500">{student.rollNumber}</td>
                  <td className="p-4 font-bold text-slate-100 text-sm tracking-tight">{student.name}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-bold border font-mono tracking-wide ${
                      student.status === 'Present' ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400' :
                      student.status === 'Absent' ? 'bg-rose-500/5 border-rose-500/10 text-rose-400' :
                      student.status === 'Drifting' ? 'bg-amber-500/5 border-amber-500/10 text-amber-400' :
                      'bg-orange-500/5 border-orange-500/10 text-orange-400'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        student.status === 'Present' ? 'bg-emerald-400' :
                        student.status === 'Absent' ? 'bg-rose-400' :
                        student.status === 'Drifting' ? 'bg-amber-400' : 'bg-orange-400'
                      }`} />
                      {student.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-slate-400">{student.timestamp}</td>
                  <td className="p-4 text-slate-400 font-mono text-[11px]">{student.verifiedBy}</td>
                  <td className="p-4 pr-6 text-right">
                    <button
                      onClick={() => toggleAttendance(student.uid)}
                      className="text-[11px] font-bold bg-slate-950 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 text-indigo-400 hover:text-indigo-300 px-3.5 py-2 rounded-xl transition-all duration-150 active:scale-95 shadow-sm"
                    >
                      Bypass Node
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
