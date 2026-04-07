const path = require("path");
const PrettierWebpackPlugin = require("../index.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./tests/src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./tests/src/index.html",
      filename: "index.html",
      minify: false,
    }),
    new PrettierWebpackPlugin(),
  ],
};
