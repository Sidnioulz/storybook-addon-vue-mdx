# Storybook Addon Vue support for MDX

Use Vue components inside MDX files, as if they were React components.

## Limitations

This addon is in its early stages, the following limitations apply:

- Only works with Vue 3 and Storybook 11 (for Storybook 7, use v0.1.5, for Storybook 8, use v1.0.6, for Storybook 9, use v2.x, for Storybook 10, use v3.x)
- Components must be locally imported into MDX files
- Provide/Inject has not been tested yet but should work
- **Customisation APIs may change in the future**

There is also a known bug when running Storybook locally. Sometimes, the first page load of a MDX page with Vue components can crash because Storybook does not properly execute the code defined in `beforeVueAppMount`. This is probably due to how Storybook parses and runs the preview file, but the bug does not occur at all in production builds. You can work around this bug by refreshing the browser tab once, and it will successfully run on the second load.

## Installation

Run the following command to install the addon and register it in your Storybook configuration:

```sh
npx storybook add storybook-addon-vue-mdx
```

### Manual installation

First, install the package:

```sh
npm install --save-dev storybook-addon-vue-mdx
```

Then, register it as an addon in `.storybook/main.ts`:

```ts
// Replace your-framework with the framework you are using (e.g., vue3-vite)
import { defineMain } from '@storybook/your-framework/node'

export default defineMain({
  // ...rest of config
  addons: [
    '@storybook/addon-docs',
    'storybook-addon-vue-mdx', // 👈 register the addon here
  ],
})
```

Finally, register the addon's preview annotations in `.storybook/preview.ts`:

```ts
// Replace your-framework with the framework you are using (e.g., vue3-vite)
import { definePreview } from '@storybook/your-framework'
import addonVueMdx from 'storybook-addon-vue-mdx'

export default definePreview({
  // ...rest of preview
  addons: [addonVueMdx()], // 👈 register the addon here
})
```

## Usage

In a `Sample.mdx` file, import the component you need, and use it using Vue JSX syntax:

```mdx
import MyComponent from 'path-to-components/MyComponent.vue'

<MyComponent>bla bla</MyComponent>
```

The Vue JSX syntax is [documented by Vue](https://vuejs.org/guide/extras/render-function.html#jsx-tsx). Pay particular attention to [the syntax for passing slots](https://vuejs.org/guide/extras/render-function.html#passing-slots).

## Customising the Vue app context

This addon uses [veaury](https://github.com/devilwjp/veaury) to render Vue components in a React JSX context. In particular, the addon calls `applyPureVueInReact`. You may pass options to this function by defining the `vueMdx` global in `initialGlobals`, in your `.storybook/preview.ts` file, like so:

```ts
export default definePreview({
  addons: [addonVueMdx()],
  initialGlobals: {
    vueMdx: {
      beforeVueAppMount(app) {
        app.use(myCustomPlugin)
      },
    },
  },
})
```

When the addon is registered with `addonVueMdx()`, these options are type-checked, and `app` is typed as a Vue `App`. The `VueMdxOptions` type is also exported by the package.

You may also directly import and use Veaury's `applyVueInReact` as per Veaury's [own documentation](https://github.com/devilwjp/veaury).

## Development scripts

- `pnpm start` builds the addon in watch mode and starts Storybook
- `pnpm build` builds and packages the addon code
- `pnpm typecheck` type-checks the addon and the local Storybook (run `pnpm build` first)
- `pnpm test` runs the unit tests with Vitest
- `pnpm lint` and `pnpm format` check the code with ESLint and Prettier
- `pnpm pack:local` makes a local tarball to be used as a NPM dependency elsewhere

## Bug reports

Before reporting a bug, please thoroughly check Veaury's documentation and list of issues for matching issues.

To report a bug, please use GitHub issues on this repository, making sure to include a working Minimal Working Example. For instance, you could use [storybook.new](https://new-storybook.netlify.app/) to bootstrap a reproduction environment.

### Migrating to a later Storybook version

If you want to migrate the addon to support the latest version of Storyboook, you can check out the [addon migration guide](https://storybook.js.org/docs/addons/addon-migration-guide).
