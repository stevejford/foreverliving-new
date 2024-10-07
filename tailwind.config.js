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
          500: '#4a90e2', // Adjust this to match the exact blue in the design
          600: '#2563eb', // Adjust this to match your exact blue shade
          700: '#2171d3', // Darker blue for the right side text
        },
      },
    },
  },
  plugins: [],
}