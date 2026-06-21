/** @type {import('tailwindcss').Config} */
export default {
  // Files Tailwind scans to generate only the utilities you actually use.
  content: [
    './src/pages/**/*.html',
    './src/components/**/*.html',
    './src/js/**/*.js',
    './src/routes/**/*.js',
  ],
  // Toggle dark mode by adding the `dark` class on a parent element (usually <html>).
  darkMode: 'class',
  theme: {
    // Mobile-first breakpoints. Override defaults so every team member shares the same scale.
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
    },
    extend: {
      // Brand color palette. Reference as e.g. `bg-primary-600` or `text-accent-500`.
      colors: {
        primary: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcdaff',
          300: '#8ec3ff',
          400: '#599fff',
          500: '#3479fb',
          600: '#1f5af0',
          700: '#1745dc',
          800: '#1939b2',
          900: '#1a358c',
          950: '#142156',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d633ec',
          600: '#bb18cf',
          700: '#9c12a8',
          800: '#801289',
          900: '#6b1470',
          950: '#46004b',
        },
        ink: {
          DEFAULT: '#0f172a',
          muted: '#475569',
          soft: '#64748b',
        },
      },
      // Extra spacing tokens for larger layout rhythm.
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      // Semantic typography tokens. Each maps to a CSS variable defined in
      // src/styles/fonts.css, so families (and brands) can be re-themed
      // without touching markup or this config. The variables already carry
      // their own fallback stacks, so the values here are single-entry.
      fontFamily: {
        // `sans` is Tailwind's default body face → point it at the body role.
        sans: ['var(--font-body)'],
        display: ['var(--font-display)'], // font-display  → hero / marketing
        heading: ['var(--font-heading)'], // font-heading  → section headings
        body: ['var(--font-body)'], // font-body     → paragraphs / UI
        accent: ['var(--font-accent)'], // font-accent   → captions / labels
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        'display-sm': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgb(15 23 42 / 0.08), 0 8px 24px -4px rgb(15 23 42 / 0.08)',
        card: '0 1px 2px rgb(15 23 42 / 0.06), 0 12px 32px -12px rgb(15 23 42 / 0.18)',
      },
      maxWidth: {
        prose: '70ch',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s var(--tw-ease, cubic-bezier(0.16, 1, 0.3, 1)) both',
      },
    },
  },
  plugins: [],
};
