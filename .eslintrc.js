module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jquery: true
  },
  globals: {
    window: true,
    Routing: true,
    document: true,
    navigator: false,
    importScripts: true
  },
  plugins: [
    'vue'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-new': 0,
    'generator-star-spacing': 0,
    'space-before-function-paren': 0,
    'indent': 0,
    'no-useless-escape': 0,
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};
