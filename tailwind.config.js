/**@type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mini: { max: "1000px" },
    },
    extend: {
      height: {
        "screen-minus-header": "calc(100vh - 4rem)",
      },
      fontFamily: {
        figtree: ["Figtree", "sans-serif"],
      },
    },
  },
  plugins: [],
};
