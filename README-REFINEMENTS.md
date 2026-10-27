# Littlefinger visual refinements

## What changed
- Removed the phone illustration from the right side of the homepage hero.
- Replaced the hero with a soft, minimal technology-workspace background and readable foreground copy.
- The homepage displays up to six products from `src/products.js`; the “View all products” control navigates to the Shop page.
- Inner-page headers use subtle, low-contrast imagery so text remains readable.
- Improved mobile navigation with larger tap targets, an active-page style, sticky header and a compact dropdown menu.
- Increased typography sizes and standardized body/headline fonts.
- Kept the existing lightweight scroll reveal animation and reduced-motion accessibility support.

## Run locally
1. Open this folder in VS Code.
2. Run `npm install`.
3. Run `npm run dev` to preview.
4. Run `npm run build` before deploying.

Background images are loaded from Unsplash and require an internet connection. Product names, photos and prices in `src/products.js` should be verified with the store owner before launch.
