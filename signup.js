import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  sendEmailVerification 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// 🔹 یہ آپکی firebase-config.js فائل سے آئے گا
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Signup form
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // یوزر کا ڈیٹا ریئل ٹائم ڈیٹا بیس میں سیو کریں
      set(ref(db, "users/" + user.uid), {
        email: email,
        createdAt: new Date().toISOString()
      });

      // ✅ یہاں سے verification email جائے گا
      sendEmailVerification(user)
        .then(() => {
          alert("رجسٹریشن کامیاب ✅ براہ کرم اپنی ای میل چیک کریں اور verify کریں۔");
        });

      signupForm.reset();
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});
