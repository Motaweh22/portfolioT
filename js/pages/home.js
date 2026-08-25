document.addEventListener('DOMContentLoaded', () => {
  /* ========================================
     HERO NAME LETTER ANIMATION
  ======================================== */
  const heroName = document.getElementById('heroName');
  if (heroName) {
    if (window.SITE_DB && window.SITE_DB.settings && window.SITE_DB.settings.name) {
      heroName.textContent = window.SITE_DB.settings.name;
    }
    const text = heroName.textContent;
    const letterStyle = document.createElement('style');
    letterStyle.textContent = `
      @keyframes letterDrop {
        from { opacity: 0; transform: translateY(-16px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(letterStyle);

    heroName.innerHTML = text.split('').map((char, i) => {
      if (char === ' ') return '<span style="display:inline-block;width:0.3em"> </span>';
      return `<span style="display:inline-block;animation:letterDrop 0.45s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.035}s both">${char}</span>`;
    }).join('');
  }

  /* ========================================
     HERO BACKGROUND SLIDER (Nuvelti style)
  ======================================== */
  const heroSlider = document.getElementById('heroSlider');
  if (heroSlider && window.SITE_DB && window.SITE_DB.homeData && window.SITE_DB.homeData.sliderImages) {
    const images = window.SITE_DB.homeData.sliderImages.slice(0, 5);
    
    if (images.length > 0) {
      heroSlider.innerHTML = images.map((src, idx) => 
        `<img src="${src}" class="hero-slider-img ${idx === 0 ? 'active' : ''}" loading="lazy" />`
      ).join('');

      const sliderImgs = heroSlider.querySelectorAll('.hero-slider-img');
      let currentIdx = 0;

      if (sliderImgs.length > 1) {
        setInterval(() => {
          sliderImgs[currentIdx].classList.remove('active');
          currentIdx = (currentIdx + 1) % sliderImgs.length;
          sliderImgs[currentIdx].classList.add('active');
        }, 4000); 
      }
    }
  }

  /* ========================================
     SCROLL ARROW BEHAVIOR (Cinematic Smooth Scroll)
  ======================================== */
  const scrollArrow = document.querySelector('.hero-scroll-arrow');
  const targetSection = document.getElementById('dynamic-gallery-section');
  if (scrollArrow && targetSection) {
    scrollArrow.addEventListener('click', (e) => {
      e.preventDefault(); 
      
      const headerOffset = 52; 
      const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      
      const duration = 1200; // 1.2 seconds for a premium cinematic feel
      let start = null;

      // Easing function: easeInOutQuart
      function easeInOutQuart(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
      }

      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutQuart(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }

      // Hide the arrow immediately upon click to match Nuvelti
      scrollArrow.style.transition = 'opacity 0.3s ease';
      scrollArrow.style.opacity = '0';
      
      requestAnimationFrame(animation);
      
      // Bring the arrow back if they scroll back up later
      setTimeout(() => {
        scrollArrow.style.opacity = '1';
      }, duration + 100);
    });
  }
});
