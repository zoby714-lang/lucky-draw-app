// Firebase configuration and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

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

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
