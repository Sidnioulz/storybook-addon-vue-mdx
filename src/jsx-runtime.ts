import { createElement, Fragment, type FunctionComponent } from 'react'
import { applyPureVueInReact } from 'veaury'
import { h, Fragment as VueFragment } from 'vue'
import { getGlobals } from './globals'

// TODO: Improve this logic as much as possible.
const isLikelyVueComponent = (nodeType: any) => {
  if (typeof nodeType === 'object') {
    if (!!nodeType.__name && !!nodeType.__scopeId) {
      return true
    }
    if (!!nodeType.name && !!nodeType.setup) {
      return true
    }
  }

  return false
}

const _vueFragment = h(VueFragment)
const isLikelyVueFragment = (nodeType: any) => nodeType === _vueFragment.type

const jsx = (nodeType: any, props: any, key: any) => {
  const { children } = props
  const newProps = { ...props, children: undefined, key }

  if (isLikelyVueComponent(nodeType)) {
    const vueMdxOptions = getGlobals()

    // TODO optimise / memoise wrappedNode
    const wrappedNode = applyPureVueInReact(nodeType, vueMdxOptions)

    return createElement(
      wrappedNode as FunctionComponent<any>,
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
