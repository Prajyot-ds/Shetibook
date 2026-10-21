// Global App Logic
let currentUser = null;

async function checkAuth() {
  try {
    const res = await fetch('/api/auth/me');
    if (res.ok) { const data = await res.json(); currentUser = data.user; }
    else currentUser = null;
  } catch { currentUser = null; }
  updateNavAuth();
  return currentUser;
}

function updateNavAuth() {
  document.querySelectorAll('.auth-only').forEach(el => el.style.display = currentUser ? '' : 'none');
  document.querySelectorAll('.guest-only').forEach(el => el.style.display = currentUser ? 'none' : '');
  const nameEl = document.getElementById('user-name');
  if (nameEl && currentUser) nameEl.textContent = currentUser.name;
}

async function logout() {
  await fetch('/api/auth/logout', { method: 'POST' });
  currentUser = null;
  window.location.href = '/';
}

function showToast(msg, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) { container = document.createElement('div'); container.className = 'toast-container'; document.body.appendChild(container); }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.borderLeft = `4px solid var(--${type === 'error' ? 'danger' : type === 'warning' ? 'warning' : 'success'})`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
}

function requireLogin() {
  if (!currentUser) { window.location.href = '/login.html'; return false; }
  return true;
}

// Voice Recognition
let recognition = null;
let isRecording = false;

function initVoice(targetInput) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) { showToast(t('voice_not_supported'), 'warning'); return null; }
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  const langMap = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN' };
  recognition.lang = langMap[getLang()] || 'en-IN';
  recognition.onresult = (e) => {
    let transcript = '';
    for (let i = e.resultIndex; i < e.results.length; i++) transcript += e.results[i][0].transcript;
    if (targetInput) targetInput.value = transcript;
  };
  recognition.onend = () => { isRecording = false; updateVoiceBtn(); };
  recognition.onerror = () => { isRecording = false; updateVoiceBtn(); };
  return recognition;
}

function toggleVoice(targetInput) {
  if (isRecording) { recognition && recognition.stop(); isRecording = false; }
  else {
    initVoice(targetInput);
    if (recognition) { recognition.start(); isRecording = true; showToast(t('voice_listening'), 'success'); }
  }
  updateVoiceBtn();
}

function updateVoiceBtn() {
  document.querySelectorAll('.voice-btn').forEach(btn => btn.classList.toggle('recording', isRecording));
}

// Mobile nav toggle
function toggleMobileNav() {
  const nav = document.querySelector('.nav-links');
  if (nav) nav.classList.toggle('show');
}

// Crop emoji map
const cropEmojis = { 
  Wheat: '🌾', Rice: '🍚', Cotton: '☁️', Tomato: '🍅', 
  Sugarcane: '🎋', Soybean: '🫘', Onion: '🧅', Potato: '🥔',
  Maize: '🌽', Corn: '🌽', Mustard: '🟡', Gram: '🫘',
  Chilli: '🌶️', Garlic: '🧄', Ginger: '🫚'
};
function getCropEmoji(name) { return cropEmojis[name] || '🌱'; }

// Time ago
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return mins + 'm ago';
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + 'h ago';
  return Math.floor(hrs / 24) + 'd ago';
}

// Init on page load
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  setLanguage(getLang());
  // Language button listeners
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
  // Mobile toggle
  const toggle = document.querySelector('.mobile-toggle');
  if (toggle) toggle.addEventListener('click', toggleMobileNav);
  // Logout buttons
  document.querySelectorAll('.logout-btn').forEach(btn => btn.addEventListener('click', logout));
});
