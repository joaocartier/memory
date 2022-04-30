module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#152938",
          100: "#dfe7ec",
          400: "#6395b8",
          600: "#304859",
          900: "#152938",
        },
        secondary: {
          DEFAULT: "rgb(188, 206, 217)",
          700: "rgb(188, 206, 217)",
          900: "rgb(113, 145, 165)",
        },
        accent: "#fda214",
      },
    },
  },
  plugins: [],
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],
};
