/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          600: '#8B5CF6',
          700: '#7C3AED',
        },
      },
    },
  },
  plugins: [],
};