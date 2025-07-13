/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "brand-red": "#DC2626", // Deeper red (red-600)
        "brand-dark": "#1A1A1A",
      },
    },
  },
  plugins: [],
};
