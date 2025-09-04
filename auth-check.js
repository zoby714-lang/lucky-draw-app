// auth-check.js
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from "./firebase-config.js";

onAuthStateChanged(auth, (user) => {
  const page = (window.location.pathname.split("/").pop() || "index.html");

  if (user) {
    if (["index.html", "", "signin.html", "signup.html"].includes(page)) {
      window.location.replace("dashboard.html");
    }
  } else {
    if (page === "dashboard.html") {
      window.location.replace("signin.html");
    }
  }
});
