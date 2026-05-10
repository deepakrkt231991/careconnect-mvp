import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2hvALjBqTVRtFwFoZt3-mByLzTCGDQQo",
  authDomain: "wifi-radar-124a7.firebaseapp.com",
  projectId: "wifi-radar-124a7",
  storageBucket: "wifi-radar-124a7.firebasestorage.app",
  messagingSenderId: "1014141552951",
  appId: "1:1014141552951:web:8c7b6438af163f9eaf32b2"
};

// Error free initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth };