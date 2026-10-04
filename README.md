# KCHR Steels clone

This folder contains the KCHR Steels website recovered from the Emergent preview. The default page runs its shipped application and library bundle with local asset URLs and the requested hero edits. Emergent's development overlay and hot reload startup were removed. All 24 photographs, the original 14 font files, the three reference typography font files, and the favicon are stored locally. The default website does not need an internet connection for its visual assets.

## Run the matching website

```powershell
cd 'E:\CLient\industrial-supply-63-clone'
npm install
npm run dev
```

Open the local URL printed by Vite. For a static production folder, run `npm run build`; its result is in `dist`.

## Source code

- `src`: recovered React components, pages, CSS, and content data.
- `public/exact-local.js`: preview's shipped bundle with locally hosted photo URLs.
- `reference/preview-bundle.js`: preview bundle before the local asset URL replacements.
- `asset-manifest.json`: original photo URL to local file mapping.
- `npm run dev:source`: run editable React source on port 4174.
- `npm run build:source`: build from editable React source into `dist-source`.

The contact form is frontend-only, matching the original preview behavior. The displayed phone number is a placeholder in the original preview.

## Full-screen hero

The home hero currently has a solid black background. Its headline reads “Supplying Strength Since 1963” in three spaced lines, and the description is vertically centered against the middle line on desktop. The requested eyebrow, lower location line, and “Make an Enquiry” hero button are removed. `public/hero-fullscreen.css` keeps the background override; the photo remains in the code and can be restored by removing the temporary override at the end of that CSS file.

## Typography

`public/shift-typography.css` applies the same Gallery Regular and Everett Light/Regular font files used on The Shift's English site. The first and third hero lines use Gallery; the middle line, description, navigation, other headings, and paragraph text use Everett. These styles are shared by the default runtime and editable source build.

## Product system section

`public/product-viewport.css` sizes the homepage “02 / PRODUCT SYSTEM” section to one viewport height. On desktop, its image and product list share the available space below the fixed header. On mobile and tablet, the six product cards form a horizontally scrollable row so each card remains readable within that viewport height.
