const fs = require('fs');
const path = require('path');

const archDir = path.join(__dirname, 'content', 'architecture');
const folders = fs.readdirSync(archDir, { withFileTypes: true }).filter(dirent => dirent.isDirectory());

folders.forEach(folder => {
  const projectDir = path.join(archDir, folder.name);
  const imagesDir = path.join(projectDir, 'images');
  const dataFile = path.join(projectDir, 'data.json');

  if (!fs.existsSync(imagesDir)) {
    console.log(`Skipping ${folder.name}: no images directory found.`);
    return;
  }

  // Read and sort images by modification time
  let files = fs.readdirSync(imagesDir)
    .filter(file => file.match(/\.(png|jpe?g|webp|gif)$/i))
    .map(file => {
      return {
        name: file,
        time: fs.statSync(path.join(imagesDir, file)).mtime.getTime()
      };
    })
    .sort((a, b) => a.time - b.time)
    .map(file => `images/${file.name}`);

  if (files.length === 0) {
    console.log(`Skipping ${folder.name}: no images found.`);
    return;
  }

  // Read existing JSON or create a default one
  let data = {
    title: folder.name,
    subtitle: "Project by Mohamed Ayman",
    meta: [
      { label: "Year:", value: "2024" },
      { label: "Location:", value: "Egypt" },
      { label: "Program:", value: "Architecture" }
    ],
    description: [
      "A new architectural exploration."
    ],
    gallery: []
  };

  if (fs.existsSync(dataFile)) {
    try {
      const existingData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      // Keep user-provided metadata but forcefully update the title to the folder name
      data.title = folder.name;
      data.subtitle = existingData.subtitle || data.subtitle;
      data.meta = existingData.meta || data.meta;
      data.description = existingData.description || data.description;
    } catch (e) {
      console.warn(`Could not parse existing data.json for ${folder.name}, creating new one.`);
    }
  }

  // Generate a masonry gallery
  const gallery = [];
  let i = 0;

  while (i < files.length) {
    const remaining = files.length - i;
    
    if (i === 0) {
      gallery.push({ cols: 1, images: [files[i]] });
      i += 1;
    } else if (remaining >= 2 && Math.random() > 0.3) {
      // 70% chance to put 2 in a row if at least 2 remain
      gallery.push({ cols: 2, images: [files[i], files[i+1]] });
      i += 2;
    } else {
      gallery.push({ cols: 1, images: [files[i]] });
      i += 1;
    }
  }

  data.hero = files[0] || "";
  data.gallery = gallery;

  // Clean up subtitle if it has weird characters
  if (data.subtitle) {
    data.subtitle = data.subtitle.replace(/\?\?/, '- ');
  }

  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  console.log(`Successfully updated ${folder.name} (found ${files.length} images)`);
});

console.log('All projects updated!');
