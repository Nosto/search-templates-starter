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
    return clear ? cleared(el) : el
  })

  useEffect(() => {
    if (!element) {
      waitForElement(target).then(el => {
        setElement(clear ? cleared(el) : el)
      })
    }
  }, [target, clear, element])

  return element ? createPortal(children, element) : null
}

function cleared(element: HTMLElement | null) {
  if (element) {
    element.innerHTML = ""
  }
  return element
}
