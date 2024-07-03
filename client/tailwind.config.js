/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        figtree: ["Figtree", "sans-serif"],
        alegreya: ["Alegreya", "serif"],
        shantellSans: ["Shantell Sans", "cursive"],
      },
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [
    require("daisyui"),
    require("tailwind-scrollbar"),
    require("@tailwindcss/forms"),
  ],
};
