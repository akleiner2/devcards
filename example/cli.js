#!/usr/bin/env node
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const glob = require('glob');
const fs = require('fs');
const rc = JSON.parse(fs.readFileSync(glob.sync('.devcardsrc')[0]));

let config;
let src;

const options = {};

let isUsingDefaultConfig = true;

if (!rc.length) {
  // Default back to the standard config
  config = require('./webpack.config.js');
}

let configPath;

if (rc.config) {
  configPath = glob.sync(rc.config);

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
  const entry = glob.sync(rc.entry)[0];
  if (!entry.length) {
    throw new Error('Unable to find entry point');
  } else {
    options.entry = entry;
  }
}

if (!isUsingDefaultConfig) {
  if (!config.plugins) {
    config.plugins = [];
  }

  const AutomaticImportsPlugin = require('./AutomaticImportsPlugin');
  config.plugins.push(new AutomaticImportsPlugin({ pattern: options.docFormat }));
  config.entry.push(options.entry);
}

const compiler = webpack(config);

const server = new WebpackDevServer(compiler);

server.listen(8080, "localhost", function() {});
