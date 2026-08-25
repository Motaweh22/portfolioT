function initNav() {
  const navContainer = document.getElementById('header-mount');
  if (!navContainer) return;

  const siteName = (window.SITE_DB && window.SITE_DB.settings && window.SITE_DB.settings.name) ? window.SITE_DB.settings.name : 'Mohamed Ayman';

  const navHTML = `
  <header class="site-header">
    <a href="index.html" class="site-logo" id="siteLogo">${siteName}</a>
    <nav class="site-nav">
      <a href="index.html" class="nav-link">Home</a>
      <a href="architecture.html" class="nav-link">Architecture</a>
      <a href="photography.html" class="nav-link">Photography</a>
      <a href="about.html" class="nav-link">About</a>
    </nav>
    <button class="hamburger" id="hamburger" aria-label="Toggle Menu">
      <span></span><span></span><span></span>
    </button>
  </header>
  <div class="mobile-nav-overlay" id="mobileNavOverlay">
    <nav class="mobile-nav-links">
      <a href="index.html" class="mobile-nav-link">Home</a>
      <a href="architecture.html" class="mobile-nav-link">Architecture</a>
      <a href="photography.html" class="mobile-nav-link">Photography</a>
      <a href="about.html" class="mobile-nav-link">About</a>
    </nav>
  </div>
  `;

  navContainer.innerHTML = navHTML;

  // Set Active Navigation State automatically based on URL
  const currentPath = window.location.pathname;
  let currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  if (!currentFile || currentFile === '') currentFile = 'index.html'; // default for root

  const navLinks = navContainer.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    // If the href matches the current file, or if it's the root and href is index.html
    if (linkHref === currentFile) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  const toggle = document.getElementById('hamburger');
  const overlay = document.getElementById('mobileNavOverlay');
  
  if (toggle && overlay) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      overlay.classList.toggle('open');
    });
  }

  // Footer creation
  const footerContainer = document.getElementById('footer-mount');
  if (footerContainer) {
    footerContainer.classList.add('site-footer');
    
    // Default fallback values in case settings is missing
    let copyright = `© ${new Date().getFullYear()} Mohamed Ayman. All rights reserved.`;
    let socialsHTML = `
      <a href="#" class="footer-link">@mohamedaymen</a>
      <a href="#" class="footer-link">LinkedIn</a>
      <a href="#" class="footer-link">Behance</a>
    `;

    // Attempt to load from JSON database
    if (window.SITE_DB && window.SITE_DB.settings) {
      if (window.SITE_DB.settings.copyright) {
        copyright = `© ${new Date().getFullYear()} ${window.SITE_DB.settings.copyright}. All rights reserved.`;
      }
      if (window.SITE_DB.settings.socials && window.SITE_DB.settings.socials.length > 0) {
        socialsHTML = window.SITE_DB.settings.socials.map(s => 
          `<a href="${s.url}" class="footer-link" target="_blank">${s.platform}</a>`
        ).join('');
      }
    }

    footerContainer.innerHTML = `
      <div class="footer-copy">${copyright}</div>
      <div class="footer-socials">
        ${socialsHTML}
      </div>
    `;
  }
}
