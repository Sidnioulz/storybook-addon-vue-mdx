// FIXME: failing to build with proper type set.
// import type { CompileOptions } from '@storybook/mdx2-csf';
// export const mdxLoaderOptions = async (config: CompileOptions) => {
export const mdxLoaderOptions = async (config: any) => ({
  ...config,
  mdxCompileOptions: {
    remarkPlugins: config?.mdxCompileOptions?.remarkPlugins,
    jsxRuntime: 'automatic',
    jsxImportSource: 'storybook-addon-vue-mdx',
    // TODO: support Provide/Inject better, check the following keys:
    // providerImportSource
    // useMDXComponents
  },
})
