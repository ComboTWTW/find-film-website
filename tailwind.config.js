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
        navbarBg: '#030507',
        bgMain: '#272a30',

      }
    },
    screens: {
      sm: '340px',
      md: '768px',
      lg: '1200px',
      xl: '1440px',
    }
  },
  plugins: [],

}