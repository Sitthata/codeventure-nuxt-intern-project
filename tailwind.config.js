/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [daisyui, require("@tailwindcss/typography")],
  daisyui: {
    themes: [],
  },
};
