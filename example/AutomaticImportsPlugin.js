// This plugin dynamically adds entry points right before compile-time according to a glob string.
//
// Usage: In your webpack config, `require` the plugin, and in the "plugins" section of your
// config, instantiate the plugin as follows:
//
// new AutomaticImportsPlugin({pattern: "*/**/__docs__/*-doc.js"})

const glob = require('glob');
const path = require('path');

function AutomaticImportsPlugin(options) {
  this.pattern = options.pattern;
}

AutomaticImportsPlugin.prototype.apply = function(compiler) {
  compiler.plugin("compile", function(params) {
    const filePaths = glob.sync(this.pattern);
    filePaths.forEach(function(filePath) {
      compiler.options.entry.unshift(path.join(process.cwd(), filePath));
    });
  }.bind(this));
};

module.exports = AutomaticImportsPlugin;
