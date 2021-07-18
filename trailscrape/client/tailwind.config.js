const colors = require('tailwindcss/colors')

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  variants: {
    extend: {
      padding: ['first', 'last'],
      display: ['group-hover']
    }
  },
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    safelist: ['md:grid-cols-1', 'md:grid-cols-2']
  },
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