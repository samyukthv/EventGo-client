/** @type {import('tailwindcss').Config} */

import "@material-tailwind/react/utils/withMT";

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
      'lg': '1520px',
      
    },
    backgroundImage1:{
      "my-image":"url('./src/assets/images/bartek-garbowicz-xJeCLqsBUqc-unsplash.jpg')"
    },
    fontFamily: {
      chonburi: ['Chonburi', 'cursive'],
       'roboto-slab': ['Roboto Slab', 'serif'],
       kablammo: ['Kablammo', 'cursive'],
       monoton: ['Monoton', 'cursive'],
       vt323: ['VT323', 'monospace'],

    },
  },
  plugins: [ require("tw-elements/dist/plugin.cjs"),
  require('@tailwindcss/forms'),
  require("daisyui"),
  
]
}

