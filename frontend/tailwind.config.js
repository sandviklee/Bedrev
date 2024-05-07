import { timeLog } from "console";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        whyte: ["Whyte", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        purple: {
          DEFAULT: "#1F1235",
          light: "#E2DAEB",
          lighter: "#F4EFFC",
        },
        white: {
          paper: "#F7F7F8",
          DEFAULT: "#FFFFFF",
        },
        gray: {
          DEFAULT: "#D5D5D5",
          lys: "#EDEDED",
          mork: "#838383",
        },
        red: {
          DEFAULT: "#F4493B",
          primary: "#F4493B",
          secondary: "#FFB4AE",
        },
      },
    },
  },
  plugins: [],
};
