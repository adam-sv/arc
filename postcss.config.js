const postcss = require('postcss');
const postcssNormalize = require('postcss-normalize');
const chroma = require('chroma-js');

const mixins = {
  /* Right now, we have no way to add a hover / disabled version of a color
   * In CSS: @mixin themify color-name #212121
   * After PostCSS, will resolve to:
      body {
        --color-name: #212121;
        --color-name-hover: color(#212121 shade(23%));
        --color-name-disabled: color(#212121 a(40%));
      }
   * then PostCSS-color-function will darken the shade one and resolve the other one to rgba(x, x, x, 0.4)
   */
  themify(mixin, stringArgs) {
    const [name, hex] = stringArgs.split(' ');
    const variants = [
      { suffix: '', affect: (x) => x },
      { suffix: '-hover', affect: (x) => `color(${x} shade(23%))` },
      { suffix: '-disabled', affect: (x) => `color(${x} a(40%))` },
      { suffix: '-rgb', affect: (x) => chroma(hex).rgb().join(',') },
    ];

    const rule = postcss.rule({ selector: 'body' });

    variants.forEach(v => {
      rule.append({
        prop: `--${name}${v.suffix}`,
        value: v.affect(hex),
      });
    });

    mixin.replaceWith(rule);
  },

  /* once you've created your color automatically, it is available via
   * --blue, --blue-hover, --blue-disabled, --blue-rgb, etc
   * now to expose it as var(--primary), you call
   * @mixin mapToTheme primary blue
   * to get var(--blue) available via var(--primary)
   */
  mapToTheme(mixin, stringArgs) {
    const [themeKey, colorName] = stringArgs.split(' ');
    const variants = [
      { key: '', value: (x) => `--${x}` },
      { key: '-hover', value: (x) => `--${x}-hover` },
      { key: '-disabled', value: (x) => `--${x}-disabled` },
      { key: '-rgb', value: (x) => `--${x}-rgb` },
    ];

    const rule = postcss.rule({ selector: 'body' });

    variants.forEach(v => {
      rule.append({
        prop: `--${themeKey}${v.key}`,
        value: `var(${v.value(colorName)})`,
      });
    });

    mixin.replaceWith(rule);
  },

  /* names greys and maps them to the theme */
  greys(mixin, stringArgs) {
    const greys = stringArgs.split(' ');

    const rule = postcss.rule({ selector: ':root' });

    const white = greys[0];
    const black = greys[greys.length - 1];

    greys.forEach((hex, index) => {
      rule.append({
        prop: `--grey-${index}`,
        value: hex,
      });

      rule.append({
        prop: `--grey-${index}-hover`,
        value: `color(${hex} shade(23%))`,
      });

      rule.append({
        prop: `--grey-${index}-rgb`,
        value: chroma(hex).rgb().join(','),
      });
    });

    mixin.replaceWith(rule);
  },
};

module.exports = {
  ident: 'postcss',
  plugins: [
    require('postcss-mixins')({ mixins }),
    require('postcss-nested'),
    require('postcss-flexbugs-fixes'),
    require('postcss-strip-inline-comments'),
    require('postcss-color-function'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
    // Adds PostCSS Normalize as the reset css with default options,
    // so that it honors browserslist config in package.json
    // which in turn let's users customize the target behavior as per their needs.
    postcssNormalize(),
  ],
  sourceMap: true,
};
