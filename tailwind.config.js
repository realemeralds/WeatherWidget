module.exports = {
  darkMode: "media", // or 'media' or 'class'
  theme: {
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      DEFAULT: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5rem",
      "4xl": "2.25rem",
    },
    extend: {
      fontFamily: {
        serif: ["Helvetica Neue", "Helvetica", "Roboto", "Arial", "sans-serif"],
        pro: [
          "SF Pro Display",
          "SF Pro Icons",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        primaryAccent: "#4A1942",
        mainBG: "#0C120C",
        firstResult: "#D9D9D9",
        secondResult: "#E9E9E9",
        thirdResult: "#F8F7F7",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};