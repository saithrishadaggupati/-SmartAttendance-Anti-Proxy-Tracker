import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, Timestamp, collection } from "firebase/firestore";

// Firebase Configuration from src/services/firebase.ts
const firebaseConfig = {
  apiKey: "AIzaSyCxHR3QW2PfjIPvVDf84gUGzMA4MlGhECA",
  authDomain: "smart-attendance-system-37fd4.firebaseapp.com",
  projectId: "smart-attendance-system-37fd4",
  storageBucket: "smart-attendance-system-37fd4.firebasestorage.app",
  messagingSenderId: "946889230248",
  appId: "1:946889230248:web:6f35ff1ec8f4a2ab67bf9d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Data Templates
const departments = ["Computer Science", "Information Technology", "Electrical Engineering"];
const semesters = ["Fall 2026", "Spring 2027"];

const seedData = async () => {
  console.log("🚀 Starting database seeding...");

  // 1. Admin User (Using known UID)
  const adminUid = "H8vBvCHLu0TKvGKRs7dOrqygpb62";
  const adminDoc = await getDoc(doc(db, "users", adminUid));
  if (!adminDoc.exists()) {
    console.log("Creating Admin record...");
    await setDoc(doc(db, "users", adminUid), {
      uid: adminUid,
      email: "admin@university.edu",
      role: "admin",
      name: "System Administrator",
      department: "Administration",
      isActive: true,
      createdAt: Timestamp.now()
    });
  } else {
    console.log("Admin record already exists, skipping...");
  }

  // 2. Faculty Users
  const facultyData = [
    { uid: "fac_001", name: "Dr. Alan Turing", email: "aturing@university.edu", dept: "Computer Science", id: "F1001" },
    { uid: "fac_002", name: "Dr. Grace Hopper", email: "ghopper@university.edu", dept: "Computer Science", id: "F1002" },
    { uid: "fac_003", name: "Prof. Claude Shannon", email: "cshannon@university.edu", dept: "Electrical Engineering", id: "F1003" },
  ];

  console.log("Creating Faculty records...");
  for (const f of facultyData) {
    await setDoc(doc(db, "users", f.uid), {
      uid: f.uid,
      email: f.email,
      role: "faculty",
      name: f.name,
      department: f.dept,
      facultyId: f.id,
      isActive: true,
      createdAt: Timestamp.now()
    });
  }

  // 3. Student Users
  console.log("Creating Student records...");
  const students: string[] = [];
  for (let i = 1; i <= 10; i++) {
    const uid = `std_${i.toString().padStart(3, '0')}`;
    students.push(uid);
    await setDoc(doc(db, "users", uid), {
      uid: uid,
      email: `student${i}@university.edu`,
      role: "student",
      name: `Student Name ${i}`,
      department: departments[i % departments.length],
      studentId: `S${(1000 + i)}`,
      isActive: true,
      createdAt: Timestamp.now()
    });
  }

  // 4. Courses
  const courses = [
    { id: "course_001", code: "CS101", name: "Intro to Programming", fac: "fac_001", dept: "Computer Science", creds: 3, sched: "Mon/Wed 09:00 AM" },
    { id: "course_002", code: "CS202", name: "Data Structures", fac: "fac_001", dept: "Computer Science", creds: 4, sched: "Tue/Thu 11:00 AM" },
    { id: "course_003", code: "CS303", name: "Operating Systems", fac: "fac_002", dept: "Computer Science", creds: 3, sched: "Mon/Fri 01:00 PM" },
    { id: "course_004", code: "EE101", name: "Circuit Theory", fac: "fac_003", dept: "Electrical Engineering", creds: 3, sched: "Wed 02:00 PM" },
    { id: "course_005", code: "IT404", name: "Cyber Security", fac: "fac_002", dept: "Information Technology", creds: 3, sched: "Thu 04:00 PM" },
  ];

  console.log("Creating Course records...");
  for (const c of courses) {
    await setDoc(doc(db, "courses", c.id), {
      id: c.id,
      code: c.code,
      name: c.name,
      department: c.dept,
      credits: c.creds,
      facultyId: c.fac,
      semester: semesters[0],
      schedule: c.sched,
      createdAt: Timestamp.now()
    });
  }

  // 5. Enrollments (20 records)
  console.log("Creating Enrollment records...");
  let count = 0;
  for (const c of courses) {
    // Enroll 4 random students per course to reach ~20
    const shuffled = [...students].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);
    
    for (const sUid of selected) {
      const enrollmentId = `${c.id}_${sUid}`;
      await setDoc(doc(db, "enrollments", enrollmentId), {
        id: enrollmentId,
        courseId: c.id,
        studentId: sUid,
        status: "active",
        enrolledAt: Timestamp.now()
      });
      count++;
    }
  }

  console.log(`✅ Seeding complete! Created ${facultyData.length} faculty, 10 students, ${courses.length} courses, and ${count} enrollments.`);
  process.exit(0);
};

seedData().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
