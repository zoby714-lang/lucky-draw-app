// Import Firebase Auth
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { app } from "./firebase-config.js";  

const auth = getAuth(app);

// Form Element
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    // Create user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send email verification
    await sendEmailVerification(user);

    alert("✅ Account created! Please check your email for verification link.");
    signupForm.reset();

  } catch (error) {
    alert("❌ Error: " + error.message);
  }
});
