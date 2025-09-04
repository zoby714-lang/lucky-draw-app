// signin.js
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from "./firebase-config.js";

const emailEl = document.getElementById("signinEmail");
const passEl  = document.getElementById("signinPassword");
const msgEl   = document.getElementById("signinMsg");

document.getElementById("toggleSigninPass").addEventListener("click", () => {
  passEl.type = (passEl.type === "password") ? "text" : "password";
});

document.getElementById("signinBtn").addEventListener("click", async () => {
  const email = emailEl.value.trim();
  const password = passEl.value;

  if(!email || !password){ return show("براہ کرم ای میل/پاس ورڈ درج کریں"); }

  try{
    await signInWithEmailAndPassword(auth, email, password);
    show("سائن اِن کامیاب ✅", true);
    setTimeout(()=>location.replace("dashboard.html"), 500);
  }catch(e){
    show("❌ " + (e.message || e));
  }
});

function show(text, ok=false){
  msgEl.style.display = "block";
  msgEl.style.color = ok ? "#065f46" : "#7f1d1d";
  msgEl.textContent = text;
}
