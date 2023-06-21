/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#dad7cd',
        'accent': '#a3b18a',
        'text': '#588157',
        'secondary': '#3a5a40',
        'dark-bg': '#344e41',
      },
      fontFamily: {
        pop: "'Poppins', sans-serif",
      },
    },   
  },
  plugins: [],
};
