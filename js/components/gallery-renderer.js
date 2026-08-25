function initGalleryRenderer() {
  const container = document.getElementById('dynamic-gallery');
  if (!container || !window.SITE_DB) return;

  const galleryType = container.getAttribute('data-gallery-type');
  if (!galleryType) return;
  
  if (galleryType === 'home' && window.SITE_DB.home) {
    // Render the home page with the custom lightbox interaction and white hover overlay
    const projectsToRender = window.SITE_DB.home;
    if (projectsToRender.length === 0) return;

    let html = '';
    for (let i = 0; i < projectsToRender.length; i += 3) {
      const chunk = projectsToRender.slice(i, i + 3);
      html += '<div class="gallery-row gallery-row-3">';
      chunk.forEach((data, idx) => {
        const delay = ((i + idx) % 3) * 0.1;
        const linkToProject = data.linkToProject || data.id;
        let title = data.title || linkToProject;
        let year = '';

        if (linkToProject && window.SITE_DB.projects && window.SITE_DB.projects[linkToProject]) {
          const proj = window.SITE_DB.projects[linkToProject];
          if (proj.title) title = proj.title;
          if (proj.meta && Array.isArray(proj.meta)) {
            const yearMeta = proj.meta.find(m => m && m.label && typeof m.label === 'string' && m.label.toLowerCase().includes('year'));
            if (yearMeta) year = yearMeta.value;
          }
        }

        html += `
          <article class="gallery-item fade-in-up" data-delay="${delay}">
            <div class="gallery-img-wrap">
              <img src="${data.image || (window.SITE_DB.projects[linkToProject] && window.SITE_DB.projects[linkToProject].hero) || ''}" class="gallery-img" loading="lazy" alt="${title}" />
              <div class="home-hover-overlay">
                <div class="hover-content">
                  <span class="hover-title">${title}</span>
                  ${year ? `<span class="hover-year">${year}</span>` : ''}
                </div>
              </div>
            </div>
          </article>
        `;
      });
      html += '</div>';
    }
    container.innerHTML = html;
    return;
  }

  if (galleryType === 'photography' && window.SITE_DB.photography) {
    const images = window.SITE_DB.photography;
    if (images.length === 0) return;

    let html = '';
    for (let i = 0; i < images.length; i += 3) {
      const chunk = images.slice(i, i + 3);
      html += '<div class="gallery-row gallery-row-3">';
      chunk.forEach((itemData, idx) => {
        const delay = ((i + idx) % 3) * 0.1;
        const isObj = typeof itemData === 'object' && itemData !== null;
        const src = isObj ? itemData.src : itemData;
        const title = isObj && itemData.title ? itemData.title : 'View';
        const details = isObj && itemData.details ? `<span class="hover-year">${itemData.details}</span>` : '';

        html += `
          <article class="gallery-item fade-in-up" data-delay="${delay}">
            <div class="gallery-img-wrap">
              <img src="${src}" class="gallery-img" loading="lazy" alt="${title}" />
              <div class="home-hover-overlay">
                <div class="hover-content">
                  <span class="hover-title">${title}</span>
                  ${details}
                </div>
              </div>
            </div>
          </article>
        `;
      });
      html += '</div>';
    }
    container.innerHTML = html;

    // Attach lightbox to photography items
    const items = container.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
      item.addEventListener('click', () => {
        if (window.siteLightbox) {
          // Pass only the src array to lightbox
          window.siteLightbox.images = images.map(img => typeof img === 'object' ? img.src : img);
          window.siteLightbox.currentIndex = index;
          window.siteLightbox.updateUI();
          
          window.siteLightbox.isOpen = true;
          window.siteLightbox.overlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
      item.style.cursor = 'pointer';
    });
    return;
  }

  // Fallback / standard logic for other galleries (architecture, research, etc.)
  // These use the normal navigation to project.html and old hover styles!
  let projectsToRender = [];
  if (window.SITE_DB.projects) {
    projectsToRender = Object.entries(window.SITE_DB.projects)
      .map(([id, data]) => ({ id, ...data }))
      .filter(p => p.fromPage === galleryType);
  }
  
  if (projectsToRender.length === 0) return;

  let html = '';
  for (let i = 0; i < projectsToRender.length; i += 3) {
    const chunk = projectsToRender.slice(i, i + 3);
    html += '<div class="gallery-row gallery-row-3">';
    chunk.forEach((data, idx) => {
      const delay = ((i + idx) % 3) * 0.1;
      const title = data.title || data.id;
      const subtitle = data.subtitle || '';
      
      html += `
        <article class="gallery-item fade-in-up" data-project="${data.id}" data-delay="${delay}">
          <div class="gallery-img-wrap">
            <img src="${data.hero || ''}" alt="${title}" class="gallery-img" loading="lazy" />
            <div class="gallery-hover-overlay">
              <span class="gallery-hover-label">View Project →</span>
            </div>
          </div>
          <div class="gallery-caption">
            <p class="caption-title">${title}</p>
            <p class="caption-sub">${subtitle}</p>
          </div>
        </article>
      `;
    });
    html += '</div>';
  }

  container.innerHTML = html;
}
