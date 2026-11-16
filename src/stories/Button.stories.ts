import { fn } from 'storybook/test'

import preview from '../../.storybook/preview'
import { Button } from './Button'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = preview.meta({
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/api/arg-types
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    onClick: fn(),
  },
  tags: ['autodocs'],
  parameters: {
    myAddonParameter: `
<MyComponent boolProp scalarProp={1} complexProp={{ foo: 1, bar: '2' }}>
  <SomeOtherComponent funcProp={(a) => a.id} />
</MyComponent>
`,
  },
})

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = meta.story({
  args: {
    primary: true,
    label: 'Button',
  },
})

export const Secondary = meta.story({
  args: {
    label: 'Button',
  },
})

export const Large = meta.story({
  args: {
    size: 'large',
    label: 'Button',
  },
})

export const Small = meta.story({
  args: {
    size: 'small',
    label: 'Button',
  },
})
