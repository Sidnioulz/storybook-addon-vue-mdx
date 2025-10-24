import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: ['@storybook/addon-docs', import.meta.resolve('./local-preset.ts')],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
}

export default config
