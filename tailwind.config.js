/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css}"
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: ['Inter', 'sans-serif'],
    inter: ['Inter', 'sans-serif'], // optional
        satoshi:['Satoshi','sans-serif'],
        inter:['Inter','sans-serif'],
      },
      colors:{
        'primary-orange':'#FF5722',
      }
    },
  },
  plugins: [],
}

