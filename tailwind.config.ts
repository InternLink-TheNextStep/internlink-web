import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./components/**/*.vue", "./layouts/**/*.vue", "./pages/**/*.vue"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};

export default config;
