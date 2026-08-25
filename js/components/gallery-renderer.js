function initGalleryRenderer() {
  const container = document.getElementById('dynamic-gallery');
  if (!container || !window.SITE_DB) return;

  const galleryType = container.getAttribute('data-gallery-type');
  if (!galleryType) return;
  
  // 1. Get the data array for the current gallery type
  let items = [];
  if (galleryType === 'home' && window.SITE_DB.home) {
    items = window.SITE_DB.home.map(item => {
      const linkToProject = item.linkToProject || item.id;
      let title = item.title || linkToProject;
      let year = '';
      const proj = window.SITE_DB.projects && window.SITE_DB.projects[linkToProject] ? window.SITE_DB.projects[linkToProject] : null;
      
      if (proj) {
        if (proj.title) title = proj.title;
        if (proj.meta && Array.isArray(proj.meta)) {
          const yearMeta = proj.meta.find(m => m && m.label && typeof m.label === 'string' && m.label.toLowerCase().includes('year'));
          if (yearMeta) year = yearMeta.value;
        }
      }
      return {
        type: 'home',
        src: item.image || (proj ? proj.hero : ''),
        title: title,
        subtitle: year,
        linkToProject: linkToProject,
        bentoSize: item.bentoSize || (proj ? proj.bentoSize : null)
      };
    });
  } else if (galleryType === 'photography' && window.SITE_DB.photography) {
    items = window.SITE_DB.photography.map(itemData => {
      const isObj = typeof itemData === 'object' && itemData !== null;
      return {
        type: 'photography',
        src: isObj ? itemData.src : itemData,
        title: isObj && itemData.title ? itemData.title : 'View',
        subtitle: isObj && itemData.details ? itemData.details : '',
        bentoSize: isObj ? itemData.bentoSize : null
      };
    });
  } else if (window.SITE_DB.projects) {
    // Fallback standard logic for architecture, research, etc.
    items = Object.entries(window.SITE_DB.projects)
      .filter(([id, data]) => data.fromPage === galleryType)
      .map(([id, data]) => ({
        type: 'project',
        src: data.hero || '',
        title: data.title || id,
        subtitle: data.subtitle || '',
        linkToProject: id,
        bentoSize: data.bentoSize || null
      }));
  }

  if (items.length === 0) return;

  // 2. Setup Layout Controls
  let currentLayout = 'masonry'; // default fallback
  let hideControls = false;
  
  if (window.SITE_DB.settings) {
    // Check page-specific layout first
    if (window.SITE_DB.settings.pages && 
        window.SITE_DB.settings.pages[galleryType]) {
      
      if (window.SITE_DB.settings.pages[galleryType].galleryLayout) {
        currentLayout = window.SITE_DB.settings.pages[galleryType].galleryLayout;
      }
      
      if (window.SITE_DB.settings.pages[galleryType].hideLayoutControls !== undefined) {
        hideControls = window.SITE_DB.settings.pages[galleryType].hideLayoutControls;
      }
    } 
    // Fallback to global layout
    else {
      if (window.SITE_DB.settings.galleryLayout) {
        currentLayout = window.SITE_DB.settings.galleryLayout;
      }
      if (window.SITE_DB.settings.hideLayoutControls !== undefined) {
        hideControls = window.SITE_DB.settings.hideLayoutControls;
      }
    }
  }
  
  // Check if controls already exist (if re-rendering)
  let controlsDiv = document.querySelector('.gallery-controls');
  
  if (!hideControls) {
    if (!controlsDiv) {
      controlsDiv = document.createElement('div');
      controlsDiv.className = 'gallery-controls fade-in-up';
      controlsDiv.style.display = 'flex';
      controlsDiv.style.gap = '15px';
      controlsDiv.style.justifyContent = 'flex-end';
      controlsDiv.style.marginBottom = '30px';
      
      const layouts = ['masonry', 'bento', 'grid'];
      layouts.forEach(layout => {
        const btn = document.createElement('button');
        btn.className = `layout-btn ${currentLayout === layout ? 'active' : ''}`;
        btn.setAttribute('data-layout', layout);
        btn.innerText = layout.charAt(0).toUpperCase() + layout.slice(1);
        
        // Basic inline styles for the buttons
        btn.style.background = 'transparent';
        btn.style.border = 'none';
        btn.style.cursor = 'pointer';
        btn.style.fontFamily = 'var(--font-sans)';
        btn.style.fontSize = '0.75rem';
        btn.style.textTransform = 'uppercase';
        btn.style.letterSpacing = '0.1em';
        btn.style.color = currentLayout === layout ? 'var(--text-dark)' : 'var(--text-muted)';
        btn.style.borderBottom = currentLayout === layout ? '1px solid var(--text-dark)' : '1px solid transparent';
        btn.style.paddingBottom = '4px';
        btn.style.transition = 'all 0.3s ease';
        
        btn.addEventListener('click', () => {
          currentLayout = layout;
          renderGallery();
          
          // Update active states
          controlsDiv.querySelectorAll('.layout-btn').forEach(b => {
            if (b.getAttribute('data-layout') === layout) {
              b.classList.add('active');
              b.style.color = 'var(--text-dark)';
              b.style.borderBottom = '1px solid var(--text-dark)';
            } else {
              b.classList.remove('active');
              b.style.color = 'var(--text-muted)';
              b.style.borderBottom = '1px solid transparent';
            }
          });
        });
        controlsDiv.appendChild(btn);
      });
      container.parentNode.insertBefore(controlsDiv, container);
    }
  } else if (controlsDiv) {
    controlsDiv.style.display = 'none';
  }

  // 3. Render Function
  const bentoClasses = ['bento-1x1', 'bento-2x1', 'bento-1x2', 'bento-2x2'];
  
  function renderGallery() {
    let html = `<div class="gallery-container gallery-layout-${currentLayout}">`;
    
    items.forEach((item, idx) => {
      const delay = (idx % 5) * 0.1; // staggered delay
      
      // Determine Bento Size
      let bentoClass = '';
      if (currentLayout === 'bento') {
        if (item.bentoSize) {
          bentoClass = `bento-${item.bentoSize}`;
        } else {
          // Auto-assign random sizes if none specified, but favor 1x1 to keep it tight
          const randomVal = Math.random();
          if (randomVal > 0.85) bentoClass = 'bento-2x2';
          else if (randomVal > 0.70) bentoClass = 'bento-2x1';
          else if (randomVal > 0.55) bentoClass = 'bento-1x2';
          else bentoClass = 'bento-1x1';
        }
      }
      
      html += `
        <article class="gallery-item fade-in-up ${bentoClass}" data-delay="${delay}" ${item.type === 'project' ? `data-project="${item.linkToProject}"` : ''}>
          <div class="gallery-img-wrap">
            <img src="${item.src}" class="gallery-img" loading="lazy" alt="${item.title}" />
            ${item.type === 'project' ? `
              <div class="home-hover-overlay">
                <div class="hover-content">
                  <span class="hover-title">${item.title}</span>
                  ${item.subtitle ? `<span class="hover-year">${item.subtitle}</span>` : ''}
                </div>
              </div>
            ` : ''}
          </div>
          ${(item.type === 'home' || item.type === 'photography') ? `
            <div class="gallery-caption">
              <p class="caption-title">${item.title}</p>
              <p class="caption-sub">${item.subtitle}</p>
            </div>
          ` : ''}
        </article>
      `;
    });
    
    html += '</div>';
    container.innerHTML = html;

    // Reattach Event Listeners
    if (galleryType === 'photography') {
      const domItems = container.querySelectorAll('.gallery-item');
      domItems.forEach((domItem, index) => {
        domItem.addEventListener('click', () => {
          if (window.siteLightbox) {
            window.siteLightbox.images = items.map(i => i.src);
            window.siteLightbox.currentIndex = index;
            window.siteLightbox.updateUI();
            window.siteLightbox.isOpen = true;
            window.siteLightbox.overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
          }
        });
        domItem.style.cursor = 'pointer';
      });
    } else {
      // For projects/home, we need to re-trigger the main.js logic for project clicks
      // since the DOM elements are fresh.
      const domItems = container.querySelectorAll('.gallery-item[data-project]');
      domItems.forEach(item => {
        item.addEventListener('click', () => {
          const projectId = item.getAttribute('data-project');
          if (projectId) {
            sessionStorage.setItem('currentProject', projectId);
            window.location.href = 'project.html';
          }
        });
        item.style.cursor = 'pointer';
      });
    }

    // Crucial: Re-initialize scroll reveal for the new DOM elements so they fade in!
    if (typeof initScrollReveal === 'function') {
      // Small timeout to allow DOM to render before calculating intersections
      setTimeout(() => initScrollReveal(), 50);
    }
  }

  // Initial render
  renderGallery();
}
