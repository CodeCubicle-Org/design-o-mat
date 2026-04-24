# Inspiration images (optional)

Drop **any** reference image here (photo, poster, packaging scan, app screenshot, moodboard export—**not** limited to a website). Use a descriptive filename, then point to it from [`design-definition-form.md`](../docs/design-definition-form.md) **section K**.

**Suggested workflow**

1. Copy or save your file into this folder (or another path your team agrees on).
2. Fill **section K** in the form with the relative path and a short note on what you are borrowing (color temperature, grid rhythm, type contrast, etc.).
3. Run the helper (Node.js v24+, after `npm install` in the repo root):

   ```bash
   node scripts/extract-inspiration-from-image.mjs ./inspiration/your-file.jpg
   ```

   The script writes a sibling **`.inspiration-hints.md`** file next to the image with **dominant colors** you can map into the form’s color table, plus **typeface hints** when the file is **SVG** (embedded `font-family`). For **photos and raster screenshots**, typefaces are **not** embedded in the file—use a visual matcher (see the hints file and form section K).

Large binaries are a team policy choice: you may commit images, `.gitignore` them, or store them in shared drive and paste only the path in the form.
