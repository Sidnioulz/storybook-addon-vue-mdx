import js from '@eslint/js'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import reactPlugin from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import vuePlugin from 'eslint-plugin-vue'

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
      '.prettierrc.js',
      'commitlint.config.cjs',
    ],
  },
  js.configs.recommended,
  reactPlugin.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.cjs'],
        },
      },
    },
  },
  ...tseslint.configs.recommended,
  {
    files: ['preset.js', '.storybook/local-preset.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
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
