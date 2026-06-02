import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxHR3QW2PfjIPvVDf84gUGzMA4MlGhECA",
  authDomain: "smart-attendance-system-37fd4.firebaseapp.com",
  projectId: "smart-attendance-system-37fd4",
  storageBucket: "smart-attendance-system-37fd4.firebasestorage.app",
  messagingSenderId: "946889230248",
  appId: "1:946889230248:web:6f35ff1ec8f4a2ab67bf9d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
