// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

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

// ✅ Signup Function
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ✅ Email Verification Send
    await sendEmailVerification(user);

    alert("اکاؤنٹ بن گیا ✅ براہ کرم اپنی ای میل چیک کریں اور verify کریں۔");

    document.getElementById("signupForm").reset();

  } catch (error) {
    alert("Error: " + error.message);
  }
});
