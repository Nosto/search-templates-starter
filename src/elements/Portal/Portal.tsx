import { waitForElement } from "@/utils/waitForElement"
import { ComponentChildren } from "preact"
import { createPortal } from "preact/compat"
import { useEffect, useState } from "preact/hooks"

type Props = {
  target: string
  children: ComponentChildren
}

/**
 * A portal component that renders children into a DOM element outside of the normal component tree.
 * Automatically waits for the target element to exist in the DOM if it's not immediately available.
 * Useful for rendering modals, tooltips, or other UI elements that need to escape normal stacking contexts.
 *
 * @param target - CSS selector string identifying the DOM element to render into
 * @param children - The content to render inside the portal target element
 * @returns The children rendered into the target element, or null if target is not available
 */
export default function Portal({ target, children }: Props) {
  const [element, setElement] = useState<HTMLElement | null>(document.querySelector<HTMLElement>(target))

  useEffect(() => {
    if (element) {
      return
    }
    waitForElement(target).then(el => {
      setElement(el)
    })
  }, [target, element])

  return element ? createPortal(children, element) : null
}
