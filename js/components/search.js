

function initSearch() {
  const searchOverlay = document.getElementById('searchOverlay');
  if (!searchOverlay) {
    // If not in HTML yet, inject it
    const searchHTML = `
      <div class="search-overlay" id="searchOverlay">
        <div class="search-box">
          <input type="text" class="search-input" id="searchInput" placeholder="Search projects..." autocomplete="off" />
          <button class="search-close" id="searchClose">✕</button>
        </div>
        <div class="search-results" id="searchResults"></div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', searchHTML);
  }

  const overlay = document.getElementById('searchOverlay');
  const searchInput = document.getElementById('searchInput');
  const searchClose = document.getElementById('searchClose');
  const searchBtn = document.getElementById('searchBtn');

  // We read from window.SITE_DB.projects
  const PROJECTS = (window.SITE_DB && window.SITE_DB.projects) || {};
  const searchData = Object.entries(PROJECTS).map(([key, data]) => ({
    key,
    title: data.title,
    meta: (data.meta || []).map(m => m.label + ' ' + (m.value || '')).join(' '),
    fromPage: data.fromPage,
  }));

  searchBtn?.addEventListener('click', () => {
    overlay.classList.add('open');
    setTimeout(() => searchInput?.focus(), 100);
  });

  searchClose?.addEventListener('click', closeSearch);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
  });

  function closeSearch() {
    overlay.classList.remove('open');
    if (searchInput) searchInput.value = '';
    const results = document.getElementById('searchResults');
    if (results) results.innerHTML = '';
  }

  searchInput?.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    const results = document.getElementById('searchResults');
    if (!q) { results.innerHTML = ''; return; }

    const matches = searchData.filter(d =>
      d.title.toLowerCase().includes(q) || d.meta.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      results.innerHTML = '<p style="font-size:0.85rem;color:var(--text-muted);padding:12px 0;">No results found.</p>';
      return;
    }

    results.innerHTML = matches.map(m => `
      <div class="search-result-item" data-key="${m.key}"
        style="padding:14px 0;border-bottom:1px solid rgba(0,0,0,0.08);cursor:none;display:flex;justify-content:space-between;align-items:center;transition:opacity 0.2s;">
        <span style="font-family:var(--font-serif);font-size:1.1rem;color:var(--text-dark)">${m.title}</span>
        <svg style="width:14px;opacity:0.4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    `).join('');

    results.querySelectorAll('.search-result-item').forEach(el => {
      addCursorHover('.search-result-item', 'is-hovering');
      
      el.addEventListener('click', () => {
        closeSearch();
        window.location.href = `project.html?key=${el.dataset.key}`;
      });
    });
  });
}
