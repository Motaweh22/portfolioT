# Architecture Projects — `data.json` Guide

Every folder inside `content/architecture/` represents a single project on the website. Each project folder must contain a `data.json` file and an `images/` subfolder.

---

## Folder Structure

```
content/architecture/
├── AL-GHEYYA/
│   ├── data.json       ← Project information
│   └── images/         ← All project photos
├── ROSETTA/
│   ├── data.json
│   └── images/
└── ... (more projects)
```

---

## Parameters (inside each project's `data.json`)

### `background` *(optional)*
Overrides the default Project page background color for this specific project only.

| Type | Accepted values | Default |
|------|----------------|---------|
| String | `"black"` or `"white"` | Uses the value from `content/settings/data.json → pages.project.background` |

> If you don't include this property, the project will use the default background set in `content/settings/data.json`.

---

### `title` *(required)*
The project name displayed as the main heading on the project detail page.

| Type | Example |
|------|---------|
| String | `"AL-GHEYYA"` |

---

### `subtitle` *(required)*
A short description shown below the title.

| Type | Example |
|------|---------|
| String | `"EGYPT URBAN OASIS Competition by REC & BASE studio 1st PLACE WINNERS"` |

---

### `meta` *(required)*
A list of metadata items (like Year, Location, Program) displayed alongside the project description.

Each entry has:

| Key | What it does | Example |
|-----|-------------|---------|
| `label` | The label text | `"Year:"` |
| `value` | The value text | `"2025"` |

**Example:**
```json
"meta": [
  { "label": "Year:", "value": "2025" },
  { "label": "Location:", "value": "Cairo, Egypt" },
  { "label": "Program:", "value": "Urban Retreat" }
]
```

---

### `description` *(required)*
A list of text paragraphs describing the project. Each item becomes a separate paragraph.

| Type | Example |
|------|---------|
| Array of strings | `["First paragraph...", "Second paragraph..."]` |

---

### `gallery` *(required)*
Defines how images are arranged on the project page. Each entry represents one row of images.

Each row has:

| Key | What it does | Accepted values |
|-----|-------------|-----------------|
| `cols` | How many images in this row | `1`, `2`, or `3` |
| `images` | List of image file paths (relative to the project folder) | `["images/photo1.webp", "images/photo2.webp"]` |

> **Important:** The number of images in the `images` array must match the `cols` value!

**Example:**
```json
"gallery": [
  { "cols": 1, "images": ["images/hero-shot.webp"] },
  { "cols": 2, "images": ["images/detail-1.webp", "images/detail-2.webp"] },
  { "cols": 1, "images": ["images/wide-shot.webp"] }
]
```

---

### `hero` *(optional)*
The main cover image shown at the top of the project page and as the thumbnail in the Architecture gallery.

| Type | Example |
|------|---------|
| String (file path) | `"images/8d86af231699431.68b485bd22bcd.jpg"` |

> If not set, the website will automatically use the first image from your gallery.

---

## How to Add a New Project

1. Create a new folder inside `content/architecture/` (e.g., `My-New-Project`).
2. Create an `images/` subfolder and drop all your project photos in it.
3. Copy a `data.json` from an existing project and paste it into your new folder.
4. Edit the `data.json` with your project's title, description, and image paths.
5. Run `update.bat` to publish it to the website!

## How to Delete a Project

Simply delete the project folder from `content/architecture/` and run `update.bat`.

---

## After Editing

Always run `update.bat` (double-click it) to apply your changes to the website.
