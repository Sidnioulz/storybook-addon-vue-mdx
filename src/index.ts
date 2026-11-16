import { definePreviewAddon } from 'storybook/internal/csf'

import { PARAM_KEY } from './constants'
import addonAnnotations from './preview'
import type { VueMdxOptions } from './types'

export type { VueMdxOptions }

export default () =>
  definePreviewAddon<{ globals: { [PARAM_KEY]?: VueMdxOptions } }>(
    addonAnnotations,
  )
