/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50', // Green
        secondary: '#2196F3', // Blue
      },
      fontFamily: {
        sans: ['Roboto Slab', 'serif'], // Add Roboto Slab here
      },
    },
  },
  plugins: [],
}
