/**
 * Loads shared HTML partials (header, footer) into placeholder elements.
 *
 * Markup in a page:
 *   <div data-include="components/header.html"></div>
 *   <div data-include="components/footer.html"></div>
 *
 * This keeps the header/footer in a single source file (DRY) while staying
 * 100% static — it works on any static host because it only fetches files.
 */
import { qsa } from '../utils/dom.js';

/**
 * Find all `[data-include]` placeholders and replace their contents
 * with the referenced HTML file.
 * @returns {Promise<void>}
 */
export async function loadPartials() {
  const hosts = qsa('[data-include]');

  await Promise.all(
    hosts.map(async (host) => {
      const url = host.getAttribute('data-include');
      if (!url) {
        return;
      }
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        host.innerHTML = await response.text();
      } catch (error) {
        console.error(`Failed to load partial "${url}":`, error);
        host.innerHTML = '';
      }
    }),
  );
}
