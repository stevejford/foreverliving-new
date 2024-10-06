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
        'forever-orange': '#your-orange-color-code',
        'forever-orange-dark': '#your-darker-orange-color-code',
        blue: {
          500: '#3b82f6', // Adjust this to match your exact blue shade
          600: '#2563eb', // Adjust this to match your exact blue shade
        },
      },
    },
  },
  plugins: [],
}