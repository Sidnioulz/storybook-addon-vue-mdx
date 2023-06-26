import type { Preview } from '@storybook/react'
import { createVuestic } from 'vuestic-ui'

const preview: Preview = {
  /* This is how you can customise the Vue application used in MDX files. */
  globals: {
    vueMdx: {
      beforeVueAppMount: (app) => {
        app.use(createVuestic())
      },
    },
  },

  /* Parameters below are just for th local Storybook instance of this package. */
  parameters: {
    backgrounds: {
      default: 'light',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
