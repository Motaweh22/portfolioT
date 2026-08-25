document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const key = params.get('key');
  
  const db = (window.SITE_DB && window.SITE_DB.projects) ? window.SITE_DB.projects : null;

  if (!key || !db || !db[key]) {
    // If no valid project key, redirect home
    window.location.href = 'index.html';
    return;
  }

  const data = db[key];

  const heroContainer = document.getElementById('projectHero');
  const gallery = document.getElementById('projectGallery');
  const prevBtn = document.getElementById('prevProjectBtn');
  const nextBtn = document.getElementById('nextProjectBtn');
  
  // Back logic for nav buttons - now actually cycles through projects
  const targetPage = data.fromPage === 'home' ? 'index.html' : `${data.fromPage}.html`;
  
  const projectKeys = Object.keys(db);
  const currentIndex = projectKeys.indexOf(key);
  
  if (currentIndex !== -1) {
    const prevKey = projectKeys[(currentIndex - 1 + projectKeys.length) % projectKeys.length];
    const nextKey = projectKeys[(currentIndex + 1) % projectKeys.length];
    
    if (prevBtn) prevBtn.href = `project.html?key=${prevKey}`;
    if (nextBtn) nextBtn.href = `project.html?key=${nextKey}`;
  }

  // Render Hero and Info
  if (heroContainer) {
    const metaHTML = data.meta.map(m =>
      m.value
        ? `<p class="project-meta-row">${m.label} <strong>${m.value}</strong></p>`
        : `<p class="project-meta-row">${m.label}</p>`
    ).join('');

    const descHTML = data.description.map(p => `<p>${p}</p>`).join('');

    heroContainer.innerHTML = `
      <div class="project-detail-img-col">
        <img src="${data.hero}" alt="${data.title}" class="project-detail-hero-img" id="projectDetailHeroImg" />
      </div>
      <div class="project-detail-info-col">
        <h1 class="project-detail-title" id="projectDetailTitle">${data.title}</h1>
        <div class="project-detail-meta" id="projectDetailMeta">
          ${metaHTML}
        </div>
        <div class="project-detail-desc" id="projectDetailDesc">
          ${descHTML}
        </div>
        <a href="${targetPage}" class="project-back-btn" id="projectBackBtn">
          <span class="nav-arrow">←</span> Back to Overview
        </a>
      </div>
    `;
  }

  // Gallery
  if (gallery) {
    gallery.innerHTML = data.gallery.map(row => `
      <div class="project-gallery-row cols-${row.cols} fade-in-up">
        ${row.images.map(src => `
          <div class="project-gallery-img-wrap">
            <img src="${src}" alt="" class="project-gallery-img" loading="lazy" />
          </div>
        `).join('')}
      </div>
    `).join('');
  }

  // Observe newly injected fade-in-up items
  if (typeof initScrollReveal === 'function') {
    initScrollReveal();
  }
});
