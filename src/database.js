// src/database.js
import { db, auth } from "./firebase.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Save user data in DB
export function saveUserData(userId, data) {
  return set(ref(db, 'users/' + userId), data);
}
