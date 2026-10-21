// ============================================================
// SHETIBOOK AI ASSISTANT - chatbot.js
// ============================================================

const BOT_KNOWLEDGE = {
  greetings: ['hello','hi','hey','namaste','namaskar','helo'],
  crops: ['crop','wheat','rice','cotton','tomato','sugarcane','soybean','onion','potato','maize','corn'],
  disease: ['disease','blight','rust','rot','wilt','fungus','pest','insect','bug','virus','yellowing','spots'],
  schemes: ['scheme','subsidy','loan','pm kisan','kisan','government','yojana','financial','money','benefit'],
  vendors: ['vendor','seller','buy','purchase','seeds','fertilizer','pesticide','equipment','tractor','supplier'],
  diagnose: ['diagnose','identify','detect','problem','sick','dying','leaves','color','symptom'],
  weather: ['weather','rain','monsoon','temperature','climate','forecast','season'],
  community: ['community','forum','post','farmer','question','help','share','discuss'],
  contact: ['contact','phone','helpline','number','call','emergency','support'],
  organic: ['organic','natural','bio','environment','sustainable','compost','neem'],
};

const QUICK_REPLIES = [
  ['🌾 Crop diseases', '💰 Govt schemes', '🛒 Find vendors'],
  ['🔬 Diagnose my crop', '📞 Helpline numbers', '🍃 Organic farming'],
];

let quickReplyIndex = 0;
let isTyping = false;
let chatVoiceListening = false;
let chatRecognition = null;

// ---- BOT RESPONSES ----
function getBotReply(msg) {
  const m = msg.toLowerCase();

  if (BOT_KNOWLEDGE.greetings.some(w => m.includes(w))) {
    return `🙏 Namaste! I'm **Krishi**, your ShetiBook AI Assistant.\n\nI can help you with:\n• 🌾 Crop diseases & diagnosis\n• 💰 Government schemes & subsidies\n• 🛒 Finding agri vendors\n• 🌱 Farming tips & best practices\n• 📞 Emergency helpline numbers\n\nWhat would you like to know?`;
  }
  if (BOT_KNOWLEDGE.disease.some(w => m.includes(w))) {
    return `🔬 **Crop Disease Help**\n\nFor disease diagnosis:\n1. Go to **[Diagnose page](/diagnose.html)** – upload a photo or describe symptoms\n2. Common diseases: Blight, Rust, Wilt, Powdery Mildew\n3. **Emergency:** Call Kisan Helpline: **1800-180-1551** (Free)\n\nTip: Early detection saves your crop! Describe your symptoms and I'll guide you further. 🌿`;
  }
  if (BOT_KNOWLEDGE.schemes.some(w => m.includes(w))) {
    return `💰 **Government Schemes for Farmers**\n\n🏦 **PM-KISAN** – ₹6,000/year direct to bank\n🌾 **PM Fasal Bima** – Crop insurance\n💧 **PM Sinchai Yojana** – Irrigation subsidy\n🧑‍🌾 **Kisan Credit Card** – Low interest crop loans\n🌱 **Soil Health Card** – Free soil testing\n\nVisit **[Schemes page](/schemes.html)** for full details & how to apply! 📋`;
  }
  if (BOT_KNOWLEDGE.vendors.some(w => m.includes(w))) {
    return `🛒 **Find Agricultural Vendors**\n\nVisit our **[Vendors page](/vendors.html)** to find:\n• 🌱 Certified seed suppliers\n• 🧪 Fertilizer dealers\n• 🛡️ Pesticide distributors\n• 🚜 Farm equipment providers\n• 🍃 Organic product sellers\n\nAll vendors are verified! You can call them directly or visit their websites. 👍`;
  }
  if (BOT_KNOWLEDGE.diagnose.some(w => m.includes(w))) {
    return `🔬 **Crop Diagnosis Tool**\n\nOur AI diagnosis tool can help identify:\n✅ Upload a clear photo of the affected crop\n✅ Describe the symptoms you see\n✅ Use voice input in your language\n\n👉 **[Click here to Diagnose](/diagnose.html)**\n\nFor urgent help, call **1800-180-1551** (Free Kisan Helpline) 📞`;
  }
  if (BOT_KNOWLEDGE.weather.some(w => m.includes(w))) {
    return `🌦️ **Weather & Farming Tips**\n\n• India Meteorological Dept: **mausam.imd.gov.in**\n• Kisan weather SMS: SMS 'WEATHER' to 51969\n• Best sowing: Check local rainfall forecast\n\n🌧️ **Kharif season:** June–September (Rice, Cotton, Maize)\n☀️ **Rabi season:** October–March (Wheat, Mustard, Gram)\n\nNeed tips for a specific crop? Ask me! 🌾`;
  }
  if (BOT_KNOWLEDGE.contact.some(w => m.includes(w))) {
    return `📞 **Important Agricultural Helplines**\n\n🟢 **Kisan Call Centre:** 1800-180-1551 (Free, 24x7)\n🟢 **PM-KISAN Helpline:** 155261\n🟢 **Soil Testing:** 1800-180-2117\n🟢 **Crop Insurance:** 14447\n🟢 **Agriculture Ministry:** 011-2338-2651\n\nAll calls are **FREE** from any phone! 📱`;
  }
  if (BOT_KNOWLEDGE.organic.some(w => m.includes(w))) {
    return `🍃 **Organic Farming Tips**\n\n✅ Use **Vermicompost** instead of chemical fertilizers\n✅ **Neem oil spray** – natural pesticide\n✅ **Green manure** – grow legumes to enrich soil\n✅ **Crop rotation** – prevents disease buildup\n✅ **Composting** – turn kitchen waste to gold!\n\nFind organic vendors on our **[Vendors page](/vendors.html)** 🌿\n\nOrganic certification: Contact **APEDA** at 1800-111-175`;
  }
  if (BOT_KNOWLEDGE.community.some(w => m.includes(w))) {
    return `👥 **Farmer Community Forum**\n\nJoin thousands of farmers on ShetiBook:\n💬 Ask questions & get answers\n📢 Share farming tips & success stories\n🛒 Get market price information\n🤝 Connect with nearby farmers\n\n👉 **[Visit Community](/community.html)**\n\nRegister free to post & comment! 🌾`;
  }
  if (m.includes('register') || m.includes('signup') || m.includes('account')) {
    return `📝 **Join ShetiBook Free!**\n\n✅ Create your farmer account\n✅ Get personalized crop advice\n✅ Access all features & community\n✅ Track your diagnoses\n\n👉 **[Register Now](/register.html)** – it's completely free!\n\nAlready have an account? **[Login here](/login.html)** 🔐`;
  }
  if (m.includes('language') || m.includes('hindi') || m.includes('marathi') || m.includes('bhasha')) {
    return `🗣️ **Multi-Language Support**\n\nShetiBook supports:\n🇮🇳 **Hindi** (हिंदी)\n🌾 **Marathi** (मराठी)\n🌍 **English**\n\nSwitch language using the buttons in the top navigation bar!\n\nVoice input also works in Hindi & Marathi! 🎤`;
  }
  if (m.length < 5) {
    return `I'm here to help! 😊 Ask me about:\n• Crop diseases & diagnosis\n• Government schemes\n• Vendors & suppliers\n• Farming tips\n• Emergency helplines`;
  }
  // Default
  return `🤔 I understand you're asking about "${msg.substring(0,40)}..."\n\nI'm your ShetiBook farming assistant! I can help with:\n• 🌾 **Crop diseases** – [Diagnose now](/diagnose.html)\n• 💰 **Govt schemes** – [View schemes](/schemes.html)\n• 🛒 **Vendors** – [Find suppliers](/vendors.html)\n• 👥 **Community** – [Join forum](/community.html)\n\nFor expert help: **📞 1800-180-1551** (Free Kisan Helpline)`;
}

// ---- FORMAT MARKDOWN ----
function formatMsg(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/\n/g, '<br>');
}

// ---- ADD MESSAGE ----
function addMessage(text, sender = 'bot') {
  const msgs = document.getElementById('chatbot-msgs');
  if (!msgs) return;
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const div = document.createElement('div');
  div.className = `chat-msg ${sender}`;
  div.innerHTML = `
    <div class="chat-msg-avatar">${sender === 'bot' ? '🌱' : '👤'}</div>
    <div>
      <div class="chat-bubble">${formatMsg(text)}</div>
      <div class="chat-time">${now}</div>
    </div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  // Show quick replies after bot message
  if (sender === 'bot') showQuickReplies();
}

// ---- TYPING INDICATOR ----
function showTyping() {
  const msgs = document.getElementById('chatbot-msgs');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = 'chat-msg bot'; div.id = 'typing-indicator';
  div.innerHTML = `<div class="chat-msg-avatar">🌱</div><div class="chat-bubble typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}
function removeTyping() {
  const t = document.getElementById('typing-indicator');
  if (t) t.remove();
}

// ---- QUICK REPLIES ----
function showQuickReplies() {
  const area = document.getElementById('quick-replies-area');
  if (!area) return;
  const replies = QUICK_REPLIES[quickReplyIndex % QUICK_REPLIES.length];
  quickReplyIndex++;
  area.innerHTML = replies.map(r => `<button class="quick-reply-btn">${r}</button>`).join('');
  area.querySelectorAll('.quick-reply-btn').forEach(btn => {
    btn.addEventListener('click', () => sendMessage(btn.textContent));
  });
}

// ---- SEND MESSAGE ----
function sendMessage(text) {
  const input = document.getElementById('chatbot-input');
  const msg = text || (input ? input.value.trim() : '');
  if (!msg || isTyping) return;
  if (input) input.value = '';
  // Clear quick replies
  const qa = document.getElementById('quick-replies-area');
  if (qa) qa.innerHTML = '';
  addMessage(msg, 'user');
  isTyping = true;
  const sendBtn = document.getElementById('chatbot-send');
  if (sendBtn) sendBtn.disabled = true;
  showTyping();
  const delay = 800 + Math.random() * 700;
  setTimeout(() => {
    removeTyping();
    addMessage(getBotReply(msg), 'bot');
    isTyping = false;
    if (sendBtn) sendBtn.disabled = false;
  }, delay);
}

// ---- VOICE INPUT ----
function toggleChatVoice() {
  const voiceBtn = document.getElementById('chatbot-voice');
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) { addMessage('⚠️ Voice not supported in this browser. Please use Chrome or Edge.', 'bot'); return; }
  if (chatVoiceListening) {
    chatRecognition && chatRecognition.stop();
    chatVoiceListening = false;
    if (voiceBtn) voiceBtn.classList.remove('listening');
    return;
  }
  chatRecognition = new SpeechRecognition();
  chatRecognition.lang = 'hi-IN';
  chatRecognition.interimResults = false;
  chatRecognition.onresult = e => {
    const transcript = e.results[0][0].transcript;
    const input = document.getElementById('chatbot-input');
    if (input) input.value = transcript;
    sendMessage(transcript);
  };
  chatRecognition.onend = () => { chatVoiceListening = false; if (voiceBtn) voiceBtn.classList.remove('listening'); };
  chatRecognition.onerror = () => { chatVoiceListening = false; if (voiceBtn) voiceBtn.classList.remove('listening'); };
  chatRecognition.start();
  chatVoiceListening = true;
  if (voiceBtn) voiceBtn.classList.add('listening');
}

// ---- BUILD UI ----
function buildChatbotUI() {
  // Inject CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet'; link.href = '/css/chatbot.css';
  document.head.appendChild(link);

  // Toggle Button
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'chatbot-toggle';
  toggleBtn.innerHTML = '🌱<span class="notif-dot"></span>';
  toggleBtn.setAttribute('aria-label', 'Open AI Assistant');
  document.body.appendChild(toggleBtn);

  // Chat Window
  const win = document.createElement('div');
  win.id = 'chatbot-window';
  win.setAttribute('role', 'dialog');
  win.setAttribute('aria-label', 'ShetiBook AI Assistant');
  win.innerHTML = `
    <div class="chatbot-header">
      <div class="chatbot-avatar">🌱</div>
      <div class="chatbot-header-info">
        <h4>Krishi AI Assistant</h4>
        <span>● Online – Farming Expert</span>
      </div>
      <div class="chatbot-header-actions">
        <button id="chatbot-clear" title="Clear chat">🗑️</button>
        <button id="chatbot-close" title="Close">✕</button>
      </div>
    </div>
    <div class="chatbot-messages" id="chatbot-msgs"></div>
    <div class="quick-replies" id="quick-replies-area"></div>
    <div class="chatbot-input-area">
      <button id="chatbot-voice" title="Voice input">🎤</button>
      <textarea id="chatbot-input" rows="1" placeholder="Ask me anything about farming..."></textarea>
      <button id="chatbot-send">➤</button>
    </div>
    <div class="chatbot-footer">🌾 Powered by ShetiBook AI · Your Farming Companion</div>
  `;
  document.body.appendChild(win);

  // Events
  toggleBtn.addEventListener('click', () => {
    const isOpen = win.classList.toggle('visible');
    toggleBtn.classList.toggle('open', isOpen);
    // Hide notif dot
    const dot = toggleBtn.querySelector('.notif-dot');
    if (dot) dot.style.display = 'none';
    if (isOpen && document.getElementById('chatbot-msgs').children.length === 0) {
      setTimeout(() => addMessage('🙏 Namaste! I\'m **Krishi**, your ShetiBook AI Assistant.\n\nHow can I help you today? Ask me about crop diseases, government schemes, vendors, or farming tips! 🌾', 'bot'), 400);
    }
  });

  document.getElementById('chatbot-close').addEventListener('click', () => {
    win.classList.remove('visible');
    toggleBtn.classList.remove('open');
  });

  document.getElementById('chatbot-clear').addEventListener('click', () => {
    document.getElementById('chatbot-msgs').innerHTML = '';
    document.getElementById('quick-replies-area').innerHTML = '';
    setTimeout(() => addMessage('Chat cleared! How can I help you? 🌾', 'bot'), 300);
  });

  document.getElementById('chatbot-send').addEventListener('click', () => sendMessage());

  document.getElementById('chatbot-input').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });

  document.getElementById('chatbot-voice').addEventListener('click', toggleChatVoice);
}

// ---- INIT ----
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', buildChatbotUI);
} else {
  buildChatbotUI();
}
