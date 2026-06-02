import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getCountFromServer } from "firebase/firestore";

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

async function getCounts() {
  const usersColl = collection(db, "users");
  const coursesColl = collection(db, "courses");
  const enrollmentsColl = collection(db, "enrollments");

  try {
    const totalUsers = (await getCountFromServer(usersColl)).data().count;
    const adminUsers = (await getCountFromServer(query(usersColl, where("role", "==", "admin")))).data().count;
    const facultyUsers = (await getCountFromServer(query(usersColl, where("role", "==", "faculty")))).data().count;
    const studentUsers = (await getCountFromServer(query(usersColl, where("role", "==", "student")))).data().count;
    const totalCourses = (await getCountFromServer(coursesColl)).data().count;
    const totalEnrollments = (await getCountFromServer(enrollmentsColl)).data().count;

    console.log(`Total documents in users collection: ${totalUsers}`);
    console.log(`Total users with role="admin": ${adminUsers}`);
    console.log(`Total users with role="faculty": ${facultyUsers}`);
    console.log(`Total users with role="student": ${studentUsers}`);
    console.log(`Total documents in courses collection: ${totalCourses}`);
    console.log(`Total documents in enrollments collection: ${totalEnrollments}`);
  } catch (err) {
    console.error("Error fetching counts. One or more collections might be missing or empty.");
    console.error(err);
  }
  
  process.exit(0);
}

getCounts();
