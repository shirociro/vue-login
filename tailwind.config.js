/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // scan all vue files
    "./node_modules/flowbite/**/*.js"  // include flowbite scripts
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // Flowbite plugin
  ],
};