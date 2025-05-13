import type { Preview } from '@storybook/react'
import { createVuestic } from 'vuestic-ui'

const preview: Preview = {
  /* Parameters below are just for th local Storybook instance of this package. */
  parameters: {
    backgrounds: {
      default: 'light',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  /* This is how you can customise the Vue application used in MDX files. */
  initialGlobals: {
    vueMdx: {
      beforeVueAppMount: (app) => {
        app.use(createVuestic())
      },
    },
  },
}

export default preview
