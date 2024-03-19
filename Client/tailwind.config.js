/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#38B6FF',
        secondary: '#3366FF',
        accent: '#FFCC00',
      },
    },
  },
  plugins: [],
}