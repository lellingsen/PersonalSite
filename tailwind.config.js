const colors = require("tailwindcss/colors")

module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    options: {
      // Make sure added classes from gatsby-remark-classes are included
      safelist: [
        "list-disc",
        "list-decimal",
        "list-outside",
        "pl-4",
        "mb-4",
        "text-4xl",
        "text-3xl",
        "text-2xl",
        "mt-8",
      ],
    },
  },
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
    maxWidth: {
      "1/2": "50%",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
