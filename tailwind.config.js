const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      blue: '#0C55B4',
      'blue-100': '#EAF5FF',
      'gray-light': '#ECEDEF',
      'gray-lighter': '#F7F7F7',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      pink: colors.pink,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      green: colors.green,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
