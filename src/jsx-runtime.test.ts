import { act, type ReactNode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockInstance,
} from 'vitest'
import { Fragment as VueFragment } from 'vue'

import StylelessButton from './components/StylelessButton.vue'
import DemoTag from './components/Tag.vue'
import { Fragment, jsx, jsxDEV, jsxs } from './jsx-runtime'

type TestGlobals = typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT?: boolean
  __STORYBOOK_PREVIEW__?: unknown
}

const testGlobals = globalThis as TestGlobals
testGlobals.IS_REACT_ACT_ENVIRONMENT = true

let container: HTMLDivElement
let root: Root
let consoleError: MockInstance<typeof console.error>

const render = async (element: ReactNode) => {
  await act(async () => root.render(element))
}

const keyWarnings = () =>
  consoleError.mock.calls.filter(([message]) =>
    String(message).includes('unique "key"'),
  )

const listItems = () => [
  jsx('li', { children: 'First' }),
  jsx('li', { children: 'Second' }),
]

beforeEach(() => {
  consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
  container = document.createElement('div')
  document.body.append(container)
  root = createRoot(container)
})

afterEach(async () => {
  await act(async () => root.unmount())
  container.remove()
  delete testGlobals.__STORYBOOK_PREVIEW__
  vi.restoreAllMocks()
})

describe('jsx runtime', () => {
  it('renders intrinsic elements and React components as React would', async () => {
    const Greeting = ({ name }: { name: string }) =>
      jsx('p', { children: `Hello ${name}` })

    await render(jsx(Greeting, { name: 'MDX' }))

    expect(container.innerHTML).toBe('<p>Hello MDX</p>')
  })

  it('renders Vue components with their props', async () => {
    await render(jsx(DemoTag, { label: 'test' }))

    const tag = container.querySelector('span.tag')
    expect(tag?.textContent).toBe('test')
  })

  it('passes children as the default slot and listeners as Vue events', async () => {
    const onClick = vi.fn()

    await render(jsx(StylelessButton, { onClick, children: 'Click me' }))

    const button = container.querySelector('button')
    expect(button?.textContent).toBe('Click me')
    await act(async () => button?.click())
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders Vue fragments as React fragments', async () => {
    await render(
      jsx(VueFragment, { children: jsxs('ul', { children: listItems() }) }),
    )

    expect(container.innerHTML).toBe('<ul><li>First</li><li>Second</li></ul>')
  })

  it('exports React fragments for MDX fragments', async () => {
    await render(jsxs(Fragment, { children: listItems() }))

    expect(container.innerHTML).toBe('<li>First</li><li>Second</li>')
  })

  it('calls beforeVueAppMount from the vueMdx initial global with the Vue app', async () => {
    const beforeVueAppMount = vi.fn()
    testGlobals.__STORYBOOK_PREVIEW__ = {
      storyStoreValue: {
        userGlobals: { initialGlobals: { vueMdx: { beforeVueAppMount } } },
      },
    }

    await render(jsx(DemoTag, { label: 'test' }))

    expect(beforeVueAppMount).toHaveBeenCalledOnce()
    expect(beforeVueAppMount).toHaveBeenCalledWith(
      expect.objectContaining({
        use: expect.any(Function),
        mount: expect.any(Function),
      }),
    )
  })

  /*
   * MDX components return their content as a fragment of static children.
   * React reports missing keys once per parent component, so each test
   * renders its own component.
   */
  describe('keys', () => {
    it('does not require keys on static children created with jsxs', async () => {
      const StaticContent = () => jsxs(Fragment, { children: listItems() })

      await render(jsx(StaticContent, {}))

      expect(container.querySelectorAll('li')).toHaveLength(2)
      expect(keyWarnings()).toHaveLength(0)
    })

    it('does not require keys on static children created with jsxDEV', async () => {
      const StaticDevContent = () =>
        jsxDEV(Fragment, { children: listItems() }, undefined, true)

      await render(jsx(StaticDevContent, {}))

      expect(container.querySelectorAll('li')).toHaveLength(2)
      expect(keyWarnings()).toHaveLength(0)
    })

    it('still requires keys on dynamic children created with jsx', async () => {
      const DynamicContent = () => jsx(Fragment, { children: listItems() })

      await render(jsx(DynamicContent, {}))

      expect(keyWarnings()).toHaveLength(1)
    })
  })
})
