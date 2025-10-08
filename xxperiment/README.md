Static HTML/CSS/JS Export of XXperiment

Overview
- This folder contains a self-contained, static export of the Next.js/React app as plain HTML, CSS, and JavaScript.
- No original project files were modified; this export lives entirely in `static-site/`.

Contents
- `index.html` — Home page with the vinyl intro and episode coverflow (vanilla JS).
- `styles.css` — Consolidated styles adapted from the React app.
- `app.js` — Vanilla JS implementing interactions (vinyl labels, coverflow, modal, mobile menu, etc.).
- `episode.html` — Standalone episode details page (loads episode by `?id=`).

Usage
- Open `index.html` directly in a browser (double-click or drag into a tab).
- On desktop, clicking an episode card opens a rich modal.
- On mobile (<=768px), clicking a card navigates to `episode.html?id=...` for a dedicated view.

Episode Links
- `episode.html` expects an `id` query string matching one of:
  - `s1e1-episode-1`
  - `s1e2-episode-2`
  - `s1e3-episode-3`
  - `s1e4-episode-4`
  - `s1e5-episode-5`
- The home page cards are wired to these IDs when opened on mobile.

Notes
- External assets (fonts/CDNs) are referenced via public CDNs from the original design.
- No backend or APIs are used here. Forum/admin features from the React app are out-of-scope for this static export.
- You can customize episodes in `static-site/app.js` (home) and within the inline dataset in `static-site/episode.html` (details).

