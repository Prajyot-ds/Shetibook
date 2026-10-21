// ============================================================
// VENDOR DATA
// ============================================================
const vendorData = [
  {
    id: 1, name: 'Mahindra Agri Solutions', category: 'equipment',
    logo: '🚜', location: 'Mumbai, Maharashtra',
    desc: 'Leading provider of tractors, farm machinery, and precision agriculture equipment for Indian farmers.',
    products: ['Tractors', 'Tillers', 'Harvesters', 'Sprayers', 'Irrigation Pumps'],
    phone: '+91 1800-209-6006', email: 'agri@mahindra.com',
    website: 'https://www.mahindraagri.com', address: 'Gateway Building, Mahindra Tower, Mumbai - 400021',
    verified: true, state: 'Maharashtra'
  },
  {
    id: 2, name: 'Bayer CropScience India', category: 'pesticides',
    logo: '🛡️', location: 'Thane, Maharashtra',
    desc: 'Global leader in crop protection providing innovative pesticides, herbicides and fungicides.',
    products: ['Herbicides', 'Fungicides', 'Insecticides', 'Seed Treatment', 'Bio-pesticides'],
    phone: '+91 22-2530-9100', email: 'cropscience.india@bayer.com',
    website: 'https://www.bayer.com/en/agriculture', address: 'Bayer House, Central Avenue, Hiranandani Estate, Thane - 400607',
    verified: true, state: 'Maharashtra'
  },
  {
    id: 3, name: 'Kaveri Seed Company', category: 'seeds',
    logo: '🌱', location: 'Secunderabad, Telangana',
    desc: 'Premium hybrid seeds for cotton, maize, rice, sunflower, and other major crops since 1976.',
    products: ['Hybrid Cotton Seeds', 'Maize Seeds', 'Rice Seeds', 'Sunflower Seeds', 'Vegetable Seeds'],
    phone: '+91 40-2780-2561', email: 'info@kaveriseeds.in',
    website: 'https://www.kaveriseeds.in', address: '513-B, Lingampally, Secunderabad - 500055',
    verified: true, state: 'Telangana'
  },
  {
    id: 4, name: 'Coromandel International', category: 'fertilizers',
    logo: '🧪', location: 'Hyderabad, Telangana',
    desc: 'One of India\'s largest agri-solutions companies providing fertilizers, specialty nutrients and crop protection.',
    products: ['NPK Fertilizers', 'DAP', 'Urea', 'Micronutrients', 'Bio-fertilizers'],
    phone: '+91 40-2784-2034', email: 'info@coromandel.com',
    website: 'https://www.coromandel.com', address: 'Coromandel House, Sardar Patel Road, Secunderabad - 500003',
    verified: true, state: 'Telangana'
  },
  {
    id: 5, name: 'Punjab Agro Industries', category: 'equipment',
    logo: '⚙️', location: 'Ludhiana, Punjab',
    desc: 'Government-backed corporation supplying quality farm equipment, seeds, and agri-inputs to Punjab farmers.',
    products: ['Tractors', 'Combine Harvesters', 'Laser Levellers', 'Happy Seeders', 'Rotavators'],
    phone: '+91 161-274-6000', email: 'info@punjabagro.gov.in',
    website: 'http://www.punjabagro.gov.in', address: 'Sector 64A, Phase VIII, SAS Nagar, Mohali - 160062',
    verified: true, state: 'Punjab'
  },
  {
    id: 6, name: 'Tata Rallis India', category: 'pesticides',
    logo: '🌿', location: 'Mumbai, Maharashtra',
    desc: 'Tata group company providing innovative crop protection products and specialty chemicals for farmers.',
    products: ['Insecticides', 'Fungicides', 'Herbicides', 'PGR', 'Specialty Chemicals'],
    phone: '+91 22-6665-2700', email: 'customer.care@rallis.co.in',
    website: 'https://www.rallis.co.in', address: '23rd Floor, One India Bulls Centre, Mumbai - 400013',
    verified: true, state: 'Maharashtra'
  },
  {
    id: 7, name: 'Syngenta India Limited', category: 'seeds',
    logo: '🌻', location: 'Pune, Maharashtra',
    desc: 'Global agri-tech company with premium seeds, crop protection and digital farming solutions.',
    products: ['Vegetable Seeds', 'Field Crop Seeds', 'Corn Seeds', 'Fungicides', 'Digital Tools'],
    phone: '+91 20-6632-5000', email: 'customer.service@syngenta.com',
    website: 'https://www.syngenta.co.in', address: 'Syngenta India, Magarpatta City, Pune - 411013',
    verified: true, state: 'Maharashtra'
  },
  {
    id: 8, name: 'Iffco Tokio General Insurance', category: 'fertilizers',
    logo: '💛', location: 'New Delhi',
    desc: 'IFFCO - India\'s largest cooperative providing fertilizers, agri services, and farmer support across India.',
    products: ['Urea', 'DAP', 'NPK', 'Nano Urea', 'Bio-fertilizers', 'Crop Insurance'],
    phone: '+91 11-2659-5000', email: 'info@iffco.in',
    website: 'https://www.iffco.in', address: 'IFFCO Sadan, C-1, District Centre, Saket, New Delhi - 110017',
    verified: true, state: 'Delhi'
  },
  {
    id: 9, name: 'Organic India Pvt Ltd', category: 'organic',
    logo: '🍃', location: 'Lucknow, Uttar Pradesh',
    desc: 'Pioneer in organic farming products, bio-fertilizers, and sustainable agricultural inputs.',
    products: ['Organic Fertilizers', 'Bio-Pesticides', 'Vermicompost', 'Neem Products', 'Organic Seeds'],
    phone: '+91 522-273-4000', email: 'info@organicindia.com',
    website: 'https://www.organicindia.com', address: 'Organic India Campus, Village Bhatauli Kalan, Barabanki, UP',
    verified: true, state: 'Uttar Pradesh'
  },
  {
    id: 10, name: 'Jain Irrigation Systems', category: 'equipment',
    logo: '💧', location: 'Jalgaon, Maharashtra',
    desc: 'World\'s second largest drip irrigation company providing smart irrigation and precision farming solutions.',
    products: ['Drip Irrigation', 'Sprinkler Systems', 'Micro Irrigation', 'Poly Houses', 'Solar Pumps'],
    phone: '+91 257-225-8011', email: 'info@jains.com',
    website: 'https://www.jains.com', address: 'Jain Plastic Park, NH-6, Bambhori, Jalgaon - 425001',
    verified: true, state: 'Maharashtra'
  },
  {
    id: 11, name: 'National Seeds Corporation', category: 'seeds',
    logo: '🏛️', location: 'New Delhi',
    desc: 'Government of India enterprise providing quality certified seeds of food crops to farmers at fair prices.',
    products: ['Wheat Seeds', 'Rice Seeds', 'Pulses Seeds', 'Oilseeds', 'Vegetable Seeds'],
    phone: '+91 11-2696-3813', email: 'nsc@nsc.gov.in',
    website: 'https://www.indiaseeds.com', address: 'Beej Bhawan, Pusa Complex, New Delhi - 110012',
    verified: true, state: 'Delhi'
  },
  {
    id: 12, name: 'SOM Phytopharma India', category: 'organic',
    logo: '🌾', location: 'Nagpur, Maharashtra',
    desc: 'Specializing in natural and organic crop protection solutions and bio-stimulants for sustainable agriculture.',
    products: ['Neem Oil', 'Bio-fungicides', 'Botanical Extracts', 'Soil Amendments', 'Pheromone Traps'],
    phone: '+91 712-272-1200', email: 'info@somphytopharma.com',
    website: 'https://www.somphytopharma.com', address: 'Plot No 12, MIDC Butibori, Nagpur - 441108',
    verified: false, state: 'Maharashtra'
  }
];

// ============================================================
// RENDER VENDORS
// ============================================================
function getCategoryColor(cat) {
  const map = { seeds: 'badge-seeds', fertilizers: 'badge-fertilizers', pesticides: 'badge-pesticides', equipment: 'badge-equipment', organic: 'badge-organic' };
  return map[cat] || 'badge-seeds';
}
function getCategoryLabel(cat) {
  const map = { seeds: '🌱 Seeds', fertilizers: '🧪 Fertilizer', pesticides: '🛡️ Pesticide', equipment: '🚜 Equipment', organic: '🍃 Organic' };
  return map[cat] || cat;
}

function renderVendors(list) {
  const grid = document.getElementById('vendorGrid');
  const noVendors = document.getElementById('noVendors');
  if (!list.length) { grid.innerHTML = ''; noVendors.style.display = 'block'; return; }
  noVendors.style.display = 'none';
  grid.innerHTML = list.map(v => `
    <div class="vendor-card" data-id="${v.id}">
      <div class="vendor-card-header">
        <div class="vendor-logo" style="background:linear-gradient(135deg,rgba(45,106,79,.3),rgba(64,145,108,.2))">${v.logo}</div>
        <div class="vendor-info" style="flex:1">
          <h3>${v.name}</h3>
          <div class="vendor-location">📍 ${v.location}
            ${v.verified ? '<span class="verified-badge" style="margin-left:8px">✓ Verified</span>' : ''}
          </div>
        </div>
        <span class="vendor-category-badge ${getCategoryColor(v.category)}">${getCategoryLabel(v.category)}</span>
      </div>
      <p class="vendor-desc">${v.desc}</p>
      <div class="vendor-products">
        ${v.products.slice(0,4).map(p => `<span class="product-tag">${p}</span>`).join('')}
        ${v.products.length > 4 ? `<span class="product-tag">+${v.products.length-4} more</span>` : ''}
      </div>
      <div class="vendor-contacts">
        <div class="vendor-contact-item contact-phone">
          <div class="contact-icon">📞</div>
          <a href="tel:${v.phone.replace(/\s/g,'')}">${v.phone}</a>
        </div>
        <div class="vendor-contact-item contact-email">
          <div class="contact-icon">✉️</div>
          <a href="mailto:${v.email}">${v.email}</a>
        </div>
        <div class="vendor-contact-item contact-address">
          <div class="contact-icon">🏢</div>
          <span>${v.address}</span>
        </div>
      </div>
      <div class="vendor-actions">
        <a href="tel:${v.phone.replace(/\s/g,'')}" class="btn btn-primary">📞 Call Now</a>
        <a href="${v.website}" target="_blank" rel="noopener" class="btn btn-outline">🌐 Website</a>
      </div>
    </div>
  `).join('');
}

// ============================================================
// FILTER LOGIC
// ============================================================
let activeCategory = 'all';
let searchQuery = '';
let stateFilter = '';

function applyFilters() {
  let list = vendorData;
  if (activeCategory !== 'all') list = list.filter(v => v.category === activeCategory);
  if (stateFilter) list = list.filter(v => v.state === stateFilter);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(v =>
      v.name.toLowerCase().includes(q) ||
      v.desc.toLowerCase().includes(q) ||
      v.products.some(p => p.toLowerCase().includes(q)) ||
      v.location.toLowerCase().includes(q)
    );
  }
  renderVendors(list);
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  renderVendors(vendorData);

  // Tab clicks
  document.querySelectorAll('.vendor-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.vendor-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.cat;
      applyFilters();
    });
  });

  // Search
  const searchInput = document.getElementById('vendorSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.trim();
      applyFilters();
    });
  }

  // State filter
  const stateSelect = document.getElementById('stateFilter');
  if (stateSelect) {
    stateSelect.addEventListener('change', () => {
      stateFilter = stateSelect.value;
      applyFilters();
    });
  }
});
