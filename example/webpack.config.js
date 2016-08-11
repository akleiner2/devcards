const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    './docs/index.js',
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!devcards)/,
        loader: 'babel',
      },
    ],
  },
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:8080/' }),
  ]
};
