import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: [
    'src/index.ts',
    'src/preset.ts',
    'src/preview.ts',
    'src/manager.ts',
    'src/jsx-runtime.ts',
  ],
  external: [
    '@storybook/builder-vite',
    '@storybook/manager-api',
    '@storybook/mdx2-csf',
    'react',
    'react/jsx-runtime',
    'vite',
    'vue',
  ],
  splitting: false,
  minify: !options.watch,
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
  },
  treeshake: true,
  sourcemap: true,
  clean: true,
  platform: 'browser',
  esbuildOptions(esOptions) {
    // eslint-disable-next-line no-param-reassign
    esOptions.conditions = ['module']
  },
}))
