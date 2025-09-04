// signup.js  (FINAL)
import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc, setDoc, serverTimestamp, increment, getFirestore, getDoc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const $ = (s)=>document.querySelector(s);
const form = $("#signupForm");
const msg  = $("#signupMsg");

// eye toggle
document.querySelectorAll(".eye").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const targetId = btn.getAttribute("data-target");
    const input = document.getElementById(targetId);
    input.type = input.type === "password" ? "text" : "password";
  });
});

form.addEventListener("submit", async (e)=>{
  e.preventDefault();
  msg.textContent = "رجسٹریشن جاری ہے…";
  msg.className = "msg info";

  const name  = $("#signupName").value.trim();
  const phone = $("#signupPhone").value.trim();
  const email = $("#signupEmail").value.trim();
  const pass  = $("#signupPassword").value;

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(cred.user, { displayName: name });
    // firestore user doc
    await setDoc(doc(db, "users", cred.user.uid), {
      name, phone, email,
      createdAt: serverTimestamp(),
      role: "member"
    });

    // optional: app-meta/metrics counter
    const metaRef = doc(db, "app-meta", "metrics");
    try {
      const snap = await getDoc(metaRef);
      if (snap.exists()) {
        await updateDoc(metaRef, { usersCount: increment(1) });
      } else {
        await setDoc(metaRef, { usersCount: 1 }, { merge: true });
      }
    } catch(_) {}

    // email verification (optional)
    try { await sendEmailVerification(cred.user); } catch(_) {}

    msg.textContent = "اکاؤنٹ بن گیا! اگر ای میل ویری فکیشن آن ہے تو میل چیک کریں۔ اب سائن اِن کریں۔";
    msg.className = "msg success";

    setTimeout(()=> location.href = "signin.html", 1200);
  } catch (err) {
    msg.textContent = "مسئلہ: " + (err?.message || err);
    msg.className = "msg error";
  }
});
