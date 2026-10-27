# Replacing temporary images

All non-product placeholder photos are listed in `src/content/images.js`. Replace each URL with a real Littlefinger photo URL (or a local file path such as `/images/littlefinger-store.jpg`). Keep the key names the same and the pages update automatically.

Product photos are in `src/products.js`, inside each product's `image` field. Replace those URLs with the actual product photo URLs.

The About page currently labels its store photo as temporary so it is easy to spot before launch. Remove the `image-placeholder-label` span in `src/pages/About.jsx` after replacing the image.

No customer testimonials have been invented. Add real customer quotes only after the owner approves them. Until then, the site uses a benefits section instead.
