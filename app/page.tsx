"use client";

import { useState, useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

// 👇 Aapki EKDA NAYI (Fresh) Firebase Config 👇
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

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login fail hua, Console check karein!");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">CareConnect</h1>
          <p className="text-gray-500 mb-8">Stay connected with your loved ones.</p>
          <button
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
            className={`w-full bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl shadow-sm hover:bg-gray-50 flex items-center justify-center gap-3 transition-all ${isLoggingIn ? 'opacity-50' : ''}`}
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" height="20" />
            {isLoggingIn ? "Please wait..." : "Login with Google"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-md border border-green-100 max-w-sm w-full">
        <span className="text-5xl mb-4 block">🎉</span>
        <h1 className="text-2xl font-bold text-green-800 mb-2">Login Success Bhai!</h1>
        <p className="text-green-600 font-medium mb-6">Aapka NAYA Firebase successfully connect ho gaya hai.</p>
        <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl transition-all">
          Logout
        </button>
      </div>
    </div>
  );
}