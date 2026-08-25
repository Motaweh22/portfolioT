document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('dynamic-about');
  if (!container || !window.SITE_DB || !window.SITE_DB.about) return;

  const data = window.SITE_DB.about;
  
  const paragraphsHTML = (data.paragraphs || []).map(p => 
    `<p class="about-body">${p}</p>`
  ).join('');

  // Education list
  const educationHTML = (data.education || []).map(item => `
    <div class="cv-item">
      <div class="cv-date">${item.date}</div>
      <div class="cv-content">
        <div class="cv-title">${item.title}</div>
      </div>
    </div>
  `).join('');

  // Experience list
  const experienceHTML = (data.experience || []).map(item => `
    <div class="cv-item">
      <div class="cv-date">${item.date}</div>
      <div class="cv-content">
        <div class="cv-title">${item.title}</div>
        ${(item.bullets || []).map(b => `<div class="cv-bullet">- ${b}</div>`).join('')}
      </div>
    </div>
  `).join('');

  // Competitions list
  const competitionsHTML = (data.competitions || []).map(item => `
    <div class="cv-item cv-item-compact">
      <div class="cv-date">${item.date}</div>
      <div class="cv-content">
        <div class="cv-title">${item.title}</div>
      </div>
    </div>
  `).join('');

  const html = `
    <div class="about-cv-wrapper">
      
      <!-- Left Column -->
      <div class="about-left-col">
        <img src="${data.image}" alt="${data.name}" class="about-portrait" />
        <h3 class="about-left-subtitle">${data.leftColSubtitle || ''}</h3>
        <div class="about-paragraphs">
          ${paragraphsHTML}
        </div>
      </div>

      <!-- Right Column -->
      <div class="about-right-col">
        
        <!-- Header -->
        <div class="cv-header">
          <h1 class="cv-name">${data.name}</h1>
          <h2 class="cv-title-main">${data.title}</h2>
          
          <div class="cv-contact-grid">
            <div class="cv-contact-left">
              <div>${data.contact?.location || ''}</div>
              <div>${data.contact?.phone || ''}</div>
            </div>
            <div class="cv-contact-right">
              <a href="mailto:${data.contact?.email || ''}" class="cv-link">${data.contact?.email || ''}</a>
              <div class="cv-socials">
                <a href="${data.contact?.behance || '#'}" target="_blank" class="cv-link">Behance.net <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
                <a href="${data.contact?.linkedin || '#'}" target="_blank" class="cv-link">Linkedin.com <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
              </div>
            </div>
          </div>
        </div>

        <div class="cv-sections">
          
          <!-- Education -->
          <div class="cv-section">
            <h3 class="cv-section-title">Education</h3>
            ${educationHTML}
          </div>

          <!-- Experience -->
          <div class="cv-section">
            <h3 class="cv-section-title">Experience</h3>
            ${experienceHTML}
          </div>

          <!-- Competitions -->
          <div class="cv-section">
            <h3 class="cv-section-title">COMPETITIONS</h3>
            ${competitionsHTML}
          </div>

          <!-- Bottom Grid: Softwares & Skills -->
          <div class="cv-bottom-grid">
            <div class="cv-section">
              <h3 class="cv-section-title">Softwares</h3>
              <p class="cv-text-block">${data.softwares || ''}</p>
            </div>
            <div class="cv-section">
              <h3 class="cv-section-title">Soft Skills</h3>
              <p class="cv-text-block">${data.softSkills || ''}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
});
