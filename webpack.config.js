/**
 * Created by erenbali on 2/13/16.
 */
module.exports = {
  entry: "./main.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  devtool: "source-map",
  module: {
    loaders: [
      { test: /\.js$/, loader: "babel-loader", exclude: ["node_modules"] },
      { test: /\.css$/, loader: "style!css" }
    ]
  }
};