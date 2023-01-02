const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['--font-sans', ...defaultTheme.fontFamily.sans],
        mono: ['--font-mono', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
