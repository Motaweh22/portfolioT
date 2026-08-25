# Mohamed Ayman - Portfolio Website

This repository contains the source code for a custom, high-performance portfolio website built for an Architect and Researcher.

The website is designed to be highly dynamic and easy to maintain without requiring a traditional backend database or a complex modern JavaScript framework (like React or Next.js). It utilizes a custom "Vanilla JavaScript" rendering engine to generate pages from a single centralized data file.

## Project Architecture

### 1. The Data Layer (`js/data/db.js`)
Instead of relying on a backend server or CMS, all of the website's content (projects, text, gallery layouts, and settings) is stored in a structured JSON-like object inside `js/data/db.js`. 
- When the website loads, this file attaches a global object (`window.SITE_DB`) to the browser. 
- To add, remove, or modify projects, you simply edit this file. The website will automatically update its galleries and project pages to reflect the changes.

### 2. HTML Pages (The Shells)
The HTML files are lightweight "shells" that provide the structure but contain very little hardcoded content.
- `index.html`: The Home page, featuring an animated hero slider and a dynamic showcase of highlighted work.
- `architecture.html`: A dedicated gallery page for architectural projects.
- `project.html`: A dynamic template page. It reads the URL (e.g., `?key=AL-GHEYYA`) and populates the page with the specific project's data from `db.js`.
- `about.html`: Contains static information about the architect.

### 3. CSS Styling (`css/style.css`)
The website is styled entirely with Vanilla CSS (no Tailwind or external libraries).
- Uses **CSS Variables** for consistent theming and easy adjustments.
- Heavy use of **CSS Grid** and **Flexbox** for complex, responsive gallery layouts (such as `.gallery-row-3` for 3-column layouts).
- Contains custom animations (like the floating scroll arrow, hero text drop-ins, and page transition fades).

### 4. JavaScript Rendering Engine (`js/`)
The JavaScript architecture is split into modular components to handle the dynamic injection of content:
- **`js/components/gallery-renderer.js`**: Reads `window.SITE_DB` and automatically generates the HTML grids for the Home and Architecture galleries. It handles the logic for grouping images into rows.
- **`js/components/project-renderer.js`**: Specifically handles the `project.html` page, dynamically building the hero header, text content, and image grids based on the URL parameter.
- **`js/components/lightbox.js`**: A custom-built, lightweight image viewer that allows users to click on project images to view them in a full-screen, navigable gallery.
- **`js/main.js`**: Initializes global features like custom cursors, navigation interactions, and page transition reveals.
- **`js/pages/home.js`**: Contains page-specific logic, such as the hero image slider loop and the cinematic scroll animation for the bouncing arrow.

## How to Edit Content

1. **Adding a new project**: Open `js/data/db.js` and add a new entry under the `projects` object. 
2. **Updating Home Page Gallery**: Open `js/data/db.js` and modify the `home` array to include the new project.
3. **Updating Architecture Gallery**: Open `js/data/db.js` and modify the `architecture` array.

## Running Locally

Because the project relies on JavaScript modules and fetches, it should be run through a local web server (like VS Code's "Live Server" extension or Python's `http.server`) rather than opening the HTML files directly from the file system.
