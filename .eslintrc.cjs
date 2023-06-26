module.exports = {
  env: {
    es6: true,
    node: true,
  },

  root: true,

  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],

  plugins: ['@typescript-eslint'],

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.cjs'],
      },
    },
  },

  rules: {
    'line-comment-position': 'error',
    'newline-before-return': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    'no-param-reassign': 'error',
    'no-underscore-dangle': 'off',
    'import/extensions': ['error', 'never'],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '.storybook/*',
          '*.config.js',
          '*.config.cjs',
          '*.config.ts',
          '.*rc.js',
          '.*rc.cjs',
          'src/stories/*',
        ],
        packageDir: ['.'],
      },
    ],
  },

  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      rules: {
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
}
