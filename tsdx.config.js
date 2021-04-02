const path = require('path');
const postcssPlugin = require('rollup-plugin-postcss');

module.exports = {
  rollup(config, options) {
    config.plugins.unshift(postcssPlugin({
      extract: path.resolve('./dist/arc.css'),
      autoModules: true,
    }));

    return config;
  }
}
