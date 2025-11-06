import { waitForElement } from "@/utils/waitForElement"
import { ComponentChildren } from "preact"
import { createPortal } from "preact/compat"
import { useEffect, useState, useRef } from "preact/hooks"

type Props = {
  target: string
  children: ComponentChildren
  replace?: boolean
}

/**
 * Portal component renders children into a DOM node outside the parent hierarchy.
 *
 * @param target - CSS selector for the target element
 * @param children - Content to render in the portal
 * @param replace - If true, clears target element's existing content before rendering (default: false)
 */
export default function Portal({ target, children, replace = false }: Props) {
  const [element, setElement] = useState<HTMLElement | null>(() => {
    const el = document.querySelector<HTMLElement>(target)
    if (el && replace) {
      el.innerHTML = ""
    }
    return el
  })
  const hasCleared = useRef(element !== null && replace)

  useEffect(() => {
    if (element) {
      return
    }
    waitForElement(target).then(el => {
      if (replace && !hasCleared.current) {
        el.innerHTML = ""
        hasCleared.current = true
      }
      setElement(el)
    })
  }, [target, element, replace])

  return element ? createPortal(children, element) : null
}
