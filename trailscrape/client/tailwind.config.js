const colors = require('tailwindcss/colors')

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  variants: {
    extend: {
      padding: ['first', 'last'],
    }
  },
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['montserrat', defaultTheme.fontFamily.sans]
    },
    screens: {
      'xs': '380px',
      ...defaultTheme.screens
    },
  },
  plugins: [],
}