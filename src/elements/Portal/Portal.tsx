import { waitForElement } from "@/utils/waitForElement"
import { ComponentChildren } from "preact"
import { createPortal } from "preact/compat"
import { useEffect, useState } from "preact/hooks"

type Props = {
  target: string
  children: ComponentChildren
  replace?: boolean
}

export default function Portal({ target, children, replace = false }: Props) {
  const [element, setElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const existingElement = document.querySelector<HTMLElement>(target)
    if (existingElement) {
      if (replace) {
        existingElement.innerHTML = ""
      }
      setElement(existingElement)
      return
    }

    waitForElement(target).then(el => {
      if (replace) {
        el.innerHTML = ""
      }
      setElement(el)
    })
  }, [target, replace])

  return element ? createPortal(children, element) : null
}
