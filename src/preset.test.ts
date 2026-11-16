import { describe, expect, it } from 'vitest'

import { mdxLoaderOptions } from './preset'

describe('mdxLoaderOptions', () => {
  it('compiles MDX with the automatic JSX runtime of this addon', async () => {
    await expect(mdxLoaderOptions(undefined)).resolves.toEqual({
      mdxCompileOptions: {
        remarkPlugins: undefined,
        jsxRuntime: 'automatic',
        jsxImportSource: 'storybook-addon-vue-mdx',
      },
    })
  })

  it('keeps options set by Storybook and other presets', async () => {
    const remarkPlugin = () => {}
    const rehypePlugin = () => {}

    await expect(
      mdxLoaderOptions({
        skipCsf: true,
        mdxCompileOptions: {
          providerImportSource: '@storybook/addon-docs/mdx-react-shim',
          remarkPlugins: [remarkPlugin],
          rehypePlugins: [rehypePlugin],
          jsxImportSource: 'react',
        },
      }),
    ).resolves.toEqual({
      skipCsf: true,
      mdxCompileOptions: {
        providerImportSource: '@storybook/addon-docs/mdx-react-shim',
        remarkPlugins: [remarkPlugin],
        rehypePlugins: [rehypePlugin],
        jsxRuntime: 'automatic',
        jsxImportSource: 'storybook-addon-vue-mdx',
      },
    })
  })
})
