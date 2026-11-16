import js from '@eslint/js'
import eslintReact from '@eslint-react/eslint-plugin'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import storybook from 'eslint-plugin-storybook'
import vuePlugin from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: [
      '.github/dependabot.yml',
      '!.*',
      'dist/',
      'scripts/',
      '*.tgz',
      'coverage/',
      'node_modules/',
      'storybook-static/',
      'build-storybook.log',
      '.DS_Store',
      '.env',
      '.idea',
      '.vscode',
      '.lintstagedrc.cjs',
      'commitlint.config.cjs',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    ...eslintReact.configs['recommended-typescript'],
  },
  ...vuePlugin.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vuePlugin.parser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  ...storybook.configs['flat/recommended'],
  {
    rules: {
      'line-comment-position': 'error',
      'newline-before-return': 'error',
      'no-console': 'error',
      'no-debugger': 'error',
      'no-param-reassign': 'error',
      'no-underscore-dangle': 'off',
    },
  },
  prettierRecommended,
]
