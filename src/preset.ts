export const mdxLoaderOptions = async (config: unknown) => {
  const priorConfig = typeof config === 'object' ? (config ?? {}) : {}
  const priorMdxCompileOptions =
    'mdxCompileOptions' in priorConfig &&
    typeof priorConfig.mdxCompileOptions === 'object'
      ? (priorConfig.mdxCompileOptions ?? {})
      : {}
  const priorRemarkPlugins =
    'remarkPlugins' in priorMdxCompileOptions
      ? priorMdxCompileOptions.remarkPlugins
      : undefined

  return {
    ...priorConfig,
    mdxCompileOptions: {
      ...priorMdxCompileOptions,
      remarkPlugins: priorRemarkPlugins,
      jsxRuntime: 'automatic',
      jsxImportSource: 'storybook-addon-vue-mdx',
    },
  }
}
