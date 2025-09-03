import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signinForm = document.getElementById("signinForm");

signinForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("signinEmail").value;
  const password = document.getElementById("signinPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      if (user.emailVerified) {
        alert("لاگ ان کامیاب ✅");
        window.location.href = "dashboard.html"; // اپنے ہوم/ڈیش بورڈ کا لنک یہاں ڈالیں
      } else {
        alert("⚠ براہ کرم پہلے اپنی ای میل verify کریں!");
        signOut(auth); // فوراً سائن آؤٹ کر دیں
      }

      signinForm.reset();
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});
