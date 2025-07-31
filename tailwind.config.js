/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      white: "#FFFFFF",
      blue: "#004aad",
      purple: "#7e5bef",
      red: "#c30000",
      orange: "#f97316",
      green: "#15803d",
      yellow: "#F5A524",
      gold: "#f6c75e",
      black: "#171717",
      bg: "#000000",
      gray: "#d1d5db",
      zinc: "#52525b",
    },
    spacing: {
      0: "0",
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      11: "2.75rem",
      12: "3rem",
      14: "3.5rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      28: "7rem",
      32: "8rem",
      36: "9rem",
      40: "10rem",
      44: "11rem",
      48: "12rem",
      52: "13rem",
      56: "14rem",
      60: "15rem",
      64: "22rem",
      72: "28rem",
      80: "35rem",
      96: "50rem",
      px: "1px",
      0.5: "0.125rem",
      1.5: "0.375rem",
      2.5: "0.625rem",
      3.5: "0.875rem",
    },
    extend: {},
  },
  plugins: [],
};
