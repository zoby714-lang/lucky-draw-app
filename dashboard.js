import {
  auth, db, onAuthStateChanged, signOut
} from './firebase-config.js';
import { ref, set, update, push, onValue, remove } from './firebase-config.js';

const who    = document.getElementById('whoami');
const logout = document.getElementById('logoutBtn');

// پروٹیکشن: صرف لاگ اِن یوزر دیکھ سکے
onAuthStateChanged(auth, async (user)=>{
  if(!user){ location.replace('signin.html'); return; }
  who.textContent = `${user.displayName || ''} (${user.email})`;

  // یوزر پروفائل لَوٹائیں
  const profileRef = ref(db, `users/${user.uid}/profile`);
  onValue(profileRef, (snap)=>{
    const p = snap.val() || {};
    document.getElementById('fullName').value = p.name || '';
    document.getElementById('phone').value    = p.phone || '';
  });

  // نوٹس لِسٹ
  const listRef = ref(db, `users/${user.uid}/notes`);
  onValue(listRef, (snap)=>{
    const ul = document.getElementById('noteList');
    ul.innerHTML = '';
    const data = snap.val() || {};
    Object.entries(data).forEach(([id, item])=>{
      const li = document.createElement('li');
      li.textContent = item.text;
      const del = document.createElement('button');
      del.className = 'btn danger small';
      del.textContent = 'حذف';
      del.onclick = ()=> remove(ref(db, `users/${user.uid}/notes/${id}`));
      li.appendChild(del);
      ul.appendChild(li);
    });
  });
});

// لاگ آؤٹ
logout?.addEventListener('click', async ()=>{
  await signOut(auth);
  location.replace('index.html');
});

// پروفائل محفوظ کریں
document.getElementById('profileForm')?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const msg = document.getElementById('profileMsg');
  msg.textContent = '';
  const name  = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const uid   = auth.currentUser?.uid;
  if(!uid) return;

  try{
    await update(ref(db, `users/${uid}/profile`), { name, phone, updatedAt: Date.now() });
    msg.style.color = '#86efac'; msg.textContent = 'پروفائل محفوظ ہو گئی ✅';
  }catch(err){
    msg.style.color = '#fca5a5'; msg.textContent = `Error: ${err.code || err.message}`;
  }
});

// نوٹ/ریکارڈ محفوظ کریں
document.getElementById('noteForm')?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const text = document.getElementById('noteText').value.trim();
  if(!text) return;
  const uid = auth.currentUser?.uid;
  if(!uid) return;

  await set(push(ref(db, `users/${uid}/notes`)), {
    text, createdAt: Date.now()
  });
  document.getElementById('noteText').value = '';
});
