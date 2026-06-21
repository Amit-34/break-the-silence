// One-shot copy of static assets into dist. Used by `npm run build` and `npm run copy`.
import { copyAll, timestamp } from './lib.mjs';

try {
  const summary = await copyAll();
  console.info(`[${timestamp()}] Copied ${summary} -> dist/`);
} catch (error) {
  console.error('Failed to copy static files:', error);
  process.exitCode = 1;
}
