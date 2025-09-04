import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { app } from "./firebase-config.js";

const db = getFirestore(app);

// Timer (Deposit Deadline Example = 6 PM)
function startCountdown() {
  const countdownEl = document.getElementById("countdown");
  const deadline = new Date();
  deadline.setHours(18, 0, 0, 0); // شام 6 بجے

  function updateCountdown() {
    const now = new Date();
    const diff = deadline - now;

    if (diff <= 0) {
      countdownEl.textContent = "ڈپازٹ کا وقت ختم ہو گیا ⏳";
      stopScrolling(); // Names stop
      setTimeout(drawWinner, 2000); // Winner select
      return;
    }

    const hrs = Math.floor(diff / 1000 / 60 / 60);
    const mins = Math.floor((diff / 1000 / 60) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    countdownEl.textContent = `${hrs} گھنٹے ${mins} منٹ ${secs} سیکنڈ`;
  }

  setInterval(updateCountdown, 1000);
}
startCountdown();

// Customers Array
let customers = [];
let scrollInterval;

// Firebase سے کسٹمرز لوڈ کریں
async function loadCustomers() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    customers = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      customers.push({
        name: data.name || "نام نہیں",
        phone: data.phone || "نمبر نہیں"
      });
    });

    if (customers.length > 0) {
      startScrolling();
    }
  } catch (err) {
    console.error("Error loading customers:", err);
  }
}

// Scrolling Effect
function startScrolling() {
  const box = document.getElementById("scrollingNames");
  let i = 0;
  clearInterval(scrollInterval);
  scrollInterval = setInterval(() => {
    const c = customers[i % customers.length];
    box.textContent = `${c.name} — ${c.phone}`;
    i++;
  }, 1500);
}
function stopScrolling() {
  clearInterval(scrollInterval);
}

// Winner Logic (15th customer wins)
async function drawWinner() {
  const winnerBox = document.getElementById("winnerBox");
  if (customers.length >= 15) {
    const winner = customers[14]; // 15th customer
    winnerBox.textContent = `🎉 آج کا ونر: ${winner.name} (${winner.phone})`;

    // ✅ Save winner in Firebase
    try {
      await addDoc(collection(db, "winners"), {
        name: winner.name,
        phone: winner.phone,
        createdAt: serverTimestamp()
      });
      console.log("Winner saved successfully ✅");
    } catch (err) {
      console.error("Error saving winner:", err);
    }

  } else {
    winnerBox.textContent = "کافی کسٹمرز نہیں ہیں ❌";
  }

  // Confetti Blast
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// Start
loadCustomers();

// ✅ Auto Refresh after 30 seconds
setInterval(() => {
  loadCustomers();
}, 30000);
