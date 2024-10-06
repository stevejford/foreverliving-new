/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        'forever-orange': '#ff4d79',
        'forever-cream': '#FFF5E6',
        'forever-brown': '#8B4513',
        'forever-light': '#F9F9F9',
        'forever-dark': '#2A2A2A',
      },
    },
  },
  plugins: [],
}