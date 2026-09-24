# Joséphine Café

The website source is in `site/dist`. The current Render service publishes the repository root, so the same static files are included at the root for its live URL.

After editing the site, run `node sync-render.mjs` before committing. Render then serves `index.html` at `/` and loads its assets from `/assets`, `styles.css`, and `app.js`.

For a new Render Static Site, set **Publish Directory** to `site/dist` instead. No build command is needed for this plain HTML site.

The interactive record corner is in `site/dist/room.js`. Its records, radio, and lamps are lightweight Three.js geometry inspired by the café photos; the radio has no audio yet. The local Three.js r186 modules and MIT license are in `site/dist/vendor/`. `site/dist/language.js` handles the FR/EN switch. Keep the root copies in sync with `sync-render.mjs` before deploying.
