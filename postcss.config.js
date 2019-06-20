module.exports = {
  parser: "postcss",
  map: true,
  plugins: {
    autoprefixer: {},
    "postcss-custom-media": {
      // importFrom: "src/assets/css/variables.css"
    },
    "postcss-hexrgba": {}
  }
};
