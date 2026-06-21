// PostCSS pipeline. postcss-cli and the Tailwind toolchain both read this file.
// `postcss-import` lets us split CSS across files and @import them in main.css.
// `cssnano` only runs for production builds (NODE_ENV=production) to minify output.
const isProduction = process.env.NODE_ENV === 'production';

export default {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(isProduction
      ? {
          cssnano: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
        }
      : {}),
  },
};
