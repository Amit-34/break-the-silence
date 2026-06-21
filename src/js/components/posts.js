/**
 * Demonstrates fetching data from the API service and rendering cards.
 * Renders into a `[data-posts]` container if present on the page.
 */
import { qs, createEl } from '../utils/dom.js';
import { fetchSamplePosts } from '../services/api.js';

export async function initPosts() {
  const container = qs('[data-posts]');
  if (!container) {
    return;
  }

  container.setAttribute('aria-busy', 'true');

  try {
    const posts = await fetchSamplePosts(3);
    container.innerHTML = '';

    posts.forEach((post) => {
      const card = createEl('article', { class: 'card animate-fade-in-up' }, [
        createEl('div', { class: 'card-body' }, [
          createEl('span', { class: 'card-icon' }, ['#']),
          createEl('h3', { class: 'card-title capitalize' }, [post.title]),
          createEl('p', { class: 'card-text line-clamp-3' }, [post.body]),
        ]),
      ]);
      container.append(card);
    });
  } catch (error) {
    console.error('Could not load posts:', error);
    container.innerHTML =
      '<p class="text-sm text-ink-muted">Unable to load content right now.</p>';
  } finally {
    container.removeAttribute('aria-busy');
  }
}
