// Utility/firebase.js - MODERN v9+ MODULAR
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgqyG9l1J9ZaYru03iYLoE-jBJKvP6RR0",
  authDomain: "e-clone-6c5eb.firebaseapp.com",
  projectId: "e-clone-6c5eb",
  storageBucket: "e-clone-6c5eb.firebasestorage.app",
  messagingSenderId: "584144716366",
  appId: "1:584144716366:web:162f828c4ae4e65e9b791f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
