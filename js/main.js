document.addEventListener('DOMContentLoaded', () => {
  // Clean URL: Hide .html extension in the browser URL bar
  if (window.location.pathname.endsWith('.html') && window.location.protocol !== 'file:') {
    try {
      let newPath = window.location.pathname.replace(/\.html$/, '');
      if (newPath.endsWith('/index')) {
        newPath = newPath.replace(/\/index$/, '/');
      }
      window.history.replaceState(null, '', newPath + window.location.search);
    } catch(e) {
      console.warn("URL rewrite not supported in this environment");
    }
  }

  applyBackgroundTheme();
  
  // 1. Initialize Shared Components
  initNav();
  initSearch();
  if (typeof initGalleryRenderer === 'function') initGalleryRenderer();
  if (typeof wireGalleryItems === 'function') wireGalleryItems();
  initScrollReveal();

  // 2. Page Transition Reveal
  const pageTransition = document.getElementById('pageTransition');
  if (pageTransition) {
    requestAnimationFrame(() => {
      setTimeout(() => pageTransition.classList.add('reveal'), 50);
    });
  }
});

// Generic Gallery Wiring (used on Home, Architecture, Research)
function wireGalleryItems(dataMap = null) {
  const cursor = document.getElementById('cursor');

  // If a dataMap is provided, set the data-project attribute on elements with matching IDs
  if (dataMap) {
    Object.entries(dataMap).forEach(([id, projectKey]) => {
      const el = document.getElementById(id);
      if (el) el.dataset.project = projectKey;
    });
  }

  document.querySelectorAll('.gallery-item').forEach(item => {
    // Navigation on click
    const projectKey = item.dataset.project;
    if (projectKey) {
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        window.location.href = `project.html?key=${projectKey}`;
      });
    }
  });
}

function applyBackgroundTheme() {
  if (!window.SITE_DB || !window.SITE_DB.settings || !window.SITE_DB.settings.pages) return;
  
  const pageId = document.body.getAttribute('data-active-page');
  let theme = "white"; // Default fallback
  
  // Apply general page setting if defined
  if (pageId && window.SITE_DB.settings.pages[pageId] && window.SITE_DB.settings.pages[pageId].background) {
    theme = window.SITE_DB.settings.pages[pageId].background;
  }
  
  // Override for individual projects
  if (pageId === 'project') {
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('key');
    if (key && window.SITE_DB.projects && window.SITE_DB.projects[key]) {
      const projBg = window.SITE_DB.projects[key].background;
      if (projBg === "black" || projBg === "white") {
        theme = projBg;
      }
    }
  }
  
  // Apply theme to the body
  document.body.setAttribute('data-theme', theme);
}
