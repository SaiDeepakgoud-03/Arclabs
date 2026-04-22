// Import the functions you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";   // ✅ ADD THIS
import { getAnalytics } from "firebase/analytics";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCzNZY-nfscvbAiexrYAGVhkuMTOpKY19o",
  authDomain: "arclabs-a5c6f.firebaseapp.com",
  projectId: "arclabs-a5c6f",
  storageBucket: "arclabs-a5c6f.firebasestorage.app",
  messagingSenderId: "879606466968",
  appId: "1:879606466968:web:8406590c2ac2a2368f03ed",
  measurementId: "G-1P9CV8V39W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ FIRESTORE CONNECTION (VERY IMPORTANT)
export const db = getFirestore(app);

// (Optional) Analytics
const analytics = getAnalytics(app);