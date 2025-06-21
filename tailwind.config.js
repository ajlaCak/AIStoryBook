/** @type {import('tailwindcss').Config} */
const {heroui} = require("@heroui/react");
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui({
    themes: {
      light: {
        // ...
        colors: {
          primary:{
            DEFAULT:"#D94F4F"
          }
        },
      },
      dark: {
        // ...
        colors: {},
      },
      // ... custom themes
    },
  })],
};
