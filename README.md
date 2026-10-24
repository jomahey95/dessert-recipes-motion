# Dessert Recipes — Motion Recreation

A vanilla HTML, CSS and JavaScript recreation of the supplied nine-second mobile app reference. The layout, recipe order, palette, perspective scrolling, connected image transitions, collapsing header and scroll-linked image rotation follow the reference. Food photographs were recreated with ImageGen; they are not the original application's assets. Recipe copy and methods are newly written where the recording was not readable.

## Files

- `dist/index.html` — semantic app shell, icons and recipe dialog.
- `dist/styles.css` — responsive layout, perspective cards, recipe pages and reduced-motion support.
- `dist/app.js` — recipe data, velocity-driven scroll animation, Web Animations transitions, history navigation, ingredient checkboxes and device-local saved/custom recipes.
- `dist/assets/` — optimized transparent WebP photographs and SVG favicon.
- `vercel.json` — buildless static deployment from `dist/`.

## Run

Serve `dist/` using any static HTTP server. No package installation or build is required. All assets are included locally; there are no runtime CDN dependencies, API keys or backend services.

`npm run check` checks the JavaScript syntax.

## Motion

1. Feed scroll velocity drives each card's `rotateX`, depth and scale. An animation frame loop settles the cards as the swipe slows.
2. Selecting a recipe animates a color surface and the same dish image from the card's measured rectangle to the hero's measured rectangle.
3. Ingredient rows enter in a staggered sequence.
4. Recipe scroll collapses the hero from 314 px to 137 px. The dish shrinks and rotates with the scroll position.
5. Back navigation reverses the measured transition and retains the collection's scroll position.

The device's reduced-motion preference disables perspective and navigation motion. Interactive controls have accessible names, keyboard focus and appropriate modal behavior. Custom recipe text is escaped before rendering.

Saved recipes and custom recipes use browser `localStorage`, scoped to the current device/browser. The recipe form explicitly states this. No account or cross-device storage is implied.

## Asset production

The built-in ImageGen tool created the food photographs. Project-ready files are in `dist/assets/` and preserve transparency. They are encoded as WebP at 680 px for fast delivery. The common prompt specification was:

> One transparent recipe-app cutout photograph. Perfect overhead top-down view. Entire circular plate or bowl visible, centered, filling about 90% of a square canvas. Photorealistic food, soft studio light, rich colors and detailed texture. No table, UI, text, hands or watermark. Actual alpha transparency outside the plate.

Subjects: eight-wedge lemon cheesecake with lemon slices and mint; colorful French macarons in a pink-rimmed dark bowl; buttercream flower cupcakes on a black plate; chocolate cheesecake; mixed fruit platter; white cream cake; custard fruit tart; strawberries in a dark bowl; dark chocolate cake; and lattice-topped apple pie. The first three subjects used screenshots from the supplied recording as composition references.

## Validation

Browser checks cover the recipe collection, recipe opening and back navigation, the 137 px collapsed hero, scroll-linked rotation, saved recipes, ingredient selection and the recipe dialog. Screenshots were compared with the supplied reference. The static app requires no server-side environment variables.
