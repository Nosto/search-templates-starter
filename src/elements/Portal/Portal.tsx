import { waitForElement } from "@/utils/waitForElement"
import { ComponentChildren } from "preact"
import { createPortal } from "preact/compat"
import { useEffect, useState } from "preact/hooks"

type Props = {
  target: string
  clear?: boolean
  children: ComponentChildren
}

export default function Portal({ target, clear, children }: Props) {
  const [element, setElement] = useState<HTMLElement | null>(document.querySelector<HTMLElement>(target))

  useEffect(() => {
    if (element) {
      if (clear) {
        element.innerHTML = ""
      }
      return
    }
    waitForElement(target).then(el => {
      setElement(el)
    })
  }, [target, clear, element])

  return element ? createPortal(children, element) : null
}
