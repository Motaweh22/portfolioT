# How to Update the Website (Content Manager Guide)

Welcome to the Content Manager Guide! Your website is completely "Content-Driven". This means you **never** have to write or modify any code (HTML, CSS, Javascript) to update the website. 

Everything you need to manage is located inside the **`content/`** folder.

---

## 1. How to Add a New Architecture (or Research) Project

If you want to add a completely new project to the website, follow these simple steps:

1. **Create a Folder:** 
   Navigate to `content/architecture/` (or `content/research/`) and create a new folder. Name it whatever you want (e.g., `my-new-project`). *Tip: Use hyphens instead of spaces in folder names.*

2. **Add Your Images:** 
   Inside your new project folder, create a folder named `images/`. Copy all of your project photos into this `images/` folder.

3. **Add the Information (JSON):** 
   The easiest way to do this is to copy a `data.json` file from an existing project (like `chaotic-rhythm`) and paste it into your new project folder. 
   
   Open your new `data.json` file in any text editor and update the text:
   - **`title`**: The name of the project.
   - **`subtitle`**: A short description that appears on the gallery card.
   - **`meta`**: Information like Year, Location, etc.
   - **`description`**: The text paragraphs for the project details page.
   - **`hero`**: The main cover image (e.g., `"images/cover.jpg"`). If you leave this blank `""`, it will automatically use the first image in your gallery.
   - **`gallery`**: This defines how the images are arranged at the bottom of the project page. You can group images into rows of 1, 2, or 3 columns.
     ```json
     {
       "cols": 2,
       "images": [
         "images/photo1.jpg",
         "images/photo2.jpg"
       ]
     }
     ```

4. **Update the Website:**
   Go back to the main website folder (where `index.html` is) and **double-click the `update.bat` file**. A black window will pop up saying "Successfully compiled". 
   *Your new project is now live on the website!*

---

## 2. How to Edit the Home Page

The Home page is completely independent and has its own dedicated folder.

1. **Add Images:** 
   Navigate to `content/home/images/` and drop any new images you want to feature on the Home page here.

2. **Update the Layout:** 
   Open `content/home/data.json`. This file contains a list of every image that appears on the home page.
   
   To add a new image to the Home page, simply add a new block to the list:
   ```json
   {
     "image": "content/home/images/my-new-photo.jpg",
     "title": "My Featured Project",
     "subtitle": "Cairo, 2024",
     "linkToProject": "my-new-project"
   }
   ```
   - **`linkToProject`**: (Optional) If you want the image to act as a button that takes the user to a specific architecture project when clicked, type the exact name of the project's folder here. If you just want it to be a standalone photo, delete the `"linkToProject"` line entirely!

3. **Update the Website:**
   Always remember to **double-click the `update.bat` file** to apply your changes!

---

## 3. How to Edit the About Page

The About page is also completely independent and controllable via JSON.

1. Navigate to `content/about/` and open `data.json`.
2. Here you can edit your main headline, paragraphs, and contact links (like your email or social media handles).
3. If you want to change your profile picture, just replace the image inside `content/about/images/` and update the `"image"` path in `data.json`.
4. Run `update.bat` to apply your changes!

---

## 4. How to Edit Social Media Links (Footer)

The social media links at the bottom of every page are also controlled by a JSON file!

1. Navigate to `content/settings/` and open `data.json`.
2. Here you will see a list of `"socials"`. You can change the `"platform"` name (like "@mohamedaymen" or "LinkedIn") and set the `"url"` to your actual profile link (e.g., `"https://instagram.com/mohamedaymen"`).
3. Run `update.bat` to apply your changes everywhere!

---

## 5. How to Change Page Background Colors

You can control whether pages have a "black" or "white" background using JSON settings. The website will automatically adjust text colors to match!

### Setting Default Page Backgrounds
1. Navigate to `content/settings/` and open `data.json`.
2. Under the `"pages"` block, you can type `"black"` or `"white"` for any of the main pages:
   ```json
   "pages": {
     "home": { "background": "black" },
     "architecture": { "background": "white" },
     "about": { "background": "black" },
     "project": { "background": "white" }
   }
   ```
3. Run `update.bat` to apply your changes everywhere!

### Setting a Custom Background for a Specific Project
If you want the main "Project" default to be white, but you want one specific project (like AL-GHEYYA) to be black, you can override it!

1. Navigate to your specific project folder (e.g., `content/architecture/AL-GHEYYA/`).
2. Open its `data.json` file.
3. Add the `"background"` property at the top of the file:
   ```json
   {
     "background": "black",
     "title": "AL-GHEYYA",
     // ... rest of the data
   }
   ```
4. Run `update.bat`. Now, only that specific project will load with a black background!

---

## 6. How to Delete or Hide a Project

If you want to remove a project from the website, simply delete its folder from the `content/architecture/` directory, and run `update.bat`. The website will instantly remove it from all pages and galleries. 

*(If you just want to hide it temporarily, you can rename the folder and move it outside of the `content/` directory).*

---

### Troubleshooting
- **Images aren't loading?** Make sure the file names in your `data.json` match the actual file names exactly (including `.jpg` vs `.png`).
- **Website didn't change?** Make sure you remembered to run `update.bat` after making your edits!
- **update.bat window flashes and disappears?** Make sure you didn't accidentally delete a comma `,` or a bracket `{` in your JSON file. JSON is strict about punctuation!
