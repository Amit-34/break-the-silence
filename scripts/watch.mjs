// Watches static source files (HTML, JS, assets) and re-copies them into dist
// on change. CSS is watched separately by `postcss --watch` (see package.json).
// Uses Node's built-in fs.watch so there is no extra dependency to install.
import { watch } from 'node:fs';
import path from 'node:path';
import { copyAll, SRC, timestamp } from './lib.mjs';

const WATCHED = ['pages', 'components', 'js', 'routes', 'assets'].map((dir) =>
  path.join(SRC, dir),
);

let pending = null;

/** Debounce rapid successive file events into a single rebuild. */
function scheduleCopy(reason) {
  if (pending) {
    clearTimeout(pending);
  }
  pending = setTimeout(async () => {
    pending = null;
    try {
      await copyAll();
      console.info(`[${timestamp()}] Rebuilt dist (${reason})`);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  }, 120);
}

await copyAll();
console.info(`[${timestamp()}] Initial copy complete. Watching for changes...`);

for (const dir of WATCHED) {
  try {
    watch(dir, { recursive: true }, (_event, filename) => {
      scheduleCopy(filename ?? path.basename(dir));
    });
  } catch (error) {
    console.warn(`Could not watch ${dir}:`, error.message);
  }
}

// Keep the process alive.
process.stdin.resume();
