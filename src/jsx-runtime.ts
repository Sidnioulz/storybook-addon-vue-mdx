import {
  ComponentClass,
  createElement,
  Fragment,
  Key,
  ReactNode,
  type FunctionComponent,
} from 'react'
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

const jsx = (
  nodeType:
    | string
    | ComponentClass<{ children: undefined; key: Key }, unknown>
    | FunctionComponent<{ children: undefined; key: Key }>,
  props: object & {
    children?: ReactNode
  },
  key: Key,
) => {
  const children = 'children' in props ? props.children : undefined
  const newProps = { ...props, children: undefined, key }

  if (isLikelyVueComponent(nodeType)) {
    const vueMdxOptions = getGlobals()

    // TODO optimise / memoise wrappedNode
    const wrappedNode = applyPureVueInReact(nodeType, vueMdxOptions)

    return createElement(
      wrappedNode as FunctionComponent<unknown>,
      newProps,
      children,
    )
  }

  if (isLikelyVueFragment(nodeType)) {
    return createElement(Fragment, newProps, children)
  }

  return createElement(nodeType, newProps, children)
}

export { Fragment, jsx, jsx as jsxs, jsx as jsxDEV }
