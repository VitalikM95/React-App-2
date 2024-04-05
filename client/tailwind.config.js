/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: { DEFAULT: '#5D6481', light: '#F3F4F6', middle: '#E1E3EA' },
      },
      borderWidth: {
        3: '3px',
        5: '5px',
        10: '10px',
      },
    },
  },
  plugins: [],
}
