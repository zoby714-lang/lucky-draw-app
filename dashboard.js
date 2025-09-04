// dashboard.js  (FINAL)
import { auth, db } from "./firebase-config.js";
import {
  onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc, getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const $ = (s)=>document.querySelector(s);
const userLine = $("#userLine");
const logoutBtn = $("#logoutBtn");
const btnDeposit = $("#btnDeposit");
const btnWithdraw = $("#btnWithdraw");

onAuthStateChanged(auth, async (user)=>{
  if (!user) {
    location.href = "signin.html";
    return;
  }
  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    const name = snap.exists() ? (snap.data().name || "") : "";
    userLine.textContent = `خوش آمدید ${name || user.email}!`;
  } catch {
    userLine.textContent = `خوش آمدید ${user.email}!`;
  }
});

logoutBtn.addEventListener("click", async ()=>{
  await signOut(auth);
  location.href = "signin.html";
});

btnDeposit.addEventListener("click", ()=>{
  alert("اعتماد کا شکریہ! ادائیگی اور قرعہ اندازی آپ کی رجسٹریشن کی تصدیق کے بعد فعال ہوگی۔");
});

btnWithdraw.addEventListener("click", ()=>{
  alert("ویریفکیشن کے بعد ودڈرا سہولت فعال ہوگی۔ شکریہ!");
});
