/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#18b2f1',
        'primary-light': '#e8f7fe',
        accent: '#0ae5ab',
        'accent-light': '#e6fcf4',
        'dark-blue': '#0a2540',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
