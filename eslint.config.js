// ESLint 9+ "flat config" (the modern, recommended format).
// This is the configuration ESLint uses by default when present.
// A legacy `.eslintrc.json` is also included for ESLint 8 / tooling that
// still expects the old format, but this file takes precedence.
import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  // Ignore generated and vendored output.
  {
    ignores: ['dist/**', 'node_modules/**', 'src/assets/**'],
  },

  // Base recommended rules for all JS files.
  js.configs.recommended,

  // Project-specific language options and rule tweaks.
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
    },
  },

  // Node environment for build tooling and config files.
  {
    files: ['scripts/**/*.{js,mjs}', '*.config.js', '*.config.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },

  // Disable stylistic rules that conflict with Prettier. Keep this LAST.
  prettier,
];
