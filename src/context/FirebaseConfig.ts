import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Keeping configuration clean and modular. 
// For a production app, these values would live in a secure .env file.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "smart-attendance-anti-proxy.firebaseapp.com",
  projectId: "smart-attendance-anti-proxy",
  storageBucket: "smart-attendance-anti-proxy.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize the application instance
const app = initializeApp(firebaseConfig);

// Export the real-time database listener instance so our hooks can use it directly
export const db = getFirestore(app);
