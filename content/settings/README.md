# Settings — `data.json` Guide

This file controls **global website settings** that apply across all pages.

---

## Parameters

### `pages`
Controls the **background color** for each page of the website.

| Key | What it controls | Accepted values |
|-----|-----------------|-----------------|
| `pages.home.background` | Background of the Home page | `"black"` or `"white"` |
| `pages.architecture.background` | Background of the Architecture gallery page | `"black"` or `"white"` |
| `pages.about.background` | Background of the About page | `"black"` or `"white"` |
| `pages.project.background` | Default background for all Project detail pages | `"black"` or `"white"` |

> **Note:** Individual projects can override the `pages.project.background` value by setting their own `"background"` inside their project `data.json`. See the project folder README for details.

**Example:**
```json
"pages": {
  "home": { "background": "black" },
  "architecture": { "background": "white" },
  "about": { "background": "black" },
  "project": { "background": "white" }
}
```

---

### `name`
The owner's name displayed in the website header and navigation.

| Type | Example |
|------|---------|
| String | `"Mohamed Ayman"` |

---

### `socials`
A list of social media links displayed in the website footer.

Each entry has:

| Key | What it does | Example |
|-----|-------------|---------|
| `platform` | The label shown to visitors | `"LinkedIn"`, `"Behance"`, `"@mohamedaymen"` |
| `url` | The clickable link | `"https://linkedin.com/in/yourname"` |

> Use `"#"` as a placeholder URL if you haven't set up the link yet.

**Example:**
```json
"socials": [
  { "platform": "@mohamedaymen", "url": "https://instagram.com/mohamedaymen" },
  { "platform": "LinkedIn", "url": "https://linkedin.com/in/mohamedaymen" },
  { "platform": "Behance", "url": "https://behance.net/mohamedaymen" }
]
```

---

### `copyright`
The name displayed in the copyright notice at the bottom of every page.

| Type | Example |
|------|---------|
| String | `"Mohamed Ayman"` |

---

## After Editing

Always run `update.bat` (double-click it) to apply your changes to the website.
