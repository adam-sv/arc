module.exports = {
  ignoreFiles: ['public', 'build', 'dist', 'cypress', 'node_modules', 'config'],
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss',
    'stylelint-config-recess-order',
  ],
  rules: {
    indentation: 2,
    'max-empty-lines': 1,
    'selector-class-pattern': '^[a-zA-Z][a-zA-Z0-9]*(-[a-zA-Z0-9]*)*',
    'custom-property-pattern': '[a-zA-Z0-9]*', // anything
    'declaration-block-no-redundant-longhand-properties': [
      true,
      { ignoreShorthands: ['/flex/', 'grid-template'] },
    ],
    'max-line-length': [100, { ignore: 'comments' }],
    'block-opening-brace-space-before': 'always',
    'no-descending-specificity': null,
    'block-closing-brace-newline-before': null,
    'scss/double-slash-comment-empty-line-before': null,
    'block-closing-brace-space-before': 'always-single-line',
    'block-opening-brace-newline-after': ['always'],
    'block-opening-brace-space-after': 'always-single-line',
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-semicolon-space-after': 'always-single-line',
    'function-whitespace-after': 'always',
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'after-single-line-comment'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
  },
};
