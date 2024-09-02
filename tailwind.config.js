/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      urbanist: ['Urbanist', 'sans-serif'],
    },
    extend: {},
    animation: {
      fade: 'fade 500ms ease-in-out',
    },
    keyframes: {
      fade: {
        '0%, 100%': {
          opacity: '0%',
        },
        '100%': {
          opacity: '100%',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
