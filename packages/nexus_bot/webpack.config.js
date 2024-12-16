// Import path for resolving file paths
var path = require("path");
module.exports = {
  mode: "production",
  target: "node",
  devtool: false,
  // Specify the entry point for our app.
  entry: path.join(__dirname, "src/index.ts"),
  // Specify the output file containing our bundled code
  output: {
    path: __dirname,
    filename: "dist/index.js",
    libraryTarget: "commonjs"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"]
  }
};
