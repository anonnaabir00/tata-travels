/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
    './src/**/*.jsx',
    './templates/**/*.html',
    './includes/templates/**/*.php',
    './parts/**/*.html',
  ],
  theme: {
    extend: {
    },
  },
  corePlugins: {
    // Disable default colours
    preflight: false,
    colors: false,
  },
  plugins: [],
}