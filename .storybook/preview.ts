import addonDocs from '@storybook/addon-docs'
import { definePreview } from '@storybook/react-vite'
import { createVuestic } from 'vuestic-ui'

import addonVueMdx from '../dist/index.js'

export default definePreview({
  addons: [addonDocs(), addonVueMdx()],

  /* Parameters below are just for the local Storybook instance of this package. */
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  initialGlobals: {
    backgrounds: { value: 'light' },

    /* This is how you can customise the Vue application used in MDX files. */
    vueMdx: {
      beforeVueAppMount: (app) => {
        app.use(createVuestic())
      },
    },
  },
})
