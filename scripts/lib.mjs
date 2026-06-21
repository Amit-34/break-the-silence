// Shared, cross-platform copy logic used by both the one-shot build (copy.mjs)
// and the watcher (watch.mjs). Works on Windows, macOS, and Linux because it
// relies only on Node's built-in `fs` APIs (no shell-specific commands).
import { cp, mkdir, rm, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const ROOT = path.resolve(__dirname, '..');
export const SRC = path.join(ROOT, 'src');
export const DIST = path.join(ROOT, 'dist');

/** Copy a directory recursively, replacing any existing destination. */
async function copyDir(from, to) {
  if (!existsSync(from)) {
    return;
  }
  await mkdir(path.dirname(to), { recursive: true });
  await cp(from, to, { recursive: true, force: true });
}

/** Copy every HTML page in src/pages to the dist root (so /about.html works). */
async function copyPages() {
  const pagesDir = path.join(SRC, 'pages');
  if (!existsSync(pagesDir)) {
    return;
  }
  await mkdir(DIST, { recursive: true });
  const entries = await readdir(pagesDir, { withFileTypes: true });
  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
      .map((entry) =>
        cp(path.join(pagesDir, entry.name), path.join(DIST, entry.name), { force: true }),
      ),
  );
}

/**
 * Copy all static source files into dist (CSS is handled separately by PostCSS).
 * Returns a short summary string for logging.
 */
export async function copyAll() {
  await mkdir(DIST, { recursive: true });
  await copyPages();
  await copyDir(path.join(SRC, 'components'), path.join(DIST, 'components'));
  await copyDir(path.join(SRC, 'js'), path.join(DIST, 'js'));
  await copyDir(path.join(SRC, 'routes'), path.join(DIST, 'routes'));
  await copyDir(path.join(SRC, 'assets'), path.join(DIST, 'assets'));
  return 'pages, components, js, routes, assets';
}

/** Remove the dist directory entirely. */
export async function cleanDist() {
  await rm(DIST, { recursive: true, force: true });
}

export function timestamp() {
  return new Date().toLocaleTimeString();
}
