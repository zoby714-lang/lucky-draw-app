import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const signinForm = document.getElementById("signinForm");

signinForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signinEmail").value;
  const password = document.getElementById("signinPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Signin successful!");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
});
