document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('schemes-list');

  async function loadSchemes() {
    try {
      const res = await fetch('/api/schemes');
      const schemes = await res.json();
      renderSchemes(schemes);
    } catch { if (container) container.innerHTML = '<p>Failed to load schemes</p>'; }
  }

  function renderSchemes(schemes) {
    if (!container) return;
    container.innerHTML = schemes.map(s => `
      <div class="card scheme-card">
        <h3>🏛️ ${getLocalizedField(s, 'name')}</h3>
        <div class="amount">${s.amount}</div>
        <p style="line-height:1.7">${getLocalizedField(s, 'description')}</p>
        <p class="eligibility"><strong>📋 ${t('eligibility')}:</strong> ${getLocalizedField(s, 'eligibility')}</p>
        <p style="margin:.5rem 0;font-size:.9rem"><strong>📝 ${t('how_to_apply')}:</strong> ${getLocalizedField(s, 'how_to_apply')}</p>
        <a href="${s.official_link}" target="_blank" class="btn btn-outline btn-sm" style="margin-top:.8rem">🔗 ${t('visit_portal')}</a>
      </div>
    `).join('');
  }

  window.onLanguageChange = () => loadSchemes();
  loadSchemes();
});
