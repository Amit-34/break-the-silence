/**
 * Responsive navbar behavior:
 *   - mobile menu toggle (with aria-expanded sync for accessibility)
 *   - close on link click / Escape / outside click
 *   - add a shadow to the header once the user scrolls
 *
 * Note: active-link highlighting (aria-current) is handled by the router on
 * every navigation, so it is intentionally not done here.
 */
import { qs, qsa, on } from '../utils/dom.js';
import { throttle } from '../utils/helpers.js';

export function initNavbar() {
  const header = qs('[data-header]');
  const toggle = qs('[data-menu-toggle]');
  const menu = qs('[data-mobile-menu]');

  if (!header) {
    return;
  }

  // --- Mobile menu open/close ---
  if (toggle && menu) {
    const setOpen = (open) => {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };

    on(toggle, 'click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close when a menu link is clicked.
    qsa('a', menu).forEach((link) => on(link, 'click', () => setOpen(false)));

    // Close on Escape.
    on(document, 'keydown', (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    });

    // Close when clicking outside the header.
    on(document, 'click', (event) => {
      if (!header.contains(event.target)) {
        setOpen(false);
      }
    });
  }

  // --- Elevate header on scroll ---
  const onScroll = throttle(() => {
    header.classList.toggle('shadow-soft', window.scrollY > 8);
  }, 100);
  on(window, 'scroll', onScroll, { passive: true });
  onScroll();
}
