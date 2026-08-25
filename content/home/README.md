# Home Page — JSON Guide

This folder contains a single **`home.json`** file that controls all of the Home page content.

---

## `home.json`

This file controls the **hero slider** at the top of the Home page and the **gallery grid** below it.

### Parameters

#### `sliderImages`
A list of image paths that rotate in the full-screen background slider at the top of the Home page.

| Type | Example |
|------|---------|
| Array of strings (file paths) | `"content/home/images/AL-GHEYYA.webp"` |

---

#### `gallery`
A list of the gallery cards on the Home page, including titles, subtitles (shown on hover), and optional links to project pages.

| Key | What it does | Required? | Example |
|-----|-------------|-----------|---------|
| `id` | A unique identifier for this card | Yes | `"AL-GHEYYA"` |
| `image` | Path to the image file | Yes | `"content/home/images/AL-GHEYYA.webp"` |
| `title` | Title shown on hover overlay | Yes | `"AL-GHEYYA"` |
| `subtitle` | Subtitle shown on hover overlay | Yes | `"Project by Mohamed Ayman"` |
| `linkToProject` | The project folder name to link to (optional) | No | `"AL-GHEYYA"` |

> **Tip:** If you don't want the image to link to a project page, simply remove the `"linkToProject"` line.

**Example of the complete `home.json` file:**
```json
{
  "sliderImages": [
    "content/home/images/AL-GHEYYA.webp",
    "content/home/images/ROSETTA.webp"
  ],
  "gallery": [
    {
      "id": "ROSETTA",
      "image": "content/home/images/ROSETTA.webp",
      "title": "ROSETTA",
      "subtitle": "Project by Mohamed Ayman",
      "linkToProject": "ROSETTA"
    }
  ]
}
```

---

## Adding a New Image

1. Drop your new image file into the `images/` subfolder.
2. Add the file path to the `sliderImages` array (if you want it in the top slider) and/or add a new card object to the `gallery` array (if you want it in the grid below).
3. Run `update.bat` to apply your changes.
