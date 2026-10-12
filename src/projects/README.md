# Adding Video Projects to the Portfolio

This portfolio uses dynamic automatic indexing via Vite (`import.meta.glob`). To add or update projects and video assets, follow the convention below.

---

## 1. Directory Structure

Each project lives inside its category folder under `src/projects/`:

```text
src/projects/
├── ai-video/
│   ├── sartorial-heritage-shoes/
│   │   ├── project.json
│   │   ├── thumbnail.jpg
│   │   └── video.mp4          <-- Optional local video or external embed
│   ├── olaplex-bonding-oil/
│   └── cinematic-commercial/
├── ugc-commercial/
│   ├── aurevane-lumisera/
│   ├── cachivane-paris-handbag/
│   └── nexus-digital-runway/
├── ecommerce-product-demo/
│   ├── moduluxe-bento-organizer/
│   └── hydrorack-sink-organizer/
└── intelligent-automation/
    ├── ai-operational-backbone/
    └── content-automation-engine/
```

---

## 2. Uploading / Adding Your Videos

You have two options for videos:

### Option A: Local MP4 Video (Direct File)
1. Drop your `.mp4` file directly into the project folder, for example:  
   `src/projects/ai-video/my-new-project/video.mp4`
2. In `project.json`, reference it:
   ```json
   "videoUrl": "./video.mp4"
   ```
   *The registry automatically detects and resolves the video file!*

### Option B: Cloud-Hosted Video (Vimeo / YouTube / Loom / CDN / S3 / Supabase)
1. Upload your video to Vimeo, YouTube, AWS S3, Cloudflare Stream, or any CDN.
2. In `project.json`, paste the URL:
   ```json
   "videoUrl": "https://player.vimeo.com/video/123456789"
   ```
   or direct CDN MP4:
   ```json
   "videoUrl": "https://assets.yourcdn.com/videos/hero-showcase.mp4"
   ```

---

## 3. Creating or Editing `project.json`

Every project directory contains a `project.json` file with this schema:

```json
{
  "id": "my-project-slug",
  "slug": "my-project-slug",
  "number": "01",
  "title": "Project Title",
  "category": "AI Video",
  "categorySlug": "ai-video",
  "featured": true,
  "client": "Client Name or Brand",
  "year": "2025",
  "duration": "14 Days",
  "timeline": [
    { "phase": "Concept & Storyboard", "duration": "Days 1–3", "status": "Completed" },
    { "phase": "AI Model Training & LoRA", "duration": "Days 4–7", "status": "Completed" },
    { "phase": "Generation & Compositing", "duration": "Days 8–12", "status": "Completed" },
    { "phase": "Color Grading & Sound", "duration": "Days 13–14", "status": "Completed" }
  ],
  "shortDescription": "One-line hook describing the video and automation.",
  "fullDescription": "Deep dive into the problem, methodology, and aesthetic direction.",
  "promptEngineering": "cinematic 35mm film still, anamorphic lens, shallow depth of field, photorealistic...",
  "toolsUsed": ["Midjourney v6", "Runway Gen-3 Alpha", "ComfyUI", "DaVinci Resolve", "n8n"],
  "deliverables": ["4K 60s Hero Video", "9:16 Social Cuts", "Automated Variant Engine"],
  "metrics": [
    { "label": "Render Efficiency", "value": "12x Faster" },
    { "label": "Client Retention", "value": "98.4%" }
  ],
  "videoUrl": "./video.mp4",
  "externalLink": "https://example.com"
}
```

### Setting the Featured Project on the Homepage
- Set `"featured": true` on whichever project in that category should be highlighted on the homepage Selected Work section.
- Only one project per category needs `"featured": true`. All other projects in that category remain accessible in the **Category Archive / Library** (`/category/ai-video`).

---

## 4. Deploying to GitHub Pages

1. Commit and push your changes:
   ```bash
   git add src/projects/
   git commit -m "Add new video project"
   git push origin main
   ```
2. GitHub Actions runs `npm run build` and automatically deploys your updated portfolio to `https://jhimmylibot1998-sys.github.io/personal-portfolio/`.
