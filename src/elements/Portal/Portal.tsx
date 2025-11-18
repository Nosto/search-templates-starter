import { waitForElement } from "@/utils/waitForElement"
import { ComponentChildren } from "preact"
import { createPortal } from "preact/compat"
import { useEffect, useRef, useState } from "preact/hooks"

type Props = {
  target: string
  clear?: boolean
  children: ComponentChildren
}

export default function Portal({ target, clear, children }: Props) {
  const [element, setElement] = useState<HTMLElement | null>(() => document.querySelector<HTMLElement>(target))
  const isClearedRef = useRef(false)

  useEffect(() => {
    if (!element) {
      waitForElement(target).then(setElement)
    }
  }, [target, element])

  useEffect(() => {
    if (element && clear && !isClearedRef.current) {
      const targetElement = element
      // eslint-disable-next-line react-hooks/immutability -- Intentional DOM manipulation to clear portal target
      targetElement.innerHTML = ""
      isClearedRef.current = true
    }
  }, [element, clear])

  return element ? createPortal(children, element) : null
}
