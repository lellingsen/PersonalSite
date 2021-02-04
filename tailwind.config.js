const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    colors: {
      gray: colors.coolGray,
      cyan: colors.cyan,
      violet: colors.violet,
      teal: colors.teal,
    },
    minWidth: {
      50: "50px",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
