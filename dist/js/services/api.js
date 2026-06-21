/**
 * Example API service.
 *
 * A thin, reusable wrapper around fetch that:
 *   - prefixes a configurable base URL
 *   - sets JSON headers
 *   - parses responses and throws typed errors on failure
 *   - supports request timeouts via AbortController
 *
 * Swap BASE_URL for your real backend (or inject it at build time).
 */

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const DEFAULT_TIMEOUT = 10_000;

/** Error thrown for non-2xx responses, carrying the status code and payload. */
export class ApiError extends Error {
  constructor(message, { status, data } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Core request function.
 * @param {string} endpoint - Path appended to BASE_URL, e.g. "/posts".
 * @param {RequestInit & { timeout?: number }} [options]
 * @returns {Promise<any>}
 */
async function request(endpoint, { timeout = DEFAULT_TIMEOUT, headers, ...options } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers,
      },
      ...options,
    });

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const payload = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      throw new ApiError(`Request failed with status ${response.status}`, {
        status: response.status,
        data: payload,
      });
    }

    return payload;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new ApiError('Request timed out', { status: 408 });
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

/** Convenience verbs. */
export const api = {
  get: (endpoint, options) => request(endpoint, { method: 'GET', ...options }),
  post: (endpoint, body, options) =>
    request(endpoint, { method: 'POST', body: JSON.stringify(body), ...options }),
  put: (endpoint, body, options) =>
    request(endpoint, { method: 'PUT', body: JSON.stringify(body), ...options }),
  patch: (endpoint, body, options) =>
    request(endpoint, { method: 'PATCH', body: JSON.stringify(body), ...options }),
  delete: (endpoint, options) => request(endpoint, { method: 'DELETE', ...options }),
};

/**
 * Domain-specific helper built on top of the generic client.
 * Demonstrates how to organize feature-level API calls.
 * @param {number} [limit=3]
 * @returns {Promise<Array<{ id: number, title: string, body: string }>>}
 */
export const fetchSamplePosts = async (limit = 3) => {
  const posts = await api.get('/posts');
  return posts.slice(0, limit);
};
