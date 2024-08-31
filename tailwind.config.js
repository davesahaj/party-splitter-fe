/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      urbanist: ['Urbanist', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
