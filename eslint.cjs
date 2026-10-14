module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:storybook/recommended',
  ],
  ignorePatterns: [
    './dist',
    './.eslintrc.cjs',
    './build',
    './types',
    './public',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',

    'no-undef': 'off',
    'no-debugger': 'warn',
    'no-redeclare': 'warn',
    'no-unreachable': 'warn',
    'no-unused-vars': 'off',
    'no-empty-function': 'warn',
    'no-empty-pattern': 'warn',
    'no-async-promise-executor': 'warn',
    'no-useless-catch': 'off',
    'no-extra-semi': 'off',

    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-unsafe-function-type': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'react-hooks'],
}
