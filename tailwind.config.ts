import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#161714",
          soft: "#282a25",
          muted: "rgba(22, 23, 20, 0.72)",
        },
        paper: {
          DEFAULT: "#FAF8F3",
          pure: "#FFFFFF",
        },
        limestone: {
          DEFAULT: "#F0ECE3",
          light: "#F7F5F0",
        },
        brass: {
          DEFAULT: "#A8865D",
          hover: "#8E6F4A",
        },
        clay: {
          DEFAULT: "#A85D42",
          hover: "#8E4C34",
        },
        moss: {
          DEFAULT: "#3F5043",
        },
        line: {
          DEFAULT: "rgba(22, 23, 20, 0.16)",
          light: "rgba(250, 248, 243, 0.16)",
        },
      },
      fontFamily: {
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "Arial", "sans-serif"],
      },
      maxWidth: {
        shell: "min(90rem, calc(100vw - 3rem))",
        "shell-mobile": "min(100% - 2rem, 90rem)",
      },
      transitionTimingFunction: {
        idc: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
