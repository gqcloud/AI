/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1c1c1e',
          light: '#2c2c2e',
          lighter: '#3a3a3c',
        },
        accent: {
          DEFAULT: '#fa2d48',
          hover: '#fa2d48b3',
        },
        surface: {
          DEFAULT: '#48484a',
          hover: '#5a5a5c',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
