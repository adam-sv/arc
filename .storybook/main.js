const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

module.exports = {
  stories: ["../src/**/stories.tsx"],
  addons: [
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: /stories\.tsx?$/,
          include: [path.resolve(__dirname, '..', 'src')], // You can specify directories
        },
        loaderOptions: {
          prettierConfig: { printWidth: 100 },
        },
      },
    },
    '@storybook/addon-actions/register',
    '@storybook/addon-links',
    '@storybook/addon-docs',
  ],
  webpackFinal: async (config) => {
    const isEnvDevelopment = config.mode === 'development';
    const isEnvProduction = config.mode === 'production';
    // we need to resolve @adam-sv/arc
    config.resolve = {
      ...config.resolve,
      extensions: ['.ts', '.tsx', ...config.resolve.extensions],
      plugins: config.resolve.plugins ? [new TsconfigPathsPlugin(), ...config.resolve.plugins] : [new TsconfigPathsPlugin()],
      alias: {
        ...config.resolve.alias,
        // Support an internal file to load all dependencies from
        '@adam-sv/arc': path.join(__dirname, '..', 'src'),
      },
    }

    config.module.rules = config.module.rules.filter(({ test }) => {
      if (test.toString().indexOf('css') >= 0) return false;
      return !(
        test instanceof RegExp &&
        ((test && test.test('.js')) || test.test('.ts'))
      );
    });

    config.module.rules.forEach(rule => {
      const { test } = rule;
      const testString = test.toString();
      if (
        // the regex looks for \. at the start
        (testString.charAt(1) === '\\' && testString.charAt(2) === '.')
        // it is probably looking for ts (a la /[tj]sx?$/, which has 9 characters)
        && (
          testString.lastIndexOf('t') > (testString.length - 10)
          && testString.lastIndexOf('s') > (testString.length - 10)
        )
        // and it is supposed to be like /(stories|story)/ or /stories/ or /story/
        && (
          testString.indexOf('stories') > 0
          || testString.indexOf('story') > 0
        )
      ) {
        rule.test = new RegExp(`${testString.slice(3, -1)}`, test.flags);;
      }
    });

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: false,
          },
        },
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    });
    // "postcss" loader applies autoprefixer to our CSS.
    // "css" loader resolves paths in CSS and adds assets as dependencies.
    // "style" loader turns CSS into JS modules that inject <style> tags.
    // In production, we use MiniCSSExtractPlugin to extract that CSS
    // to a file, but in development "style" loader enables hot editing
    // of CSS.
    // By default we support CSS Modules with the extension .module.css
    config.module.rules.push({
      test: cssRegex,
      exclude: cssModuleRegex,
      use: getStyleLoaders({
        importLoaders: 1,
        sourceMap: isEnvProduction && config.devtool === 'source-map',
      }, isEnvDevelopment, isEnvProduction),
      // Don't consider CSS imports dead code even if the
      // containing package claims to have no side effects.
      // Remove this when webpack adds a warning or an error for this.
      // See https://github.com/webpack/webpack/issues/6571
      sideEffects: true,
    });
    // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
    // using the extension .module.css
    config.module.rules.push({
      test: cssModuleRegex,
      use: getStyleLoaders({
        importLoaders: 1,
        sourceMap: isEnvProduction && config.devtool === 'source-map',
        modules: true,
      }, isEnvDevelopment, isEnvProduction),
    });

    if (isEnvProduction) {
      config.plugins.push(new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }));
    }

    return config;
  },
};

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
// common function to get style loaders
const getStyleLoaders = (cssOptions, isEnvDevelopment, isEnvProduction) => {
  const loaders = [
    isEnvDevelopment && require.resolve('style-loader'),
    isEnvProduction && {
      loader: MiniCssExtractPlugin.loader,
      options: {},
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: { config: { path: path.join(__dirname, '..') } },
    },
  ].filter(Boolean);

  return loaders;
};
