// signin.js  (FINAL)
import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const $ = (s)=>document.querySelector(s);
const form = $("#signinForm");
const msg  = $("#signinMsg");

document.querySelectorAll(".eye").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const targetId = btn.getAttribute("data-target");
    const input = document.getElementById(targetId);
    input.type = input.type === "password" ? "text" : "password";
  });
});

form.addEventListener("submit", async (e)=>{
  e.preventDefault();
  msg.textContent = "سائن اِن ہو رہا ہے…";
  msg.className = "msg info";

  const email = $("#signinEmail").value.trim();
  const pass  = $("#signinPassword").value;

  try {
    const cred = await signInWithEmailAndPassword(auth, email, pass);

    // اگر لازم کریں تو ای میل ویری فائی چیک:
    // if (!cred.user.emailVerified) {
    //   msg.textContent = "براہ کرم ای میل ویری فائی کریں۔ میل دوبارہ بھیج دی گئی ہے۔";
    //   msg.className = "msg warn";
    //   try { await sendEmailVerification(cred.user); } catch(_) {}
    //   return;
    // }

    msg.textContent = "کامیاب! ڈیش بورڈ کھل رہا ہے…";
    msg.className = "msg success";
    setTimeout(()=> location.href = "dashboard.html", 600);
  } catch (err) {
    msg.textContent = "مسئلہ: " + (err?.message || err);
    msg.className = "msg error";
  }
});
