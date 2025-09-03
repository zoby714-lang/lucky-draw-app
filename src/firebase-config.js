// firebase-config.js

// Import Firebase SDK (Modular v12.2.1)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

// 🔹 آپ کا Firebase Config (جو آپ نے دیا ہے)
const firebaseConfig = {
  apiKey: "AIzaSyBsbe2-AY4GNXumAKJI7Oiksuw685-uVj4",
  authDomain: "dailyqurra.firebaseapp.com",
  databaseURL: "https://dailyqurra-default-rtdb.firebaseio.com",
  projectId: "dailyqurra",
  storageBucket: "dailyqurra.firebasestorage.app",
  messagingSenderId: "907329016915",
  appId: "1:907329016915:web:a92a6c43cd0527435da2a6",
  measurementId: "G-306XPENQ5X"
};

// ✅ Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);
