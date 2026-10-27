# Littlefinger motion and hero notes

This update keeps the animation code intentionally small and readable.

## What changed
- The home hero now uses a phone illustration built from ordinary CSS and a small inline SVG. It does not need a separate phone image or image library.
- The phone gently floats, while the logo fades in like a device starting up.
- Main page sections fade and lift into view as you scroll. Each section animates once.
- Motion is disabled for people who have enabled “Reduce Motion” on their device.
- The “Get in touch” hero button uses the existing app navigation, rather than reloading the page.

## Where to edit it
- `src/pages/Home.jsx`: hero text, phone markup and boot logo.
- `src/App.jsx`: the small `IntersectionObserver` effect that reveals sections.
- `src/App.css`: phone appearance, timing and responsive styles. Search for `Simple, reusable motion` or `Home hero`.

## Adjust the animation speed
In `src/App.css`, change the `0.65s` duration in `.reveal-on-scroll` for the scroll effect. Change the `6s` duration in `phone-float` to make the phone float slower or faster.

## Run locally
1. Open this folder in VS Code.
2. Run `npm install` in the terminal.
3. Run `npm run dev` and open the local URL Vite prints.
4. Before publishing, run `npm run build`.

The production build could not be verified in this environment because dependency installation did not finish and Vite was not available. Run the commands above locally to confirm the build.
