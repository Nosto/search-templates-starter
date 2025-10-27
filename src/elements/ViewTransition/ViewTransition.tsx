import { JSX } from "preact/jsx-runtime"
import { ComponentChildren } from "preact"
import { useEffect, useRef } from "preact/hooks"
import { cl } from "@nosto/search-js/utils"
import { startViewTransition } from "@/utils/viewTransition"
import styles from "./ViewTransition.module.css"

type Props = {
  name?: string
  children: ComponentChildren
} & Omit<JSX.IntrinsicElements["div"], "children">

export default function ViewTransition({ name = "view-transition", children, className, ...props }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const previousChildrenRef = useRef<ComponentChildren>()
  const isInitialRenderRef = useRef(true)

  useEffect(() => {
    const hasChildrenChanged = previousChildrenRef.current !== children

    if (hasChildrenChanged && !isInitialRenderRef.current) {
      startViewTransition(() => {
        // The actual update happens in render, this is just the transition wrapper
      })
    }

    previousChildrenRef.current = children
    isInitialRenderRef.current = false
  }, [children])

  useEffect(() => {
    if (containerRef.current && name) {
      containerRef.current.style.viewTransitionName = name
    }
  }, [name])

  return (
    <div ref={containerRef} className={cl(styles.container, className)} {...props}>
      {children}
    </div>
  )
}
