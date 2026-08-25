class Lightbox {
  constructor() {
    this.images = [];
    this.currentIndex = 0;
    this.isOpen = false;
    this.initDOM();
    this.bindEvents();
  }

  initDOM() {
    if (document.getElementById('site-lightbox')) return;

    const html = `
      <div id="site-lightbox" class="lightbox-overlay">
        <div class="lightbox-top-bar">
          <div id="lightbox-counter" class="lightbox-counter">1 / 1</div>
          <button id="lightbox-close" class="lightbox-close" aria-label="Close gallery">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="32" height="32"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="lightbox-content">
          <img id="lightbox-img" src="" alt="Project Image">
        </div>
        <button id="lightbox-prev" class="lightbox-nav lightbox-prev" aria-label="Previous image">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button id="lightbox-next" class="lightbox-nav lightbox-next" aria-label="Next image">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', html);
    
    this.overlay = document.getElementById('site-lightbox');
    this.img = document.getElementById('lightbox-img');
    this.prevBtn = document.getElementById('lightbox-prev');
    this.nextBtn = document.getElementById('lightbox-next');
    this.closeBtn = document.getElementById('lightbox-close');
    this.counter = document.getElementById('lightbox-counter');
  }

  bindEvents() {
    this.closeBtn.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });
    this.prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.prev();
    });
    this.nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.next();
    });

    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
    
    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    this.overlay.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    this.overlay.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, {passive: true});
  }
  
  handleSwipe(startX, endX) {
    if (startX - endX > 50) this.next();
    if (endX - startX > 50) this.prev();
  }

  open(projectId) {
    if (!window.SITE_DB || !window.SITE_DB.projects || !window.SITE_DB.projects[projectId]) {
      console.warn('Project data not found for lightbox:', projectId);
      return;
    }

    const project = window.SITE_DB.projects[projectId];
    
    // Flatten all images from the gallery arrays
    this.images = [];
    if (project.gallery) {
      project.gallery.forEach(row => {
        if (row.images) {
          this.images.push(...row.images);
        }
      });
    }

    if (this.images.length === 0) return;

    this.currentIndex = 0;
    this.updateUI();
    
    this.isOpen = true;
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  close() {
    this.isOpen = false;
    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Small delay before clearing src to prevent visual flash during fade out
    setTimeout(() => {
      if (!this.isOpen) this.img.src = '';
    }, 300);
  }

  next() {
    if (this.images.length <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateUI();
  }

  prev() {
    if (this.images.length <= 1) return;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateUI();
  }

  updateUI() {
    this.img.src = this.images[this.currentIndex];
    this.counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    
    if (this.images.length <= 1) {
      this.prevBtn.style.display = 'none';
      this.nextBtn.style.display = 'none';
    } else {
      this.prevBtn.style.display = 'flex';
      this.nextBtn.style.display = 'flex';
    }
  }
}

// Initialize globally
document.addEventListener('DOMContentLoaded', () => {
  window.siteLightbox = new Lightbox();
});
