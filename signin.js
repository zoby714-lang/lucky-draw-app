import {
  auth, ALLOW_UNVERIFIED, signInWithEmailAndPassword, signOut
} from './firebase-config.js';

const form   = document.getElementById('signinForm');
const btn    = document.getElementById('signinBtn');
const msgBox = document.getElementById('signinMsg');

function say(msg, ok=false){
  msgBox.textContent = msg;
  msgBox.style.color = ok ? '#86efac' : '#fca5a5';
}

form?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  btn.disabled = true; btn.textContent = 'لاگ اِن ہو رہا ہے…'; say('');

  const email = document.getElementById('signinEmail').value.trim();
  const pass  = document.getElementById('signinPassword').value;

  try{
    const cred = await signInWithEmailAndPassword(auth, email, pass);

    if (!ALLOW_UNVERIFIED && !cred.user.emailVerified){
      await signOut(auth);
      say('براہِ کرم پہلے اپنی ای میل verify کریں!', false);
      return;
    }

    // کامیابی
    location.href = 'dashboard.html';
  } catch(err){
    console.error(err);
    say(`Error: ${err.code || err.message}`);
  } finally {
    btn.disabled = false; btn.textContent = 'لاگ اِن';
  }
});
