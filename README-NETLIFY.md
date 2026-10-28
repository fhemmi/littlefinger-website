# Littlefinger website — Netlify notes

## Build settings
- Build command: `npm run build`
- Publish directory: `dist`
- Base directory: leave blank (the `package.json` file is in the repository root)
- Node version: 20 (also configured in `netlify.toml`)

## Important
Do not commit `node_modules/` or `dist/`. Netlify should install dependencies from `package-lock.json` during each build. The `.gitignore` file excludes both folders. If `node_modules` was already committed to GitHub, remove it from Git tracking once with `git rm -r --cached node_modules` and commit/push that cleanup. Then redeploy on Netlify.

The `public/_redirects` file enables client-side routes (for example `/shop` and `/contact`) to work when refreshed directly.
