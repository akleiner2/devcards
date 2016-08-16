const OpenBrowserPlugin = require('open-browser-webpack-plugin');
// Plugin to insert a bunch of inputs at the top.
const AutomaticImportsPlugin = require('./AutomaticImportsPlugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    './docs/index.js',
  ],
  output: {
    path: __dirname + '/'
  },
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
    new AutomaticImportsPlugin({ pattern: "*/**/__docs__/*-doc.js" })
  ]
};
