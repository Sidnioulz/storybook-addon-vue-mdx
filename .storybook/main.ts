import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '../preset.js',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal(viteConfig) {
    const localConfig = {
      resolve: {
        alias: {
          'storybook-addon-vue-mdx': process.env.INIT_CWD,
        },
      },
    }

    return mergeConfig(viteConfig, localConfig)
  },
}

export default config
