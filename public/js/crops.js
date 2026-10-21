document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('crops-grid');
  const searchInput = document.getElementById('crop-search');
  let allCrops = [];
  let activeCategory = 'all';

  async function loadCrops() {
    try {
      const res = await fetch('/api/crops');
      allCrops = await res.json();
      renderCrops(allCrops);
    } catch { if (grid) grid.innerHTML = '<p>Failed to load crops</p>'; }
  }

  function renderCrops(crops) {
    if (!grid) return;
    if (!crops.length) { grid.innerHTML = '<p style="text-align:center;color:var(--text-muted)">No crops found</p>'; return; }
    grid.innerHTML = crops.map(c => `
      <div class="card crop-card" onclick="window.location.href='/crop-detail.html?id=${c.id}'">
        <div class="crop-img">${getCropEmoji(c.name)}</div>
        <div class="crop-card-content">
          <span class="category-tag">${c.category}</span>
          <h3>${getLocalizedField(c, 'name')}</h3>
          <p>${getLocalizedField(c, 'description').substring(0, 100)}...</p>
          <p style="margin-top:1rem;font-size:0.9rem;color:var(--accent);font-weight:700">🌤 ${c.season}</p>
        </div>
      </div>
    `).join('');
  }

  function filterCrops() {
    let filtered = allCrops;
    if (activeCategory !== 'all') filtered = filtered.filter(c => c.category.toLowerCase().replace(/\s/g, '') === activeCategory);
    const q = searchInput ? searchInput.value.toLowerCase() : '';
    if (q) filtered = filtered.filter(c => c.name.toLowerCase().includes(q) || (c.name_hi && c.name_hi.includes(q)) || (c.name_mr && c.name_mr.includes(q)));
    renderCrops(filtered);
  }

  document.querySelectorAll('.crop-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.crop-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.category;
      filterCrops();
    });
  });

  if (searchInput) searchInput.addEventListener('input', filterCrops);
  window.onLanguageChange = () => renderCrops(allCrops);
  loadCrops();
});
