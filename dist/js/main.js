/**
 * Application entry point.
 *
 * Loaded as an ES module: <script type="module" src="js/main.js"></script>.
 * Responsibilities:
 *   1. Load shared header/footer partials into the page shell.
 *   2. Initialize the navbar (mobile menu + scroll behavior).
 *   3. Start the SPA router, which renders views into [data-router-outlet]
 *      and handles all in-app navigation.
 *
 * Per-view logic (forms, data fetching) lives in the view modules under
 * src/routes/views, so main.js stays a thin orchestrator.
 */
import { onReady, qsa } from './utils/dom.js';
import { currentYear } from './utils/helpers.js';
import { loadPartials } from './components/partials.js';
import { initNavbar } from './components/navbar.js';
import { Router, routes, notFoundRoute } from '../routes/routesConfig.js';

/** Fill any `[data-year]` element with the current year (footer copyright). */
function setDynamicYear() {
  qsa('[data-year]').forEach((el) => {
    el.textContent = String(currentYear());
  });
}

async function bootstrap() {
  // Partials must load first so the navbar/footer markup exists in the DOM.
  await loadPartials();

  setDynamicYear();
  initNavbar();

  // Start client-side routing. Use 'history' for clean URLs (/about) — the dev
  // server and most hosts can fall back to index.html. Switch to 'hash' for
  // zero-config static hosting (URLs become /#/about).
  const router = new Router({
    outlet: '[data-router-outlet]',
    routes,
    notFound: notFoundRoute,
    mode: 'history',
  });
  router.start();
}

onReady(() => {
  bootstrap().catch((error) => console.error('App failed to start:', error));
});
