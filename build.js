const fs = require('fs');

console.log('Reading database...');
let dbContent = fs.readFileSync('js/data/db.js', 'utf-8');
const jsonString = dbContent.replace('window.SITE_DB = ', '').replace(/;$/, '');
const db = JSON.parse(jsonString);

// Update home data
if (fs.existsSync('content/home/home.json')) {
  console.log('Updating home data...');
  const homeData = JSON.parse(fs.readFileSync('content/home/home.json', 'utf-8'));
  
  // Feed the slider
  db.homeData = {
    sliderImages: homeData.sliderImages || []
  };
  
  // Feed the gallery
  db.home = homeData.gallery || [];
}

// Update settings
if (fs.existsSync('content/settings/data.json')) {
  console.log('Updating settings...');
  const settingsData = JSON.parse(fs.readFileSync('content/settings/data.json', 'utf-8'));
  db.settings = settingsData;
}

// Update about
if (fs.existsSync('content/about/data.json')) {
  console.log('Updating about...');
  const aboutData = JSON.parse(fs.readFileSync('content/about/data.json', 'utf-8'));
  db.about = aboutData;
}

// Update photography
if (fs.existsSync('content/photography/data.json')) {
  console.log('Updating photography...');
  const photoData = JSON.parse(fs.readFileSync('content/photography/data.json', 'utf-8'));
  db.photography = photoData.images || [];
}

// Update projects (Architecture)
const archDir = 'content/architecture';
if (fs.existsSync(archDir)) {
  console.log('Updating architecture projects...');
  const folders = fs.readdirSync(archDir, { withFileTypes: true }).filter(dirent => dirent.isDirectory());
  
  if (!db.projects) db.projects = {};
  
  folders.forEach(folder => {
    const dataFile = `${archDir}/${folder.name}/data.json`;
    if (fs.existsSync(dataFile)) {
      const projectData = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
      // Mark it as an architecture project
      projectData.fromPage = 'architecture';
      
      // Fix image paths to be relative to the root!
      const prefix = `${archDir}/${folder.name}/`;
      
      if (projectData.hero) {
        projectData.hero = projectData.hero.startsWith('images/') ? prefix + projectData.hero : projectData.hero;
      }
      
      if (projectData.thumbnail) {
        projectData.thumbnail = projectData.thumbnail.startsWith('images/') ? prefix + projectData.thumbnail : projectData.thumbnail;
      }
      
      if (projectData.gallery && Array.isArray(projectData.gallery)) {
        projectData.gallery.forEach(row => {
          if (row.images && Array.isArray(row.images)) {
            row.images = row.images.map(img => img.startsWith('images/') ? prefix + img : img);
          }
        });
      }
      
      db.projects[folder.name] = projectData;
    }
  });
}

console.log('Saving database...');
fs.writeFileSync('js/data/db.js', 'window.SITE_DB = ' + JSON.stringify(db, null, 2) + ';');

console.log('Build complete!');
