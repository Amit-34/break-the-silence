/**
 * General-purpose, framework-agnostic helper functions.
 */

/**
 * Debounce: delay invoking `fn` until `wait` ms have passed since the last call.
 * Great for resize/scroll/input handlers.
 * @template {(...args: any[]) => void} T
 * @param {T} fn
 * @param {number} [wait=200]
 * @returns {(...args: Parameters<T>) => void}
 */
export const debounce = (fn, wait = 200) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
};

/**
 * Throttle: ensure `fn` runs at most once every `limit` ms.
 * @template {(...args: any[]) => void} T
 * @param {T} fn
 * @param {number} [limit=200]
 * @returns {(...args: Parameters<T>) => void}
 */
export const throttle = (fn, limit = 200) => {
  let waiting = false;
  return (...args) => {
    if (waiting) {
      return;
    }
    fn(...args);
    waiting = true;
    setTimeout(() => {
      waiting = false;
    }, limit);
  };
};

/**
 * Format a date into a human-readable string using the Intl API.
 * @param {Date | string | number} date
 * @param {Intl.DateTimeFormatOptions} [options]
 * @param {string} [locale]
 * @returns {string}
 */
export const formatDate = (
  date,
  options = { year: 'numeric', month: 'short', day: 'numeric' },
  locale = undefined,
) => new Intl.DateTimeFormat(locale, options).format(new Date(date));

/**
 * Basic email validation suitable for client-side UX (not a security check).
 * @param {string} value
 * @returns {boolean}
 */
export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());

/**
 * Return the current year (handy for footer copyright).
 * @returns {number}
 */
export const currentYear = () => new Date().getFullYear();
