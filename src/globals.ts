import { type WebRenderer } from '@storybook/types'
import { PreviewWeb } from '@storybook/preview-api'

import { PARAM_KEY } from './constants'

type windowWithSbGlobals = typeof window & {
  __STORYBOOK_PREVIEW__: PreviewWeb<WebRenderer>
}

export function getGlobals() {
  const preview = (window as windowWithSbGlobals).__STORYBOOK_PREVIEW__
  const { globals } = preview.storyStore

  return globals.get()[PARAM_KEY]
}
