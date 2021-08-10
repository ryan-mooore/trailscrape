const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  // theme: {
  //   borderRadius: {
  //     'none': '0px',
  //     DEFAULT: '4px',
  //     'card': '12px'
  //   }
  // },
  variants: {
    extend: {
      padding: ['first', 'last'],
      display: ['group-hover']
    }
  },
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    safelist: [
      'md:grid-cols-1', 'md:grid-cols-2',
    'bg-gray-500', 'bg-red-500', 'bg-yellow-500', 'bg-green-500'
    ]
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