/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/renderer/**/*.{ts,tsx,js,jsx}',
    './src/main/**/*.{ts,js}',
    './src/renderer/index.ejs',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

