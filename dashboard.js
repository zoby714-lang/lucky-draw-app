import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const userEmail = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, (user) => {
  if (user) {
    userEmail.textContent = user.email;
  } else {
    window.location.href = "signin.html"; // اگر یوزر لاگ ان نہیں تو واپس بھیج دیں
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "signin.html";
});
