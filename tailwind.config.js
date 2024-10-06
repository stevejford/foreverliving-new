/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-beige': '#f5e6d3',
        'forever-orange': '#ff4d79',
      },
    },
  },
  plugins: [],
}