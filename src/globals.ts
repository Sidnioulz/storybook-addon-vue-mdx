import type { Globals } from 'storybook/internal/types'

import { PARAM_KEY } from './constants'

/**
 * The subset of Storybook's preview runtime that this addon reads. Storybook
 * does not expose the story store publicly, so it is described structurally.
 */
type WindowWithPreview = typeof window & {
  __STORYBOOK_PREVIEW__?: {
    storyStoreValue?: {
      userGlobals: { initialGlobals: Globals }
    }
  }
}

export function getGlobals() {
  const preview = (window as WindowWithPreview).__STORYBOOK_PREVIEW__

  return preview?.storyStoreValue?.userGlobals.initialGlobals[PARAM_KEY]
}
