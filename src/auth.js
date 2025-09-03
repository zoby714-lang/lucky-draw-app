// src/auth.js
import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Signup Function
export function signupUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Login Function
export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
