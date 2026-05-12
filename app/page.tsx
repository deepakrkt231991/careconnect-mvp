"use client";

import { useState, useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
// 👇 NAYA: Database (Firestore) import kar rahe hain
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFaYl9fJtmBDntPo_qxapyQ9VC-J8B0Rs",
  authDomain: "careconnect-fresh.firebaseapp.com",
  projectId: "careconnect-fresh",
  storageBucket: "careconnect-fresh.firebasestorage.app",
  messagingSenderId: "485527200202",
  appId: "1:485527200202:web:3cb125aebbc38c4508af33"
};

const appName = "CareConnectAbsoluteFresh";
const app = getApps().find(a => a.name === appName) || initializeApp(firebaseConfig, appName);
const auth = getAuth(app);
const db = getFirestore(app); // Database Engine Start!

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [statusInput, setStatusInput] = useState("");
  const [currentStatus, setCurrentStatus] = useState("Loading...");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      // Agar user login hai, toh uska data Database me save aur read karo
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        
        // 1. Basic Info Save Karo
        await setDoc(userRef, {
          name: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        }, { merge: true });

        // 2. Uska live Status Read karo
        onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists() && docSnap.data().status) {
            setCurrentStatus(docSnap.data().status);
          } else {
            setCurrentStatus("Online (No status set)");
          }
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  // NAYA: Status update karne ka function
  const updateMyStatus = async () => {
    if (!statusInput || !user) return;
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      status: statusInput,
      lastUpdated: new Date().toLocaleTimeString()
    }, { merge: true });
    setStatusInput(""); // Input box khali kar do
  };

  // --- UI: AGAR LOGIN NAHI HAI ---
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">CareConnect MVP</h1>
          <p className="text-gray-500 mb-8">Stay connected with your loved ones.</p>
          <button onClick={handleGoogleLogin} className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl shadow-sm hover:bg-gray-50 flex items-center justify-center gap-3 transition-all">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" height="20" />
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  // --- UI: AGAR LOGIN HAI (DASHBOARD) ---
  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans text-gray-800">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-md rounded-xl overflow-hidden border border-gray-100 pb-10">
        
        {/* Header Section */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-blue-600 text-white">
          <h1 className="text-xl font-bold">CareConnect</h1>
          <button onClick={handleLogout} className="text-sm font-medium bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg transition-all">Logout</button>
        </div>

        <div className="p-5">
          {/* Profile Section */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full border-2 border-blue-500" />
            <div>
              <h2 className="text-lg font-bold text-gray-900">{user.displayName}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Current Live Status Card */}
          <div className="bg-green-50 border border-green-200 p-5 rounded-2xl mb-6 shadow-sm">
            <p className="text-xs font-bold text-green-800 uppercase tracking-wider mb-1">My Current Status</p>
            <p className="text-xl font-medium text-green-900">"{currentStatus}"</p>
          </div>

          {/* Update Status Form */}
          <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm">
            <h3 className="font-bold text-gray-800 mb-3">Update Where You Are</h3>
            <input 
              type="text" 
              placeholder="e.g., Safe at home, At office..." 
              value={statusInput}
              onChange={(e) => setStatusInput(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={updateMyStatus}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md"
            >
              Post Status
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}