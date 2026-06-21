/**
 * Single-file routing configuration for the SPA.
 *
 * This file combines:
 *   1. The route table (`routes` + `notFoundRoute`) — maps URL patterns to views.
 *   2. The `Router` class — a dependency-free client-side router.
 *
 * Router features:
 *   - History API (clean URLs like /about) or hash mode (#/about) — configurable
 *   - Dynamic params, e.g. "/posts/:id"  ->  ctx.params.id
 *   - Query string parsing                ->  ctx.query
 *   - Intercepts clicks on [data-link] anchors for SPA navigation
 *   - Per-route document.title + meta description
 *   - Active-link highlighting via aria-current="page"
 *   - Scroll restoration (top on navigate, to #anchor when present)
 *   - 404 / not-found fallback route
 *   - Lifecycle hooks on views: render() + optional mount()/unmount()
 *
 * A "view" is a plain module/object: { title?, meta?, render(ctx), mount?(outlet, ctx), unmount?() }.
 */
import * as home from './views/home.js';
import * as typography from './views/typography.js';
import * as notFound from './views/notFound.js';

/* ------------------------------------------------------------------ *
 * Route table
 * ------------------------------------------------------------------ */

/**
 * Each entry maps a URL pattern to a view module and its SEO metadata.
 * Patterns support dynamic params, e.g. `path: '/posts/:id'` exposes
 * `ctx.params.id` inside the view.
 *
 * To add a route: create a view in ./views, import it, and add an entry here.
 */
export const routes = [
  {
    path: '/',
    view: home,
    title: 'Acme — Production-Ready Frontend Starter',
    meta: {
      description:
        'A scalable, accessible frontend starter built with HTML5, Tailwind CSS, and Vanilla JavaScript.',
    },
  },
  {
    path: '/typography',
    view: typography,
    title: 'Typography — Acme',
    meta: {
      description:
        'Live reference for the semantic typography system: font-display, font-heading, font-body, and font-accent.',
    },
  },
];

/** Fallback route rendered when no pattern matches the current URL. */
export const notFoundRoute = {
  path: '*',
  view: notFound,
  title: 'Page not found — Acme',
  meta: { description: 'The page you are looking for could not be found.' },
};

/* ------------------------------------------------------------------ *
 * Internal helpers
 * ------------------------------------------------------------------ */

/**
 * Compile a route pattern ("/posts/:id") into a matcher.
 * @param {string} pattern
 * @returns {{ regex: RegExp, keys: string[] }}
 */
function compilePattern(pattern) {
  const keys = [];
  const regexStr = pattern
    .replace(/\/+$/, '') // strip trailing slash
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // escape regex chars
    .replace(/\\:([A-Za-z0-9_]+)/g, (_match, key) => {
      keys.push(key);
      return '([^/]+)';
    });
  return { regex: new RegExp(`^${regexStr || '/'}/?$`), keys };
}

/** Normalize a path: ensure leading slash, strip trailing slash (except root). */
function normalizePath(path) {
  if (!path) {
    return '/';
  }
  const clean = path.split('?')[0].split('#')[0];
  const trimmed = clean.replace(/\/+$/, '');
  return trimmed.startsWith('/') ? trimmed || '/' : `/${trimmed}`;
}

/** Parse a query string into a plain object. */
function parseQuery(search) {
  const params = new URLSearchParams(search);
  return Object.fromEntries(params.entries());
}

/* ------------------------------------------------------------------ *
 * Router
 * ------------------------------------------------------------------ */

export class Router {
  /**
   * @param {object} options
   * @param {Element|string} options.outlet - container (or selector) to render views into.
   * @param {Array} [options.routes] - route table (defaults to the `routes` export above).
   * @param {object} [options.notFound] - fallback route (defaults to `notFoundRoute`).
   * @param {'history'|'hash'} [options.mode='history']
   * @param {string} [options.linkAttribute='data-link']
   */
  constructor({
    outlet,
    routes: routeTable = routes,
    notFound = notFoundRoute,
    mode = 'history',
    linkAttribute = 'data-link',
  }) {
    this.outlet = typeof outlet === 'string' ? document.querySelector(outlet) : outlet;
    if (!this.outlet) {
      throw new Error('Router: outlet element not found.');
    }
    this.mode = mode;
    this.linkAttribute = linkAttribute;
    this.notFound = notFound;
    this.routes = routeTable.map((route) => ({ ...route, ...compilePattern(route.path) }));
    this.current = null; // currently mounted view (for unmount)

    this._onClick = this._onClick.bind(this);
    this._onPopState = this._onPopState.bind(this);
  }

  /** Begin listening for navigation and render the current URL. */
  start() {
    document.addEventListener('click', this._onClick);
    window.addEventListener(this.mode === 'hash' ? 'hashchange' : 'popstate', this._onPopState);
    this._render(this._currentPath());
    return this;
  }

  /** Stop listening (useful for tests / teardown). */
  stop() {
    document.removeEventListener('click', this._onClick);
    window.removeEventListener(this.mode === 'hash' ? 'hashchange' : 'popstate', this._onPopState);
  }

  /** Read the active path from the URL based on the routing mode. */
  _currentPath() {
    if (this.mode === 'hash') {
      return window.location.hash.replace(/^#/, '') || '/';
    }
    return window.location.pathname || '/';
  }

  /**
   * Programmatically navigate to a path.
   * @param {string} to
   * @param {{ replace?: boolean }} [options]
   */
  navigate(to, { replace = false } = {}) {
    if (this.mode === 'hash') {
      // Triggers a hashchange event which calls _render.
      const target = `#${to}`;
      if (replace) {
        window.location.replace(target);
      } else {
        window.location.hash = to;
      }
      return;
    }
    if (replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }
    this._render(to);
  }

  /** Intercept same-origin [data-link] anchor clicks. */
  _onClick(event) {
    const link = event.target.closest(`[${this.linkAttribute}]`);
    if (!link) {
      return;
    }
    // Respect modifier keys, middle/right click, and new-tab targets.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      link.target === '_blank'
    ) {
      return;
    }
    const href = link.getAttribute('href');
    if (
      !href ||
      /^(https?:)?\/\//.test(href) ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    ) {
      return;
    }
    event.preventDefault();
    const normalized = href.startsWith('#') ? href.slice(1) : href;
    if (normalizePath(normalized) !== normalizePath(this._currentPath())) {
      this.navigate(normalized);
    }
  }

  _onPopState() {
    this._render(this._currentPath());
  }

  /** Find the route matching a path, returning the route and extracted params. */
  _match(path) {
    const normalized = normalizePath(path);
    for (const route of this.routes) {
      const result = route.regex.exec(normalized);
      if (result) {
        const params = {};
        route.keys.forEach((key, index) => {
          params[key] = decodeURIComponent(result[index + 1]);
        });
        return { route, params };
      }
    }
    return { route: this.notFound, params: {} };
  }

  /** Update document title and meta description for the active route. */
  _applyMeta(route) {
    if (route?.title) {
      document.title = route.title;
    }
    const description = route?.meta?.description;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }

  /** Toggle aria-current on navigation links that match the active path. */
  _updateActiveLinks(activePath) {
    const normalizedActive = normalizePath(activePath);
    document.querySelectorAll(`[${this.linkAttribute}]`).forEach((link) => {
      const href = link.getAttribute('href') || '';
      const target = normalizePath(href.startsWith('#') ? href.slice(1) : href);
      if (target === normalizedActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  /** Resolve the path, render the matched view, and run lifecycle hooks. */
  async _render(path) {
    const { route, params } = this._match(path);
    if (!route) {
      this.outlet.innerHTML = '<p class="container section-y">Page not found.</p>';
      return;
    }

    const ctx = {
      params,
      query: parseQuery(window.location.search || (window.location.hash.split('?')[1] ?? '')),
      path: normalizePath(path),
    };

    // Tear down the previous view if it declared cleanup.
    if (this.current?.unmount) {
      try {
        this.current.unmount();
      } catch (error) {
        console.error('Router: error during unmount:', error);
      }
    }

    const view = route.view;
    try {
      const html = typeof view.render === 'function' ? await view.render(ctx) : '';
      this.outlet.innerHTML = html;
      this._applyMeta(route);
      this._updateActiveLinks(ctx.path);

      if (typeof view.mount === 'function') {
        await view.mount(this.outlet, ctx);
      }
      this.current = view;

      this._restoreScroll();
      document.dispatchEvent(new CustomEvent('route:changed', { detail: ctx }));
    } catch (error) {
      console.error(`Router: failed to render "${ctx.path}":`, error);
      this.outlet.innerHTML =
        '<p class="container section-y">Something went wrong loading this page.</p>';
    }
  }

  /** Scroll to a hash anchor if present, otherwise to the top of the page. */
  _restoreScroll() {
    const hash = this.mode === 'hash' ? '' : window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}
