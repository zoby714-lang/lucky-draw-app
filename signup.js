// signup.js
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { auth, db } from "./firebase-config.js";

const nameEl = document.getElementById("signupName");
const phoneEl = document.getElementById("signupPhone");
const emailEl = document.getElementById("signupEmail");
const passEl = document.getElementById("signupPassword");
const msgEl  = document.getElementById("signupMsg");

document.getElementById("toggleSignupPass").addEventListener("click", () => {
  passEl.type = (passEl.type === "password") ? "text" : "password";
});

document.getElementById("signupBtn").addEventListener("click", async () => {
  const name = nameEl.value.trim();
  const phone = phoneEl.value.trim();
  const email = emailEl.value.trim();
  const password = passEl.value;

  if(!name || !phone || !email || password.length < 6){
    show("براہ کرم تمام فیلڈز درست بھریں (پاس ورڈ کم از کم 6 حروف)"); return;
  }

  try{
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", cred.user.uid), {
      name, phone, email, createdAt: serverTimestamp()
    });
    show("اکاؤنٹ بن گیا ✅ آپ ڈیش بورڈ پر لے جائے جا رہے ہیں…", true);
    setTimeout(()=>location.replace("dashboard.html"), 700);
  }catch(e){
    show("❌ " + (e.message || e));
  }
});

function show(text, ok=false){
  msgEl.style.display = "block";
  msgEl.style.color = ok ? "#065f46" : "#7f1d1d";
  msgEl.textContent = text;
}
