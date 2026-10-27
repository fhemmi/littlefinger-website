# Littlefinger multi-page React project

## Structure
- `src/pages/` contains the page components: `Home.jsx`, `Shop.jsx`, `About.jsx`, `Guides.jsx`, `FAQ.jsx`, and `Contact.jsx`.
- `src/components/` contains shared UI components: `Header.jsx`, `Footer.jsx`, and `ProductCard.jsx`.
- `src/App.jsx` manages navigation, shared cart state, product detail modal, and WhatsApp ordering.
- `src/products.js` holds the product catalogue.
- `src/App.css` contains the visual styling.

## Routes
- `/` — Home
- `/shop` — Shop
- `/about` — About
- `/guides` — Tips & Guides
- `/faq` — FAQs
- `/contact` — Contact

Navigation uses the History API and Vite's development server fallback. For production hosting, configure SPA fallback/rewrites so direct requests to routes such as `/about` serve `index.html`.

## Run locally
1. Install Node.js (Node 20+ recommended).
2. Run `npm install`.
3. Run `npm run dev`.
4. Before publishing, run `npm run build`.

## Before launch
- Confirm demo product prices, model details, stock, colours and images.
- Replace the About page note with the owner's real biography and an authentic image.
- Add verified business address, hours and social profiles.
- Confirm the store's delivery, warranty and return policies before publishing FAQ answers.

The storefront remains a showcase with WhatsApp enquiry/order flow; it is not a payment-processing or inventory-management system.
