const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/i, // Rule untuk file .css
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/, // Rule for font files
        type: "asset/resource", // Tells Webpack to treat these files as assets
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".css"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 3000,
  },
  mode: "development",
};
