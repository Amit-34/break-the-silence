/**
 * Tiny DOM helper utilities.
 * Keeping these in one place avoids repeating verbose native API calls
 * and makes component code easier to read.
 */

/**
 * Query a single element.
 * @param {string} selector
 * @param {ParentNode} [scope=document]
 * @returns {Element | null}
 */
export const qs = (selector, scope = document) => scope.querySelector(selector);

/**
 * Query all matching elements as a real array.
 * @param {string} selector
 * @param {ParentNode} [scope=document]
 * @returns {Element[]}
 */
export const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

/**
 * Add an event listener and return a function that removes it.
 * Useful for cleanup in dynamic components.
 * @param {EventTarget} target
 * @param {string} type
 * @param {EventListenerOrEventListenerObject} handler
 * @param {boolean | AddEventListenerOptions} [options]
 * @returns {() => void}
 */
export const on = (target, type, handler, options) => {
  target.addEventListener(type, handler, options);
  return () => target.removeEventListener(type, handler, options);
};

/**
 * Run a callback once the DOM is parsed and ready.
 * @param {() => void} callback
 */
export const onReady = (callback) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback, { once: true });
  } else {
    callback();
  }
};

/**
 * Create an element with attributes and children in one call.
 * @param {string} tag
 * @param {Record<string, string>} [attrs]
 * @param {Array<Node | string>} [children]
 * @returns {HTMLElement}
 */
export const createEl = (tag, attrs = {}, children = []) => {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'class') {
      el.className = value;
    } else if (key === 'dataset') {
      Object.assign(el.dataset, value);
    } else {
      el.setAttribute(key, value);
    }
  });
  children.forEach((child) => {
    el.append(typeof child === 'string' ? document.createTextNode(child) : child);
  });
  return el;
};
