module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      bgColor: {
        bgPink: "#ff90e8",
      },
      boxShadow: {
        "offset-black": "2px 2px black",
        "hover-offset-black": "4px 4px black",
      },
    },
  },
  plugins: [],
};
