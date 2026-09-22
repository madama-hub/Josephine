# Joséphine Café

The website source is in `site/dist`. The current Render service publishes the repository root, so the same static files are included at the root for its live URL.

After editing the site, run `node sync-render.mjs` before committing. Render then serves `index.html` at `/` and loads its assets from `/assets`, `styles.css`, and `app.js`.

For a new Render Static Site, set **Publish Directory** to `site/dist` instead. No build command is needed for this plain HTML site.
