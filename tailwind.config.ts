import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          50: "#e7f4f1",
          100: "#cfe9e4",
          200: "#b6ded6",
          300: "#9ed3c8",
          400: "#86c9bb",
          500: "#6ebead",
          600: "#56b39f",
          700: "#3da891",
          800: "#259d84",
          900: "#0d9276",
        },
      },
    },
  },
  plugins: [],
};
export default config;
