import type { Config } from "tailwindcss";

const config: Config = {
  // darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        primary: {
          DEFAULT: "#4E4376",
        },
        secondary: {
          DEFAULT: "#2B5876",
        },
        primary_background: {
          DEFAULT: "#0B1217",
        },
        secondary_background: {
          DEFAULT: "#142028",
        },
        primary_foreground: {
          DEFAULT: "#23323C",
        },
        white: "#FFFBF5",
        black: "#121212",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default config;
