// firebase-config.js

// ✅ Firebase CDN Imports (Version 9 Modular SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth, onAuthStateChanged, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, sendEmailVerification, signOut, updateProfile
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  getDatabase, ref, set, update, push, onValue, remove
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// 🔴 یہاں اپنی Firebase Config ڈالیں (صرف {} کے اندر)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "G-XXXXXXX"
};

// ✅ Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getDatabase(app);

// ⚙️ اگر Email Verification لازمی کرانی ہے تو false رکھیں
// ورنہ unverified یوزر کو بھی allow کرنے کے لیے true کر دیں
export const ALLOW_UNVERIFIED = true;
