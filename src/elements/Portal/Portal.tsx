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
  const [element, setElement] = useState<HTMLElement | null>(() => {
    const el = document.querySelector<HTMLElement>(target)
    if (el && clear) {
      el.innerHTML = ""
    }
    return el
  })

  useEffect(() => {
    if (!element) {
      waitForElement(target).then(el => {
        if (clear) {
          el.innerHTML = ""
        }
        setElement(el)
      })
    }
  }, [target, clear, element])

  return element ? createPortal(children, element) : null
}
