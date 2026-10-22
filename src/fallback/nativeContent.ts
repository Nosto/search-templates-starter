const stash = new Map<Element, Node[]>()

/**
 * Detaches the native content of the element, keeping the nodes (and their event listeners)
 * so they can be restored if Nosto search becomes unavailable.
 */
export function stashNativeContent(element: Element) {
  if (stash.has(element)) {
    return
  }
  stash.set(element, Array.from(element.childNodes))
  element.replaceChildren()
}

export function unstashNativeContent() {
  stash.forEach((nodes, element) => element.replaceChildren(...nodes))
  stash.clear()
}
