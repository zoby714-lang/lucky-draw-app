import {
  auth, db, ALLOW_UNVERIFIED,
  createUserWithEmailAndPassword, sendEmailVerification, updateProfile
} from './firebase-config.js';
import { ref, set } from './firebase-config.js';

const form   = document.getElementById('signupForm');
const btn    = document.getElementById('signupBtn');
const msgBox = document.getElementById('signupMsg');

function say(msg, ok=false){
  msgBox.textContent = msg;
  msgBox.style.color = ok ? '#86efac' : '#fca5a5';
}

form?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  btn.disabled = true; btn.textContent = 'براہِ کرم انتظار کریں…'; say('');

  const name = document.getElementById('signupName')?.value?.trim() || '';
  const email = document.getElementById('signupEmail').value.trim();
  const pass  = document.getElementById('signupPassword').value;

  try{
    const cred = await createUserWithEmailAndPassword(auth, email, pass);

    // نام سیٹ کریں (اگر دیا)
    if(name) await updateProfile(cred.user, { displayName: name });

    // DB میں یوزر پروفائل بنائیں
    await set(ref(db, `users/${cred.user.uid}/profile`), {
      uid: cred.user.uid,
      email: cred.user.email,
      name: name || null,
      createdAt: Date.now()
    });

    // ویری فکیشن ای میل بھیجیں (کوشش ضرور کریں)
    try {
      await sendEmailVerification(cred.user);
      say('ویری فکیشن ای میل بھیج دی گئی ہے۔ انباکس/اسپیم چیک کریں۔', true);
    } catch (e) {
      // اگر ای میل نہ جائے تو بھی اکاؤنٹ بن چکا ہوگا
      console.warn('email verification failed:', e);
    }

    if (ALLOW_UNVERIFIED) {
      // سیدھا ڈیش بورڈ پر
      location.href = 'dashboard.html';
    } else {
      say('براہِ کرم پہلے ای میل verify کریں پھر لاگ اِن کریں۔', true);
    }
  } catch(err){
    console.error(err);
    say(`Error: ${err.code || err.message}`);
  } finally {
    btn.disabled = false; btn.textContent = 'سائن اَپ';
  }
});
