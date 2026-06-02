import React, { useState, useEffect } from 'react';
import { db } from "../../services/firebase";
import { collection, addDoc, query, where, onSnapshot, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';

interface ActiveAttendee {
  id: string;
  studentId: string;
  studentName: string;
  timestamp: any;
  course: string;
}

interface EnrolledStudent {
  id: string;
  courseId: string;
  studentId: string;
  studentName: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'live' | 'courses' | 'roster'>('live');
  const [courses, setCourses] = useState<string[]>(['CSE-101', 'MKT-201', 'HRM-302']);
  const [newCourseCode, setNewCourseCode] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('CSE-101');
  const [generatedToken, setGeneratedToken] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  
  const [attendees, setAttendees] = useState<ActiveAttendee[]>([]);
  const [loadingRoster, setLoadingRoster] = useState(true);
  const [enrollments, setEnrollments] = useState<EnrolledStudent[]>([]);
  const [loadingEnrollments, setLoadingEnrollments] = useState(true);
  const [seedStatus, setSeedStatus] = useState('');

  // Search filter query state
  const [searchQuery, setSearchQuery] = useState('');

  const [formStudentId, setFormStudentId] = useState('');
  const [formStudentName, setFormStudentName] = useState('');
  const [formCourseId, setFormCourseId] = useState('CSE-101');

  useEffect(() => {
    if (timeLeft <= 0) {
      setGeneratedToken('');
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    setLoadingRoster(true);
    const attendanceRef = collection(db, "attendance");
    const q = query(attendanceRef, where("course", "==", selectedCourse));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveList: ActiveAttendee[] = [];
      snapshot.forEach((doc) => {
        liveList.push({ id: doc.id, ...doc.data() } as ActiveAttendee);
      });
      liveList.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
      setAttendees(liveList);
      setLoadingRoster(false);
    }, (error) => {
      console.error(error);
      setLoadingRoster(false);
    });

    return () => unsubscribe();
  }, [selectedCourse]);

  useEffect(() => {
    setLoadingEnrollments(true);
    const enrollRef = collection(db, "enrollments");
    const q = query(enrollRef, where("courseId", "==", selectedCourse));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: EnrolledStudent[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as EnrolledStudent);
      });
      setEnrollments(list);
      setLoadingEnrollments(false);
    }, (error) => {
      console.error(error);
      setLoadingEnrollments(false);
    });

    return () => unsubscribe();
  }, [selectedCourse]);

  const checkedInIds = new Set(attendees.map(a => a.studentId));
  const uniqueAttendeesCount = checkedInIds.size;
  const totalEnrolledCount = enrollments.length;
  const attendancePercentage = totalEnrolledCount > 0 
    ? Math.round((uniqueAttendeesCount / totalEnrolledCount) * 100) 
    : 0;

  const absentStudents = enrollments.filter(student => !checkedInIds.has(student.studentId));

  // Dynamic search tracking logic for the roster directory tab
  const filteredEnrollments = enrollments.filter(student => {
    const term = searchQuery.toLowerCase().trim();
    return (
      student.studentName.toLowerCase().includes(term) ||
      student.studentId.toLowerCase().includes(term)
    );
  });

  const exportAttendanceToCSV = () => {
    if (attendees.length === 0) {
      alert("❌ Export failed: No student attendance records logged in the live feed yet.");
      return;
    }
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Serial No,Roll Number,Student Name,Course Code,Verification Status,Timestamp\n";

    attendees.forEach((student, index) => {
      const serialNo = index + 1;
      const rollNo = student.studentId;
      const name = student.studentName.replace(/,/g, ""); 
      const course = student.course;
      const status = "PRESENT";
      const timeStr = student.timestamp 
        ? new Date(student.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) 
        : "Just Now";

      csvContent += `${serialNo},${rollNo},${name},${course},${status},${timeStr}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const downloadLink = document.createElement("a");
    const today = new Date().toISOString().split('T')[0];
    
    downloadLink.setAttribute("href", encodedUri);
    downloadLink.setAttribute("download", `Attendance_Report_${selectedCourse}_${today}.csv`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseCode.trim()) return;
    const formatted = newCourseCode.trim().toUpperCase();
    if (!courses.includes(formatted)) {
      setCourses([...courses, formatted]);
      setFormCourseId(formatted);
      setSelectedCourse(formatted);
    }
    setNewCourseCode('');
    alert(`Course ${formatted} added to dashboard environment!`);
  };

  const handleAddStudentManual = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formStudentId.trim() || !formStudentName.trim()) {
      alert("Please fill out all student registry inputs.");
      return;
    }
    try {
      await addDoc(collection(db, "enrollments"), {
        courseId: formCourseId,
        studentId: formStudentId.trim(),
        studentName: formStudentName.trim()
      });
      setFormStudentId('');
      setFormStudentName('');
      alert(`Successfully registered ${formStudentName.trim()} into ${formCourseId}!`);
    } catch (err) {
      console.error(err);
    }
  };

  const seedEnrollmentDatabase = async () => {
    setSeedStatus('Wiping and loading primary roster configuration...');
    try {
      const enrollRef = collection(db, "enrollments");
      const qSnapshot = await getDocs(enrollRef);
      for (const doc of qSnapshot.docs) {
        await deleteDoc(doc.ref);
      }
      const mockData = [
        { courseId: "CSE-101", studentId: "22CS201", studentName: "Aditya Verma" },
        { courseId: "CSE-101", studentId: "22CS202", studentName: "Meera Nair" },
        { courseId: "CSE-101", studentId: "22CS203", studentName: "Vikram Hegde" },
        { courseId: "CSE-101", studentId: "22CS204", studentName: "Sneha Kulkarni" },
        { courseId: "CSE-101", studentId: "22CS205", studentName: "Rohan Deshmukh" },
        { courseId: "CSE-101", studentId: "22CS206", studentName: "Anjali Rao" },
        { courseId: "CSE-101", studentId: "22CS207", studentName: "Gautam Pillai" },
        { courseId: "CSE-101", studentId: "22CS208", studentName: "Pooja Joshi" },
        { courseId: "CSE-101", studentId: "22CS209", studentName: "Siddharth Shetty" },
        { courseId: "CSE-101", studentId: "22CS210", studentName: "Divya Teja" },
        { courseId: "CSE-101", studentId: "22CS211", studentName: "Varun Reddy" },
        { courseId: "CSE-101", studentId: "22CS212", studentName: "Kavya Murthy" },
        { courseId: "CSE-101", studentId: "22CS213", studentName: "Pranav Bhat" },
        { courseId: "CSE-101", studentId: "22CS214", studentName: "Shreya Shenoy" },
        { courseId: "CSE-101", studentId: "22CS215", studentName: "Manish Prabhu" }
      ];
      for (const item of mockData) {
        await addDoc(enrollRef, item);
      }
      setSeedStatus('🎉 Master system roster loaded successfully!');
    } catch (err) {
      setSeedStatus('Failed to update listings.');
    }
  };

  const handleGenerateQR = async () => {
    const uniqueId = Math.random().toString(36).substring(2, 9).toUpperCase();
    const secureToken = `${selectedCourse}-${uniqueId}-${Date.now()}`;
    try {
      await addDoc(collection(db, "active_tokens"), {
        token: secureToken,
        course: selectedCourse,
        createdAt: serverTimestamp(),
        expiresAt: new Date(Date.now() + 60000),
        status: "active"
      });
      setGeneratedToken(secureToken);
      setTimeLeft(60); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, boxSizing: 'border-box', backgroundColor: '#fff' }}>
      
      {/* LOCAL SIDEBAR SUB-MENU OVERLAY */}
      <div style={{ width: '260px', backgroundColor: '#ffffff', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem', paddingLeft: '8px' }}>
          <span style={{ fontSize: '20px' }}>📖</span>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#111827' }}>SmartAttendance</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', color: '#111827', fontSize: '14px', fontWeight: '600', marginBottom: '8px', borderRadius: '6px' }}>
          <span style={{ fontSize: '16px' }}>🎛️</span>
          <span>Dashboard</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingLeft: '24px', borderLeft: '2px solid #e5e7eb', marginLeft: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
            <button onClick={() => setActiveTab('live')} style={{ textAlign: 'left', padding: '8px 12px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '13px', borderRadius: '6px', fontWeight: activeTab === 'live' ? '700' : '500', color: activeTab === 'live' ? '#2563eb' : '#4b5563', backgroundColor: activeTab === 'live' ? '#f3f4f6' : 'transparent', width: '100%' }}>
              📡 Live Attendance
            </button>
            <button onClick={() => setActiveTab('courses')} style={{ textAlign: 'left', padding: '8px 12px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '13px', borderRadius: '6px', fontWeight: activeTab === 'courses' ? '700' : '500', color: activeTab === 'courses' ? '#2563eb' : '#4b5563', backgroundColor: activeTab === 'courses' ? '#f3f4f6' : 'transparent', width: '100%' }}>
              📖 Manage Courses
            </button>
            <button onClick={() => setActiveTab('roster')} style={{ textAlign: 'left', padding: '8px 12px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '13px', borderRadius: '6px', fontWeight: activeTab === 'roster' ? '700' : '500', color: activeTab === 'roster' ? '#2563eb' : '#4b5563', backgroundColor: activeTab === 'roster' ? '#f3f4f6' : 'transparent', width: '100%' }}>
              👥 Student Enrollment
            </button>
          </div>
        </div>
      </div>

      {/* COMPONENT MAIN ROUTE DISPLAY AREA */}
      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '2px solid #f3f4f6', paddingBottom: '1rem' }}>
          <div>
            <h2 style={{ color: '#1e3a8a', margin: 0, fontSize: '22px', fontWeight: '700' }}>🛡️ SmartAttendance Enterprise Console</h2>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Logged in as: Professor Account</span>
          </div>
          <button onClick={seedEnrollmentDatabase} style={{ padding: '8px 14px', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
            🔄 Reset System Dataset
          </button>
        </div>

        {seedStatus && <p style={{ color: '#4f46e5', fontSize: '13px', fontWeight: 'bold', background: '#eef2f6', padding: '10px', borderRadius: '6px', margin: '0 0 1.5rem 0' }}>{seedStatus}</p>}

        {/* VIEW 1: LIVE ATTENDANCE PANEL */}
        {activeTab === 'live' && (
          <div style={{ maxWidth: '900px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '1.5rem' }}>
              {/* Turnout Percentage Card with Integrated Animated Tracking Line */}
              <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e40af', display: 'block' }}>Turnout Percentage</span>
                <span style={{ fontSize: '26px', fontWeight: '800', color: '#1d4ed8' }}>{attendancePercentage}%</span>
                
                {/* Visual Progress Bar Component wrapper */}
                <div style={{ width: '100%', backgroundColor: '#dbeafe', borderRadius: '9999px', height: '8px', marginTop: '8px', overflow: 'hidden' }}>
                  <div style={{ 
                    width: `${attendancePercentage}%`, 
                    backgroundColor: '#2563eb', 
                    height: '100%', 
                    borderRadius: '9999px',
                    transition: 'width 0.5s ease-in-out'
                  }}></div>
                </div>

                <span style={{ fontSize: '11px', color: '#1e40af', display: 'block', marginTop: '6px' }}>({uniqueAttendeesCount} of {totalEnrolledCount} Present)</span>
              </div>

              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#991b1b', display: 'block' }}>Unverified Absentees</span>
                <span style={{ fontSize: '26px', fontWeight: '800', color: '#dc2626' }}>{absentStudents.length}</span>
                <span style={{ fontSize: '11px', color: '#991b1b', display: 'block', marginTop: '2px' }}>Awaiting Verification Check-in</span>
              </div>
            </div>

            <div style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', padding: '1.25rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <label style={{ block: 'span', fontSize: '13px', fontWeight: '600', color: '#4b5563', display: 'block', marginBottom: '6px' }}>Select Active Target Class Session:</label>
              <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #d1d5db', marginBottom: '1rem', fontSize: '14px', backgroundColor: '#fff' }}>
                {courses.map(code => <option key={code} value={code}>{code} Lecture Session</option>)}
              </select>
              <button onClick={handleGenerateQR} style={{ width: '100%', padding: '12px', backgroundColor: '#2563eb', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>
                🔄 Generate Dynamic Security QR Code
              </button>
            </div>

            {generatedToken && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e5e7eb', marginBottom: '2rem' }}>
                <p style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '14px', margin: '0 0 1rem 0' }}>⏳ Token security window closes in: {timeLeft} seconds</p>
                <div style={{ border: '4px solid #1e3a8a', padding: '1rem', borderRadius: '12px', backgroundColor: '#fff' }}>
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generatedToken)}`} alt="Dynamic Verification QR Code" style={{ display: 'block', width: '190px', height: '190px' }} />
                </div>
              </div>
            )}

            <div style={{ marginBottom: '2rem', borderTop: "2px solid #e5e7eb", paddingTop: "1.5rem" }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#b91c1c', fontSize: '15px' }}>🚨 Unverified Missing List ({absentStudents.length})</h4>
              <div style={{ background: '#fffcfc', border: '1px solid #fee2e2', borderRadius: '8px', padding: '12px', maxHeight: '200px', overflowY: 'auto' }}>
                {loadingEnrollments ? <p style={{ fontSize: '13px', color: '#9ca3af' }}>Processing fields...</p> : absentStudents.length === 0 ? <p style={{ fontStyle: 'italic', fontSize: '13px', color: '#059669', fontWeight: 'bold' }}>🎉 100% Full Attendance Achieved!</p> : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '13px', color: '#7f1d1d' }}>
                    {absentStudents.map(student => <div key={student.id}>❌ <code>{student.studentId}</code> - {student.studentName}</div>)}
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '1rem', borderTop: "2px solid #e5e7eb", paddingTop: "1.5rem" }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ margin: 0, color: '#1f2937', fontSize: '15px' }}>📈 Verified Live Room Feed ({attendees.length})</h4>
                <button onClick={exportAttendanceToCSV} style={{ padding: '6px 12px', backgroundColor: '#1e3a8a', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  📥 Export Attendance Report (.CSV)
                </button>
              </div>

              <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px' }}>
                {attendees.length === 0 ? <p style={{ fontStyle: 'italic', fontSize: '13px', color: '#9ca3af', margin: 0 }}>Waiting for client proximity scans...</p> : (
                  <div style={{ fontSize: '13px' }}>
                    {attendees.map(log => (
                      <div key={log.id} style={{ borderBottom: '1px solid #f3f4f6', padding: '6px 0', display: 'flex', justifyContent: 'space-between' }}>
                        <span>🟩 <strong>{log.studentName}</strong> ({log.studentId})</span>
                        <span style={{ color: '#6b7280' }}>{log.timestamp ? new Date(log.timestamp.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "Now"}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: COURSE MANAGEMENT PANEL */}
        {activeTab === 'courses' && (
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '12px', maxWidth: '650px' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#1e3a8a', fontSize: '18px' }}>📖 Master Course Registrar</h3>
            <form onSubmit={handleAddCourse} style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
              <input type="text" placeholder="e.g. MKT-501, CSE-402" value={newCourseCode} onChange={(e) => setNewCourseCode(e.target.value)} style={{ flex: 1, padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }} />
              <button type="submit" style={{ padding: '10px 16px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>
                ➕ Create Course Code
              </button>
            </form>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#4b5563' }}>Active Tracked Departments:</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {courses.map(code => (
                <div key={code} style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', padding: '8px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>
                  🎓 {code}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: STUDENT ENROLLMENT ROSTER PANEL */}
        {activeTab === 'roster' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '650px' }}>
            <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '12px' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#1e3a8a', fontSize: '18px' }}>👥 Manual Candidate Registration</h3>
              <form onSubmit={handleAddStudentManual} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#4b5563', marginBottom: '4px' }}>Target Course:</label>
                  <select value={formCourseId} onChange={(e) => setFormCourseId(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', backgroundColor: '#fff' }}>
                    {courses.map(code => <option key={code} value={code}>{code}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#4b5563', marginBottom: '4px' }}>Roll Number / ID:</label>
                    <input type="text" placeholder="e.g. 22CS216" value={formStudentId} onChange={(e) => setFormStudentId(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }} />
                  </div>
                  <div style={{ flex: 2 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#4b5563', marginBottom: '4px' }}>Full Legal Name:</label>
                    <input type="text" placeholder="e.g. Sai Thrisha" value={formStudentName} onChange={(e) => setFormStudentName(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }} />
                </div>
                </div>
                <button type="submit" style={{ marginTop: '4px', width: '100%', padding: '11px', backgroundColor: '#4f46e5', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '6px', fontSize: '14px', cursor: 'pointer' }}>
                  📥 Register Student Profile into Firestore
                </button>
              </form>
            </div>

            <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', gap: '10px' }}>
                <h4 style={{ margin: 0, color: '#1f2937', fontSize: '15px', minWidth: '130px' }}>📋 Enrollment Registry</h4>
                
                <input 
                  type="text" 
                  placeholder="🔍 Search name or roll no..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ flex: 1, padding: '6px 10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px' }}
                />

                <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '12px', fontWeight: '600', backgroundColor: '#fff' }}>
                  {courses.map(code => <option key={code} value={code}>{code}</option>)}
                </select>
              </div>

              <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', maxHeight: '180px', overflowY: 'auto' }}>
                {loadingEnrollments ? (
                  <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>Syncing directories...</p>
                ) : filteredEnrollments.length === 0 ? (
                  <p style={{ fontStyle: 'italic', fontSize: '13px', color: '#9ca3af', margin: 0 }}>No matching student registrations found.</p>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '13px', color: '#4b5563' }}>
                    {filteredEnrollments.map(student => (
                      <div key={student.id} style={{ borderBottom: '1px solid #f3f4f6', padding: '2px 0' }}>
                        🆔 <code>{student.studentId}</code> - <strong>{student.studentName}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
