#!/usr/bin/env node
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const glob = require('glob');
// const config = require('./webpack.config.js');
const rc = glob.sync('.devcardsrc');

let config;
let src;

const options = {};

let isUsingDefaultConfig = true;

if (!rc.length) {
  config = require('./webpack.config.js');
}

// Check if there's a `config` key
if (rc.config) {
  const configPath = glob.sync(rc.config);

  if (!configPath.length) {
    throw new Error('Please specify a `config` key with a proper path. The `.devcardsrc` file should be proper JSON.');
  } else if (configPath.length > 1) {
    throw new Error('Please specify only one `webpack.config` file.');
  }
} else {
  config = require(configPath[0]);
  isUsingDefaultConfig = false;
}

// Check if there's a `format` key
if (rc.docFormat) {
  options.docFormat = rc.docFormat;
}

// Check if there's an entry point provided in the .devcardsrc file
if (rc.entry) {
  // If there is, then go ahead, glob for that file, check if it exists, if no - throw a helpful error
  const entries = glob.sync(rc.entry);
  if (!entry.length) {
    throw new Error('Unable to find entry point');
  } else {
    options.entry = rc.entry;
  }
}

if (!isUsingDefaultConfig) {
  const AutomaticImportsPlugin = require('./AutomaticImportsPlugin');

  if (!config.plugins) {
    config.plugins = [];
  }

  config.plugins.push(new AutomaticImportsPlugin({ options.docFormat }));
  config.entry.push(options.entry);
}

const compiler = webpack(config);

const server = new WebpackDevServer(compiler);

server.listen(8080, "localhost", function() {});
