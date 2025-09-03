import { getAuth, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { app } from "./firebase-config.js";

const auth = getAuth(app);

// User Check
onAuthStateChanged(auth, (user) => {
  if (user && user.emailVerified) {
    document.getElementById("userEmail").innerText = "✅ Logged in as: " + user.email;
  } else {
    window.location.href = "signin.html"; // Redirect if not logged in
  }
});

// Buttons
const depositBtn = document.getElementById("depositBtn");
const withdrawBtn = document.getElementById("withdrawBtn");
const lotteryBtn = document.getElementById("lotteryBtn");
const logoutBtn = document.getElementById("logoutBtn");
const messageBox = document.getElementById("messageBox");

depositBtn.addEventListener("click", () => {
  showMessage("⚠️ Deposit will be available after verification.");
});

withdrawBtn.addEventListener("click", () => {
  showMessage("⚠️ Withdraw will be available after verification.");
});

lotteryBtn.addEventListener("click", () => {
  showMessage("🎲 Daily Qurrah draw will be live at 8:00 PM.");
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  alert("ℹ️ Logged out successfully");
  window.location.href = "signin.html";
});

// Helper Function
function showMessage(msg) {
  messageBox.innerText = msg;
  messageBox.classList.remove("hidden");
}
