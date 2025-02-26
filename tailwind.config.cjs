/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        // Define SFPro as the default sans font
        sans: ['"SFPro"', "system-ui", "sans-serif"],
        // Define other font options
        mono: ['"SFMono"', "monospace"],
        display: ['"SFProDisplay"', "sans-serif"],
        text: ['"SFProText"', "sans-serif"],
        semibold: ['"SFProSemibold"', "sans-serif"],
      },
      colors: {
        // Matches the pixel ring
        highlight: "#2218D6",
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        // Selection styling
        "::selection": {
          backgroundColor: "#2218D6",
          color: "white",
        },
        // Default font assignments
        body: {
          fontFamily: '"SFPro", sans-serif',
        },
        code: {
          fontFamily: '"SFMono", monospace',
        },
        h1: {
          fontFamily: '"SFProSemibold", sans-serif',
        },
      });
    },
  ],
};
