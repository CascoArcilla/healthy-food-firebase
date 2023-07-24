import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "pw-green": "#2ABF40",
        "pw-lightgreen": "#5DBF17",
        "pw-lightorange": "#F2B705",
        "pw-orange": "#F28705",
        "pw-white": "#F2F2F2",
        "pw-gray": "#D9D9D9",
        "pw-black": "#262626",
      },
    },
  },
  plugins: [],
} satisfies Config;
