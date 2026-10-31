# Redox branding agency template

## Run locally

Use Node.js 20.19+ or 22.12+ and pnpm 10.26.2.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Deploy to Vercel

Keep the Framework Preset set to **Other**. The checked-in `vercel.json`
sets the build command to `pnpm run build` and the output directory to `dist`.
If dashboard overrides are enabled, make sure they match these values.
Deploy the repository root, where `package.json` and `index.html` are located.
Redeploy after committing these changes.

The Vite configuration copies `assets/` into `dist/assets/` after bundling.
This preserves classic vendor scripts, their execution order, and hover images
referenced through `data-img`. Without this step Vite leaves those references
in the page but omits the files, causing production 404s.

`pnpm build` also checks every local HTML and CSS asset reference in `dist` and
fails if a file is missing. Use `pnpm preview` to view the production build.

Font Awesome 6.1.2 webfonts are included with their license in `assets/webfonts/`.
The original display font files were absent from the source; the stylesheet
uses DM Sans and system serif fallbacks instead. The Google Fonts stylesheet
still requires an external connection.
