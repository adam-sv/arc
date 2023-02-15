module.exports = {
  configs: {
    recommended: {
      extends: [
        /* Recommended setup from https://www.npmjs.com/package/@typescript-eslint/eslint-plugin */
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        /* End of recommended setup from https://www.npmjs.com/package/@typescript-eslint/eslint-plugin */
        'plugin:react/recommended', // recommended react setup
        'prettier', // prevents eslint from conflicting with prettier
      ],
      env: {
        node: true,
        browser: true,
      },
      parser: '@typescript-eslint/parser', // Specifies the ESLint parser
      parserOptions: { ecmaVersion: 2020, project: './tsconfig.json' },
      plugins: ['@adam-sv/eslint-plugin', 'react-hooks'],
      overrides: [
        {
          files: ['**/**/.test.{j,t}s?(x)'],
          env: { jest: true },
        },
      ],
      rules: {
        camelcase: 'off', // turns off default camelcase rule, to pass to typescript rule, so we can provide a warning instead of an error. Not possible with the default camelcase rule.
        'class-methods-use-this': 0, // 0: off - if on, requires `static` on class methods that don't contain a usage of `this`
        'func-names': [2, 'as-needed'], // as needed - requires function expressions to have a name, if the name isn't assigned automatically per the ECMAScript specification.
        'import/prefer-default-export': 'off', // don't prefer a default export, so we limit this happening: `import Something, { SomethingElse } from './somewhere'`
        'jsx-quotes': ['warn', 'prefer-single'], // prefer single quotes in jsx templates
        'no-console':
          process.env.NODE_ENV === 'production'
            ? ['error', { allow: ['info', 'error'] }]
            : ['warn', { allow: ['info', 'error'] }],
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn', // gives debugger warnings if used in production
        'no-param-reassign': 0, // 0 - off - allow reassignment of function parameters, to set a default for example
        'no-trailing-spaces': 'error', // gets rid of unnecessary whitespace
        'no-underscore-dangle': ['error'], // dangling underscores are unnecessary, confusing and ugly
        'no-unreachable': 1, // 1: Warning - Warns about unreachable code
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
        'react/react-in-jsx-scope': 'off', // suppress errors for missing 'import React' in files
        'react/jsx-filename-extension': [
          1,
          { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        ], // allow jsx syntax in js files (for next.js project)
        'prefer-const': 'error', // prefer const over let or var
        quotes: [
          // prefer single quotes, as per prettier setup
          'error',
          'single',
          {
            allowTemplateLiterals: true, // allows backticks like `${'this'}`
            avoidEscape: true, // allows "'This'", as required, to avoid needing '\'This\''
          },
        ],
        semi: [2, 'always'], // 2: error - always use semi colons
        // not working right now? versioning?
        // '@typescript-eslint/camelcase': ['warn'], // gives a warning about camel case
        '@typescript-eslint/naming-convention': [
          'error',
          {
            // Enforces interface names starting with an I
            // to denote they are not a class or a type
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: '^I[A-Z]',
              match: true,
            },
          },
        ],
        '@typescript-eslint/no-floating-promises': [1, { ignoreVoid: true }],
        '@typescript-eslint/unbound-method': [1, { ignoreStatic: true }],
        '@typescript-eslint/no-explicit-any': [1, { ignoreRestArgs: true }],
        '@typescript-eslint/no-unsafe-member-access': 1,
        '@typescript-eslint/restrict-template-expressions': 1,
        '@typescript-eslint/no-unsafe-assignment': 1,
        '@typescript-eslint/no-unsafe-call': 1,
        '@typescript-eslint/no-unsafe-return': 1,
        '@typescript-eslint/no-unused-vars': [1, { args: 'after-used' }],
      },
      settings: { 'import/resolver': { node: {} } },
    },
  },
};
