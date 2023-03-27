const {
  borderRadius: defaultBorderRadius,
} = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./src/**/*.{svelte,js,ts,sass,scss,pug,html}`],
  darkMode: ['class', '[data-theme="dark"'],
  corePlugins: {
    container: false
  },
  theme: {
    borderRadius: {
      ...defaultBorderRadius,
      'base-radius': '20px',
    },
    extend: {}
  },
  plugins: [],
}
