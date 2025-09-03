// Import Firebase Auth
import { getAuth, signInWithEmailAndPassword, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { app } from "./firebase-config.js";  

const auth = getAuth(app);

// Form Element
const signinForm = document.getElementById("signinForm");

signinForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signinEmail").value;
  const password = document.getElementById("signinPassword").value;

  try {
    // Sign In
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check if email is verified
    if (user.emailVerified) {
      alert("✅ Login successful: " + user.email);
      window.location.href = "dashboard.html"; // redirect to dashboard
    } else {
      alert("⚠️ Please verify your email first.");
      await auth.signOut();
    }

  } catch (error) {
    alert("❌ Error: " + error.message);
  }
});

// Optional: Logout Button
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    alert("ℹ️ Logged out successfully");
    window.location.href = "signin.html";
  });
}
