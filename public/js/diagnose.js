document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('diagnose-form');
  const fileInput = document.getElementById('crop-image');
  const preview = document.getElementById('image-preview');
  const resultsDiv = document.getElementById('diagnosis-results');
  const symptomsInput = document.getElementById('symptoms-input');
  const voiceBtn = document.getElementById('voice-btn');

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => { preview.innerHTML = `<img src="${ev.target.result}" alt="Preview">`; preview.style.display = 'block'; };
        reader.readAsDataURL(file);
      }
    });
  }

  // Drag and drop
  const dropArea = document.querySelector('.diagnose-area');
  if (dropArea) {
    ['dragenter','dragover'].forEach(e => dropArea.addEventListener(e, (ev) => { ev.preventDefault(); dropArea.classList.add('dragover'); }));
    ['dragleave','drop'].forEach(e => dropArea.addEventListener(e, () => dropArea.classList.remove('dragover')));
    dropArea.addEventListener('drop', (e) => {
      e.preventDefault();
      if (e.dataTransfer.files.length) { fileInput.files = e.dataTransfer.files; fileInput.dispatchEvent(new Event('change')); }
    });
  }

  if (voiceBtn) voiceBtn.addEventListener('click', () => toggleVoice(symptomsInput));

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!requireLogin()) return;
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; btn.innerHTML = `<div class="spinner" style="width:20px;height:20px;margin:0"></div> ${t('analyzing')}`;
      const formData = new FormData();
      formData.append('description', symptomsInput.value);
      if (fileInput.files[0]) formData.append('image', fileInput.files[0]);
      try {
        const res = await fetch('/api/crops/diagnose', { method: 'POST', body: formData });
        const data = await res.json();
        if (res.ok) renderResults(data.matches);
        else showToast(data.error || 'Diagnosis failed', 'error');
      } catch { showToast('Network error', 'error'); }
      btn.disabled = false; btn.innerHTML = `🔬 ${t('analyze_btn')}`;
    });
  }

  function renderResults(matches) {
    if (!matches || !matches.length) {
      resultsDiv.innerHTML = `<div class="card result-card"><p>${t('no_results')}</p></div>`;
      return;
    }
    const lang = getLangSuffix();
    resultsDiv.innerHTML = `<h3 style="margin-bottom:1rem">🔬 ${t('results')}</h3>` + matches.map(m => `
      <div class="card result-card" style="margin-bottom:1rem">
        <h4>🦠 ${m['name' + lang] || m.name}</h4>
        <p><strong>${t('symptoms')}:</strong> ${m['symptoms' + lang] || m.symptoms}</p>
        <p><strong>${t('cause')}:</strong> ${m['cause' + lang] || m.cause}</p>
        <p style="color:var(--success)"><strong>✅ ${t('solution')}:</strong> ${m['solution' + lang] || m.solution}</p>
        <p style="margin-top:.5rem;font-size:.8rem;color:var(--text-muted)">Crop: ${m['crop_name' + lang] || m.crop_name}</p>
      </div>
    `).join('');
  }

  // Update voice lang on language change
  window.onLanguageChange = () => { if (recognition) { recognition.lang = { en:'en-IN', hi:'hi-IN', mr:'mr-IN' }[getLang()]; } };
});
