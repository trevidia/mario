/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cultured': '#F3F5F7',
        'gunmetal': '#232C33'
      }
    },
  },
  plugins: [],
}
