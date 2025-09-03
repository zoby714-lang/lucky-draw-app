// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// ✅ اپنی Firebase Config ڈالیں
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Sign In Function
document.getElementById("signinForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signinEmail").value;
  const password = document.getElementById("signinPassword").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user.emailVerified) {
      alert("🎉 لاگ ان کامیاب! خوش آمدید");
      window.location.href = "index.html"; // اپنی مین ایپ کی فائل یہاں ڈالیں
    } else {
      alert("⚠️ براہ کرم پہلے اپنی ای میل verify کریں!");
      await signOut(auth);
    }

  } catch (error) {
    alert("Error: " + error.message);
  }
});
