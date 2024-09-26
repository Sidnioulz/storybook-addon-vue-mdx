import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Header } from './Header'

const meta: Meta<typeof Header> = {
  title: 'Example/Header',
  component: Header,
  argTypes: {
    backgroundColor: { control: 'color' },
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
}

export const LoggedOut: Story = {}
