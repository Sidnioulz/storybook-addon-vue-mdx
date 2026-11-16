import { within, userEvent } from 'storybook/test'

import preview from '../../.storybook/preview'
import { Page } from './Page'

const meta = preview.meta({
  title: 'Example/Page',
  component: Page,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
})

export const LoggedOut = meta.story()

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const LoggedIn = meta.story({
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const loginButton = canvas.getByRole('button', {
      name: /Log in/i,
    })
    await userEvent.click(loginButton)
  },
})
