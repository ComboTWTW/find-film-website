/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
    "../src/*.{js,ts,jsx,tsx}",
    
  ],
  theme: {
    extend: {
      colors: {
        bgMain: '#100e19',
        darkLighter: '#312b45',
        lightGray: '#878c9b',
      }
    },
    screens: {
      profileMd: '900px',
      sm: '320px',
      md: '768px',
      lg: '1200px',
      xl: '1440px',
    }
  },
  plugins: [],

}