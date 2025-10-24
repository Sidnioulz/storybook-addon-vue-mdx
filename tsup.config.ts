import { defineConfig, type Options } from 'tsup'

// Minimum Node version supported by Storybook 10
const NODE_TARGET = 'node20.19'

export default defineConfig(async () => {
  const packageJson = (
    await import('./package.json', { with: { type: 'json' } })
  ).default

  const {
    bundler: {
      jsxEntries = [],
      managerEntries = [],
      previewEntries = [],
      nodeEntries = [],
    },
  } = packageJson

  const commonConfig: Options = {
    /*
     keep this line commented until https://github.com/egoist/tsup/issues/1270 is resolved
     clean: options.watch ? false : true,
    */
    clean: false,
    format: ['esm'],
    treeshake: true,
    splitting: true,
    external: ['react', 'react-dom', '@storybook/icons'],
  }

  const configs: Options[] = []

  // Specific to this addon.
  if (jsxEntries.length) {
    configs.push({
      ...commonConfig,
      entry: jsxEntries,
      target: 'esnext',
      // was neutral in SB 9
      platform: 'browser',
      external: [...(commonConfig.external ?? []), 'react', 'vue'],
      dts: true,
    })
  }

  if (managerEntries.length) {
    configs.push({
      ...commonConfig,
      entry: managerEntries,
      platform: 'browser',
      target: 'esnext',
    })
  }

  if (previewEntries.length) {
    configs.push({
      ...commonConfig,
      entry: previewEntries,
      platform: 'browser',
      target: 'esnext',
      dts: true,
    })
  }

  if (nodeEntries.length) {
    configs.push({
      ...commonConfig,
      entry: nodeEntries,
      platform: 'node',
      target: NODE_TARGET,
    })
  }

  return configs
})
