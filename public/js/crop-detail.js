document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const cropId = params.get('id');
  if (!cropId) { window.location.href = '/crops.html'; return; }

  async function loadCropDetail() {
    try {
      const res = await fetch(`/api/crops/${cropId}`);
      if (!res.ok) { window.location.href = '/crops.html'; return; }
      const crop = await res.json();
      renderDetail(crop);
    } catch { document.getElementById('crop-detail').innerHTML = '<p>Failed to load</p>'; }
  }

  function renderDetail(crop) {
    const container = document.getElementById('crop-detail');
    if (!container) return;
    const n = getLocalizedField(crop, 'name');
    const desc = getLocalizedField(crop, 'description');
    document.title = `${n} - ShetiBook`;
    container.innerHTML = `
      <div class="crop-detail-header">
        <div class="crop-detail-img">${getCropEmoji(crop.name)}</div>
        <div style="flex:1">
          <h1 style="font-size:2rem;margin-bottom:.5rem">${n}</h1>
          <span class="category-tag" style="font-size:.85rem">${crop.category}</span>
          <p style="margin-top:1rem;line-height:1.7;color:var(--text-muted)">${desc}</p>
        </div>
      </div>
      <table class="crop-info-table card">
        <tr><td>🌤 ${t('season')}</td><td>${crop.season}</td></tr>
        <tr><td>🏔 ${t('soil_type')}</td><td>${crop.soil_type}</td></tr>
        <tr><td>💧 ${t('water_needs')}</td><td>${crop.water_needs}</td></tr>
      </table>
      <h2 style="margin:2rem 0 1rem">🦠 ${t('common_diseases')}</h2>
      <div class="disease-list">${crop.diseases && crop.diseases.length ? crop.diseases.map(d => `
        <div class="card disease-item" style="margin-bottom:1rem;border-left:4px solid var(--danger)">
          <h4><span class="badge">Disease</span> ${getLocalizedField(d, 'name')}</h4>
          <p><strong>${t('symptoms')}:</strong> ${getLocalizedField(d, 'symptoms')}</p>
          <p><strong>${t('cause')}:</strong> ${getLocalizedField(d, 'cause')}</p>
          <p style="color:var(--success)"><strong>✅ ${t('solution')}:</strong> ${getLocalizedField(d, 'solution')}</p>
        </div>
      `).join('') : '<p>No diseases recorded</p>'}</div>
    `;
  }

  window.onLanguageChange = () => loadCropDetail();
  loadCropDetail();
});
