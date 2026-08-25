# About Page CV Guide

This file controls everything displayed on the **About** page. It has been redesigned to support a full CV layout.

---

## Parameters

### `image`
The path to your profile/portrait photo.

| Type | Example |
|------|---------|
| String (file path) | `"content/about/images/portrait.png"` |

### `leftColSubtitle`
The subtitle displayed just below your image.

| Type | Example |
|------|---------|
| String | `"Junior Architect (Fresh Grad)"` |

### `paragraphs`
The biography text below your image. Each item is a separate paragraph.

| Type | Example |
|------|---------|
| Array of strings | `["As an Architecture student...", "Beyond Architecture learning..."]` |
> **Tip:** You can use basic HTML like `<strong>` for bold text or `<br>` for line breaks inside the paragraph strings.

---

### Header Info (Right Column)

| Key | What it does | Example |
|-----|-------------|---------|
| `name` | Your full name | `"Mohamed Ayman"` |
| `title` | Your main title | `"Architecture Student"` |
| `contact` | An object holding your contact details | See below |

**Contact Object Example:**
```json
"contact": {
  "location": "Cairo, Egypt",
  "phone": "+20 01096107769",
  "email": "Mohamed.yman1152003@gmail.com",
  "behance": "Behance.net",
  "linkedin": "Linkedin.com"
}
```

---

### CV Sections

You can add items to your CV using arrays. Each item requires a `date` and a `title`. For experience items, you can also add a `bullets` array.

#### `education`
```json
"education": [
  {
    "date": "SEP 2022- Present",
    "title": "<strong>Student | Dept of Architecture</strong> | Ain Shams university"
  }
]
```

#### `experience`
```json
"experience": [
  {
    "date": "SEP 2025",
    "title": "<strong>Snøhetta Master class 2nd edition.</strong> Alexanderia Library",
    "bullets": [
      "Selected among <strong>35</strong> students from over 650 applicants..."
    ]
  }
]
```

#### `competitions`
```json
"competitions": [
  {
    "date": "AUG 2025",
    "title": "<strong>First Place.</strong> Egypt Urban Oasis competition."
  }
]
```

---

### Skills & Software (Bottom Grid)

| Key | What it does | Example |
|-----|-------------|---------|
| `softwares` | List of software | `"3ds Max, Revit, Rhino, AutoCAD..."` |
| `softSkills` | List of soft skills | `"Graphic Design, Presentation Skills..."` |

---

## After Editing

Always run `update.bat` (double-click it) to apply your changes to the website.
