import type { ElementType, Key } from 'react'
import { Fragment, jsx as reactJsx, jsxs as reactJsxs } from 'react/jsx-runtime'
import { applyPureVueInReact } from 'veaury'
import { h, Fragment as VueFragment } from 'vue'
import { getGlobals } from './globals'

// TODO: Improve this logic as much as possible.
const isLikelyVueComponent = (nodeType: unknown) => {
  if (typeof nodeType === 'object' && nodeType !== null) {
    if (
      '__name' in nodeType &&
      !!nodeType.__name &&
      '__scopeId' in nodeType &&
      !!nodeType.__scopeId
    ) {
      return true
    }
    if (
      '__name' in nodeType &&
      !!nodeType.__name &&
      '__hmrId' in nodeType &&
      !!nodeType.__hmrId
    ) {
      return true
    }
    if (
      'name' in nodeType &&
      !!nodeType.name &&
      'setup' in nodeType &&
      !!nodeType.setup
    ) {
      return true
    }

    if ('render' in nodeType && typeof nodeType.render === 'function') {
      return true
    }

    if ('setup' in nodeType && typeof nodeType.setup === 'function') {
      return true
    }
    if ('__file' in nodeType && 'render' in nodeType) {
      return true
    }
    if ('template' in nodeType && 'components' in nodeType) {
      return true
    }
  }

  return false
}

const _vueFragment = h(VueFragment)
const isLikelyVueFragment = (nodeType: unknown) =>
  nodeType === _vueFragment.type

/**
 * Maps the element types that MDX produces to types React can render: Vue
 * components are wrapped with veaury, and Vue fragments become React fragments.
 */
const toReactType = (nodeType: unknown): ElementType => {
  if (isLikelyVueComponent(nodeType)) {
    const vueMdxOptions = getGlobals()

    // TODO optimise / memoise wrappedNode
    return applyPureVueInReact(nodeType, vueMdxOptions) as ElementType
  }

  if (isLikelyVueFragment(nodeType)) {
    return Fragment
  }

  return nodeType as ElementType
}

const jsx = (nodeType: unknown, props: unknown, key?: Key) =>
  reactJsx(toReactType(nodeType), props, key)

/** Creates an element whose `props.children` array is static, so its items need no keys. */
const jsxs = (nodeType: unknown, props: unknown, key?: Key) =>
  reactJsxs(toReactType(nodeType), props, key)

const jsxDEV = (
  nodeType: unknown,
  props: unknown,
  key: Key | undefined,
  isStaticChildren: boolean,
) => (isStaticChildren ? jsxs : jsx)(nodeType, props, key)

export { Fragment, jsx, jsxs, jsxDEV }
