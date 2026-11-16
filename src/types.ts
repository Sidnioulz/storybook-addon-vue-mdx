import type { App } from 'vue'

/**
 * Options passed to veaury's `applyPureVueInReact` when rendering Vue
 * components in MDX. See https://github.com/devilwjp/veaury for all options.
 */
export interface VueMdxOptions {
  [key: string]: unknown
  /** Called with each Vue component's app before it mounts, e.g. to install plugins. */
  beforeVueAppMount?: (app: App) => void
}
