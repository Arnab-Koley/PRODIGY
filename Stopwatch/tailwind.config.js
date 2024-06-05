/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg1' : '#1b1e24',
        'bg2' : '#22272f',
        'bg3' : '#333a45',
        'textcolor' : '#F6F7F9',
        'primary' : '#FFB300'
      },
    },
  },
  plugins: [],
}