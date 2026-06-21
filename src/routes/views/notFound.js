/**
 * 404 view — rendered by the router when no route matches.
 */
export const title = 'Page not found — Acme';
export const meta = { description: 'The page you are looking for could not be found.' };

export function render(ctx = {}) {
  const attempted = ctx.path ? `<code class="rounded bg-slate-100 px-1.5 py-0.5">${ctx.path}</code>` : '';
  return /* html */ `
    <section class="section-y">
      <div class="container">
        <div class="mx-auto max-w-xl text-center">
          <p class="font-display text-7xl font-bold text-primary-600">404</p>
          <h1 class="mt-4 text-3xl sm:text-4xl">Page not found</h1>
          <p class="mt-4 text-ink-muted">
            We couldn't find ${attempted || 'that page'}. It may have been moved or never existed.
          </p>
          <a href="/" data-link class="btn btn-primary mt-8">Back to home</a>
        </div>
      </div>
    </section>
  `;
}
