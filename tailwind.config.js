/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    colors: {
      'primary': '#4ADE80',
      'dark': '#242526',
      'lighter-dark': '#393B3C',
      'secondary': '#333333',
      'light': '#dddddd',
      'white': '#f3f3f3',
      'transparent': 'transparent',
      'green': '#00CE7A',
      'red': '#FF6874',
      'orange': '#FFBD3F'
    },
    extend: {},
  },
  plugins: [],
}