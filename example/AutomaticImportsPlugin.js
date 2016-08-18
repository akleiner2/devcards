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
