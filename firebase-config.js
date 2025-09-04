// firebase-config.js
// آپ اپنے اسی کنفیگ کو رکھیں (جو آپ کے پروجیکٹ کا ہے)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
export const app = initializeApp({
  apiKey: "AIzaSyBsbe2-AY4GNXumAKJI7Oiksuw685-uVj4",
  authDomain: "dailyqurra.firebaseapp.com",
  databaseURL: "https://dailyqurra-default-rtdb.firebaseio.com",
  projectId: "dailyqurra",
  storageBucket: "dailyqurra.firebasestorage.app",
  messagingSenderId: "907329016915",
  appId: "1:907329016915:web:a92a6c43cd0527435da2a6",
  measurementId: "G-306XPENQ5X"
});
