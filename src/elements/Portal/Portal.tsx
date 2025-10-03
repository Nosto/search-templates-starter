import { waitForElement } from "@/utils/waitForElement"
import { ComponentChildren } from "preact"
import { createPortal } from "preact/compat"
import { useEffect, useState } from "preact/hooks"

type Props = {
  target: string
  children: ComponentChildren
}

export default function Portal({ target, children }: Props) {
  const [element, setElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    waitForElement(target).then(el => {
      setElement(el)
    })
  }, [target])

  return element ? createPortal(children, element) : null
}
