import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: ["./components/**/*.vue", "./layouts/**/*.vue", "./pages/**/*.vue"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#1294D4",
          light: "#3BB7F2",
          dark: "#0D6E9E",
        },
        secondary: {
          DEFAULT: "#28A745",
          light: "#00C851",
          dark: "#1E7E34",
        },
        tertiary: {
          DEFAULT: "#343A40",
          light: "#F8F9FA",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [daisyui, require("@tailwindcss/typography")],
  daisyui: {
    themes: false,
    base: false,
  },
};

export default config;
