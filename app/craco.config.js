const path = require('path');
const CracoAlias = require('craco-alias');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const pathToARC = path.join(__dirname, '..', 'lib', 'src');

      // // Even though we sym-linked ARC into 'src/lib', we end up "seeing" these files elsewhere too
      // // i.e. at ../lib/src instead of src/lib
      // // Tell babel-loader to include the pathToARC
      webpackConfig.module.rules[1].oneOf =
        webpackConfig.module.rules[1].oneOf.map((rule) => {
          if (!rule.include) {
            return rule;
          }
          if (typeof rule.include === 'string') {
            rule.include = [rule.include, pathToARC];
          } else {
            console.log('unknown rule:', rule);
            throw new Error('Unknown rule.include statement');
          }
          return rule;
        });

      // Ensure ModuleScopePlugin accepts where ARC is
      const moduleScopePluginInstance = webpackConfig.resolve.plugins[0];
      moduleScopePluginInstance?.appSrcs.push(pathToARC);

      return webpackConfig;
    },
    resolve: {
      symlinks: true, // should work... appears to do nothing
    },
    plugins: [
      new StyleLintPlugin({
        files: [
          'src/**/*.scss',
          // for some reason, we need to point directly at the lib files here
          // to get stylelint to pick up files from the lib on hot reload.
          // In other words, it works as expected on first run, but upon hot reloading,
          // changes made inside /lib/ are not re-linted, so errors don't appear, or disappear.
          '../lib/src/**/*.scss',
        ],
      }),
    ],
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: '.',
        /* tsConfigPath should point to the file where "baseUrl" and "paths"
          are specified*/
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
};
