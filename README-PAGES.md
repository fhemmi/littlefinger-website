# Littlefinger multi-page update

## Routes added
- `/` — Home
- `/shop` — Product catalogue (all products visible, with existing category filters and search)
- `/about` — About Littlefinger, values and owner-story placeholder
- `/guides` — Tips & Guides with image-led article cards
- `/faq` — FAQs plus pre-order information
- `/contact` — WhatsApp enquiry routes and contact-information placeholders

The header and footer are shared across pages. Client-side navigation updates the URL using the browser History API, and browser back/forward navigation is supported.

## Before launch
- Replace the owner-story and owner-photo placeholders with verified details.
- Confirm product names, prices, specifications, stock, payment, delivery, warranty and return policies.
- Replace image URLs with approved Littlefinger imagery where possible.
- Ensure the deployment host serves `index.html` as a fallback for direct visits to `/shop`, `/about`, `/guides`, `/faq` and `/contact` (Vite SPA rewrite/fallback).

## Run locally
```bash
npm install
npm run dev
npm run build
```
