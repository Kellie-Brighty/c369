/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "brand-red": "#E31837",
        "brand-dark": "#1A1A1A",
      },
      fontFamily: {
        sans: ["Open Sans", "system-ui", "sans-serif"],
        display: ["Livvic", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
