/**
 * Typography view — live reference for the semantic font system.
 * Demonstrates the four role tokens (font-display / -heading / -body / -accent)
 * and the full weight scale. Static content, so no mount hook is needed.
 */
export const title = 'Typography — Acme';
export const meta = {
  description:
    'Live reference for the semantic typography system: font-display, font-heading, font-body, and font-accent.',
};

export function render() {
  return /* html */ `
    <!-- DISPLAY — hero / marketing. Largest, boldest role. -->
    <section class="border-b border-slate-100 bg-slate-50">
      <div class="container section-y">
        <div class="mx-auto max-w-prose">
          <p class="font-accent text-sm font-semibold uppercase tracking-widest text-primary-600">
            Design System
          </p>
          <h1 class="mt-3 font-display text-display-lg font-extrabold tracking-tight">
            Typography that scales
          </h1>
          <p class="mt-5 font-body text-lg leading-relaxed text-ink-muted">
            Every role below maps to a CSS variable, so the same markup can be re-skinned per brand
            without editing components or the Tailwind config.
          </p>
        </div>
      </div>
    </section>

    <section class="section-y">
      <div class="container mx-auto max-w-prose">
        <!-- HEADING — section titles. font-heading + bold/semibold. -->
        <h2 class="font-heading text-2xl font-bold">A semantic role for every level</h2>
        <h3 class="mt-6 font-heading text-xl font-semibold">Built on design tokens</h3>

        <!-- BODY — paragraphs / long-form. font-body, weights 400/500. -->
        <p class="mt-4 font-body text-base font-normal leading-relaxed text-ink-muted">
          This paragraph uses <code>font-body</code> at the regular (400) weight. Use
          <span class="font-medium text-ink">font-medium (500)</span> to gently emphasize a phrase
          inside running text.
        </p>

        <!-- BUTTONS — reuse the .btn component classes (font-semibold). -->
        <div class="mt-8 flex flex-wrap items-center gap-3">
          <button class="btn btn-primary">Primary action</button>
          <button class="btn btn-secondary">Secondary</button>
          <button class="btn btn-accent btn-lg font-heading">Heading face, large</button>
        </div>

        <!-- ACCENT — captions, labels, eyebrows, metadata. -->
        <figure class="mt-10 rounded-2xl bg-slate-50 p-6 shadow-soft">
          <blockquote class="font-heading text-lg font-medium text-ink">
            &ldquo;Good typography is invisible; bad typography is everywhere.&rdquo;
          </blockquote>
          <figcaption
            class="mt-3 font-accent text-xs font-semibold uppercase tracking-wider text-ink-soft"
          >
            Caption &middot; Proxima Nova Accent
          </figcaption>
        </figure>

        <!-- WEIGHT SCALE — proves every registered face is reachable. -->
        <div class="mt-12">
          <h3 class="font-heading text-lg font-semibold">Weight scale</h3>
          <ul class="mt-4 space-y-1 font-body text-xl">
            <li class="font-normal">Regular &middot; 400 — The quick brown fox</li>
            <li class="font-medium">Medium &middot; 500 — The quick brown fox</li>
            <li class="font-semibold">Semibold &middot; 600 — The quick brown fox</li>
            <li class="font-bold">Bold &middot; 700 — The quick brown fox</li>
            <li class="font-extrabold">Extrabold &middot; 800 — The quick brown fox</li>
          </ul>
        </div>
      </div>
    </section>
  `;
}
