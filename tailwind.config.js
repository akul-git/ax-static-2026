// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,ts,jsx,tsx}", // include Astro files
  ],
  theme: {
    extend: {
      colors: {
        brand: "#1b4962",
        accent: "#1e73be",
      },
       
    },
  },
  plugins: [],
}
