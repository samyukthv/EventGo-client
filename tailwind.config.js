/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1400px',
      
    },
    backgroundImage1:{
      "my-image":"url('./src/assets/images/bartek-garbowicz-xJeCLqsBUqc-unsplash.jpg')"
    }
  },
  plugins: [ require("tw-elements/dist/plugin.cjs"),
  require('@tailwindcss/forms')],
}

