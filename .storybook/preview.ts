import type { Preview } from '@storybook/react'
import { createVuestic } from 'vuestic-ui'

const preview: Preview = {
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

  initialGlobals: {
    vueMdx: {
      beforeVueAppMount: (app) => {
        app.use(createVuestic())
      },
    },
  },
}

export default preview
