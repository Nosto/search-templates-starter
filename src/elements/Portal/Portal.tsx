import { waitForElement } from "@/utils/waitForElement"
import { stashNativeContent } from "@/fallback/nativeContent"
import { ComponentChildren } from "preact"
import { createPortal } from "preact/compat"
import { useEffect, useState } from "preact/hooks"

type Props = {
  target: string
  clear?: boolean
  children: ComponentChildren
}

/**
 * Clearing must happen before the portal renders into the element,
 * otherwise the rendered children would be removed along with the native content.
 */
function prepareTarget(element: HTMLElement | null, clear?: boolean) {
  if (element && clear) {
    stashNativeContent(element)
  }
  return element
}

export default function Portal({ target, clear, children }: Props) {
  const [element, setElement] = useState(() => prepareTarget(document.querySelector<HTMLElement>(target), clear))

  useEffect(() => {
    if (!element) {
      waitForElement(target).then(found => setElement(prepareTarget(found, clear)))
    }
  }, [target, element, clear])

  if (!element) {
    return null
  }

  return createPortal(children, element)
}
