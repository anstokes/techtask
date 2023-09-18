/**
 * ESLint configuration.
 * @see https://eslint.org/docs/user-guide/configuring
 */

module.exports = {
  // Target environments.
  // This determines which host APIs can be used in our code.
  env: {
    es6: true,
    node: true,
    mocha: true,
  },

  // Our JS coding conventions are based on Airbnb JS Style,
  // with some tweaks (see `rules`).
  // @see https://github.com/airbnb/javascript
  extends: ['airbnb-base', 'airbnb-typescript/base'],

  // When the `eslint` CLI command is run, it is set to process all JavaScript
  // within this project's root directory. Add glob patterns here to exlude
  // certain file paths from being linted.
  ignorePatterns: ['dist/', 'node_modules/'],

  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },

  // Overrides for JS Style.
  // @see https://eslint.org/docs/rules/
  rules: {
    // Allow console, for debugging
    'no-console': 'off',
  },

  settings: {
  },
};
