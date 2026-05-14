import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Aapki Fresh API Key
const firebaseConfig = {
  apiKey: "AIzaSyAFaYl9fJtmBDntPo_qxapyQ9VC-J8B0Rs",
  authDomain: "careconnect-fresh.firebaseapp.com",
  projectId: "careconnect-fresh",
  storageBucket: "careconnect-fresh.firebasestorage.app",
  messagingSenderId: "485527200202",
  appId: "1:485527200202:web:3cb125aebbc38c4508af33"
};

// Next.js me cache ka issue na aaye uske liye safe initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };