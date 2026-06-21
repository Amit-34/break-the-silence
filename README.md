# Production-Ready Frontend Starter

A scalable, accessible, and performance-focused frontend starter built with **HTML5**, **Tailwind CSS**, and **Vanilla JavaScript (ES modules)** — no runtime framework required.

- Single-page app with a **dependency-free client-side router** (`src/routes/`)
- Mobile-first, responsive layout
- Semantic, SEO-friendly, accessible HTML (per-route title + meta)
- Reusable Tailwind component classes (buttons, cards, navbar)
- Shared header/footer partials loaded at runtime (DRY)
- ES module architecture with routes/views, utilities, services, and components
- Pre-configured ESLint + Prettier (integrated, no rule conflicts)
- Cross-platform build/watch/dev scripts (Windows, macOS, Linux)
- Minified production output in `dist/`

---

## Prerequisites

- [Node.js](https://nodejs.org/) **18 or newer** (uses built-in `fs.cp` and the ESM toolchain)
- npm 9+ (ships with Node)

Check your versions:

```bash
node --version
npm --version
```

---

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (builds, watches, and serves on http://localhost:3000)
npm run dev
```

> **Windows note:** if `npm install` or scripts fail with
> _"... .ps1 cannot be loaded ... is not digitally signed"_, your PowerShell
> execution policy is blocking npm's wrapper scripts. Fix it once with:
>
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
> ```
>
> Then restart the terminal. Alternatively, run the commands from **Command Prompt (cmd)** or **Git Bash**.

---

## Available npm commands

| Command              | Description                                                                 |
| -------------------- | --------------------------------------------------------------------------- |
| `npm run dev`        | Clean, build once, then watch + serve `dist/` with live reload (port 3000). |
| `npm run build`      | Production build: clean `dist/`, copy assets, compile + **minify** CSS.     |
| `npm run watch`      | Rebuild CSS **and** copy static files automatically on every change.        |
| `npm run lint`       | Lint all JavaScript with ESLint.                                            |
| `npm run lint:fix`   | Lint and auto-fix where possible.                                           |
| `npm run format`     | Format the whole project with Prettier.                                     |
| `npm run format:check` | Check formatting without writing changes (useful in CI).                  |

Supporting scripts (usually run via the ones above): `clean`, `copy`, `build:css`, `watch:css`, `watch:files`.

---

## Project structure

```
my-project/
├── src/                      # All source files (edit these)
│   ├── assets/
│   │   ├── images/           # Raster/vector images (og-image.svg included)
│   │   ├── icons/            # Favicons / SVG icons (favicon.svg included)
│   │   └── fonts/            # Self-hosted font files
│   ├── css/
│   │   ├── main.css          # Global stylesheet entry (imports everything)
│   │   ├── components/       # Component styles: buttons, cards, navbar
│   │   └── pages/            # Page-scoped styles: home
│   ├── js/
│   │   ├── main.js           # App entry: loads partials + starts the router
│   │   ├── utils/            # dom.js, helpers.js (debounce, validation…)
│   │   ├── services/         # api.js (fetch wrapper + ApiError)
│   │   └── components/       # navbar, contactForm, posts, partials loader
│   ├── routes/               # Client-side routing (SPA)
│   │   ├── routesConfig.js   # Route table + Router class (History/hash, params, 404…)
│   │   └── views/            # home.js, about.js, contact.js, notFound.js
│   ├── pages/                # index.html (the SPA shell / outlet)
│   └── components/           # header.html, footer.html (shared partials)
├── scripts/                  # Cross-platform Node build tooling
│   ├── lib.mjs               # Shared copy/clean logic
│   ├── copy.mjs              # One-shot static copy
│   └── watch.mjs             # Watches src and re-copies on change
├── dist/                     # Build output (generated — do not edit)
├── tailwind.config.js        # Tailwind theme: colors, spacing, fonts, breakpoints
├── postcss.config.js         # PostCSS: import, tailwind, autoprefixer, cssnano
├── eslint.config.js          # ESLint 9 flat config (active)
├── .eslintrc.json            # Legacy ESLint 8 config (compatibility)
├── .prettierrc               # Prettier formatting rules
├── .prettierignore
├── .gitignore
├── package.json
└── README.md
```

### How it builds

CSS and static files are handled by two cooperating pipelines:

1. **CSS** — `src/css/main.css` imports Tailwind's layers plus the component/page
   CSS. PostCSS (`postcss-import` → `tailwindcss` → `autoprefixer` → `cssnano`)
   compiles it to `dist/css/main.css`.
2. **Static files** — `scripts/copy.mjs` copies `src/pages/*.html` to the `dist/`
   root, and `src/components`, `src/js`, `src/assets` into `dist/` preserving structure.

The HTML pages reference compiled paths (`css/main.css`, `js/main.js`,
`components/header.html`), so the served `dist/` folder is fully self-contained.

### Shared header & footer

Pages include placeholders:

```html
<div data-include="components/header.html"></div>
<div data-include="components/footer.html"></div>
```

`src/js/components/partials.js` fetches and injects these at runtime, so the
header and footer live in a single file each. Because it uses `fetch`, the site
must be served over HTTP (the dev server and any static host do this) — opening
the HTML via `file://` will not load the partials.

---

## Routing (`src/routes/`)

The app is a single-page application. `index.html` is a thin shell containing a
router outlet:

```html
<main data-router-outlet></main>
```

`src/routes/routesConfig.js` is a small, dependency-free module that holds both
the route table and the `Router` class. The route table maps URL patterns to
**view modules** in `src/routes/views/`.

A view is a plain module that exports a `render()` function (returns an HTML
string) plus optional `mount()` / `unmount()` lifecycle hooks:

```js
// src/routes/views/example.js
export const title = 'Example — Acme';
export const meta = { description: 'An example route.' };

export function render(ctx) {
  // ctx = { params, query, path }
  return `<section class="container section-y">Hello ${ctx.params.id ?? 'world'}</section>`;
}

export function mount(outlet, ctx) {
  // Run JS after the markup is inserted (attach events, fetch data, etc.)
}
```

**Add a route** in three steps:

1. Create `src/routes/views/pricing.js` with `render()` (and optional `mount()`).
2. Register it in `src/routes/routesConfig.js`:

   ```js
   import * as pricing from './views/pricing.js';
   // ...
   { path: '/pricing', view: pricing, title: 'Pricing — Acme',
     meta: { description: 'Plans and pricing.' } },
   ```

3. Link to it anywhere with the `data-link` attribute so the router intercepts it:

   ```html
   <a href="/pricing" data-link>Pricing</a>
   ```

Router features: dynamic params (`/posts/:id` → `ctx.params.id`), query parsing
(`ctx.query`), automatic `document.title` + meta description updates,
`aria-current="page"` on active links, scroll restoration, and a 404 fallback
view.

**History vs hash mode.** The router defaults to History API mode for clean URLs
(`/about`). This requires the server to serve `index.html` for unknown paths —
the dev server is already configured with `--entry-file=index.html`. For
zero-config static hosts, switch to hash mode in `src/js/main.js`
(`mode: 'hash'`), giving URLs like `/#/about` that need no server rewrites.

---

## Customization

- **Colors / spacing / fonts / breakpoints:** edit `theme` in `tailwind.config.js`.
- **Reusable component classes:** edit files in `src/css/components/`.
- **API base URL:** change `BASE_URL` in `src/js/services/api.js`.
- **Add a feature:** create a module in `src/js/components/`, then import and
  initialize it in `src/js/main.js`.
- **Add a page:** drop a new `.html` file in `src/pages/` — it's copied to the
  `dist/` root automatically.

---

## Build & deployment

Generate the production bundle:

```bash
npm run build
```

This outputs a static, minified site to `dist/`. Deploy that folder to any static
host:

- **Netlify:** build command `npm run build`, publish directory `dist`.
- **Vercel:** framework preset "Other", build command `npm run build`, output `dist`.
- **GitHub Pages:** build locally/CI and publish the `dist/` folder.
- **Any static server / CDN / S3 + CloudFront:** upload the contents of `dist/`.

**SPA fallback (history mode):** because routes use clean URLs, the host must
serve `index.html` for unknown paths so deep links and refreshes work. Configure
a rewrite, e.g. Netlify `_redirects` with `/* /index.html 200`, or a Vercel
rewrite of `/(.*)` → `/index.html`. If you can't configure rewrites, switch the
router to hash mode (see the Routing section) for fully zero-config hosting.

Preview the production build locally:

```bash
npm run build
npx live-server dist --port=4000
```

---

## Code quality

- **ESLint** (`eslint.config.js`) enforces recommended rules plus project
  conventions (`prefer-const`, `no-var`, `eqeqeq`, `curly`).
- **Prettier** (`.prettierrc`) handles formatting. `eslint-config-prettier` is
  applied last so ESLint never fights Prettier over style.

Run both before committing:

```bash
npm run lint
npm run format
```

---

## License

MIT
