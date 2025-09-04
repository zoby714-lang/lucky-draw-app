// dashboard.js
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { collection, getDocs, addDoc, query, where, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { auth, db } from "./firebase-config.js";

// ===== Top Buttons =====
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  location.replace("signin.html");
});

document.getElementById("withdrawBtn").addEventListener("click", () => {
  toast("ویری فکیشن کے بعد ودڈرا کی سہولت میسر ہوگی۔ شکریہ!");
});

document.getElementById("joinBtn").addEventListener("click", async () => {
  // “آج کے ڈرا میں شامل ہوں” → صرف شکریہ + ایک ڈمی انٹری ریکارڈ ہو (تاکہ Today Count بڑھے)
  const user = auth.currentUser;
  if(!user){ return toast("براہ کرم لاگ اِن کریں"); }

  try{
    // آج کی تاریخ کی ایک سنگل انٹری (ایک بار)
    const dateKey = todayKey();
    const already = await getDocs(query(collection(db, "entries"),
                       where("uid","==", user.uid),
                       where("dateKey","==", dateKey)));
    if(already.size === 0){
      await addDoc(collection(db, "entries"), {
        uid: user.uid,
        dateKey,
        masked: await maskedUser(user.uid),
        createdAt: serverTimestamp()
      });
    }
    toast("اعتماد کرنے کا شکریہ! ادائیگی اور قرعہ اندازی آپ کی رجسٹریشن کی تصدیق کے بعد ہوگی۔");
    await loadParticipants(); // ریفریش
  }catch(e){
    console.error(e);
    toast("فی الحال شامل نہیں کیا جا سکا، دوبارہ کوشش کریں۔");
  }
});

// ===== Countdown (till 6PM) =====
function startCountdown(){
  const el = document.getElementById("countdown");
  const deadline = todayAt(18,0,0); // 6 PM
  function tick(){
    const diff = deadline - new Date();
    if(diff <= 0){
      el.textContent = "ڈپازٹ کا وقت ختم ہو گیا ⏳";
      stopScrolling();
      pickWinner();
      return;
    }
    const hrs = Math.floor(diff/1000/60/60);
    const mins = Math.floor((diff/1000/60)%60);
    const secs = Math.floor((diff/1000)%60);
    el.textContent = `${hrs} گھنٹے ${mins} منٹ ${secs} سیکنڈ`;
  }
  tick();
  setInterval(tick, 1000);
}
startCountdown();

// ===== Scrolling Names =====
let scrollTimer=null;
let scrollingList = [];

async function loadParticipants(){
  try{
    // صرف آج کی انٹریز لیں
    const dateKey = todayKey();
    const snap = await getDocs(query(collection(db,"entries"), where("dateKey","==",dateKey)));
    const arr = [];
    snap.forEach(d => {
      const x = d.data();
      if(x && x.masked) arr.push(x.masked);
    });
    // اگر کچھ نہ ہو تو ڈمی لسٹ دکھائیں تاکہ UI خالی نہ لگے
    scrollingList = arr.length ? arr : [
      "Ali K*** — 03******12",
      "Sara M*** — 03******45",
      "Ahmed R*** — 03******78",
      "Zara T*** — 03******90",
    ];
    document.getElementById("todayCount").textContent = arr.length;
    startScrolling();
  }catch(e){
    console.error(e);
    // fallback
    scrollingList = ["Guests — 03******00"];
    startScrolling();
  }
}

function startScrolling(){
  stopScrolling();
  const box = document.getElementById("scrollingNames");
  let i=0;
  scrollTimer = setInterval(()=>{
    box.textContent = scrollingList[i % scrollingList.length];
    i++;
  }, 1200);
}
function stopScrolling(){
  if(scrollTimer){ clearInterval(scrollTimer); scrollTimer=null; }
}

// ===== Winner Logic (15th participant) =====
function pickWinner(){
  const box = document.getElementById("winnerBox");
  if(scrollingList.length >= 15){
    const winner = scrollingList[14]; // 15th
    box.textContent = `🎉 آج کا ونر: ${winner}`;
  }else{
    box.textContent = "آج ونر منتخب کرنے کیلئے کافی پارٹیسپنٹس نہیں ہیں ❌";
  }
}

// ===== Helpers =====
function todayKey(){
  const d = new Date();
  return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,"0")}-${d.getDate().toString().padStart(2,"0")}`;
}
function todayAt(h,m,s){
  const d = new Date();
  d.setHours(h,m,s,0);
  return d;
}
async function maskedUser(uid){
  // پرائیویٹ یوزر ڈیٹا کو نہیں پڑھتے (سیکیور رولز کی وجہ سے) — اس لیے سادہ ماسک
  // چاہیں تو signup کے وقت publicMasked بھی ساتھ users doc میں رکھ سکتے ہیں
  return "Registered User — 03******XX";
}

function toast(text){
  const el = document.getElementById("dashMsg");
  el.textContent = text;
  el.style.display = "block";
  setTimeout(()=>{ el.style.display="none"; }, 4000);
}

// پہلی بار لوڈ + ہر 30 سیکنڈ بعد ریفریش
loadParticipants();
setInterval(loadParticipants, 30000);
