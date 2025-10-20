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

      },
      fontSize: {

      },
    },
  },
  plugins: [daisyui],
};

export default config;
