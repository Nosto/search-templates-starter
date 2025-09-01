import { JSX } from "preact/jsx-runtime"
import { useEffect, useRef } from "preact/hooks"
import "@nosto/web-components"
import cl from "@/utils/cl"
import styles from "./DynamicCard.module.css"

type DynamicCardProps = {
  keyProp?: string
  handles?: string
  product?: string
  target?: string
  className?: string
  children?: JSX.Element | JSX.Element[]
} & Omit<JSX.IntrinsicElements["div"], "className" | "key">

/**
 * DynamicCard component wrapper for the nosto-dynamic-card custom element.
 * Provides type-safe integration with Nosto's dynamic product card templating (Shopify only).
 */
export default function DynamicCard({
  keyProp,
  handles,
  product,
  target,
  className,
  children,
  ...props
}: DynamicCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapperRef.current) return

    // Create the custom element
    const cardElement = document.createElement("nosto-dynamic-card")

    // Set attributes
    if (keyProp) {
      cardElement.setAttribute("key", keyProp)
    }
    if (handles) {
      cardElement.setAttribute("handles", handles)
    }
    if (product) {
      cardElement.setAttribute("product", product)
    }
    if (target) {
      cardElement.setAttribute("target", target)
    }

    // Apply className to the custom element
    if (className) {
      cardElement.className = cl(styles.dynamicCard, className)
    } else {
      cardElement.className = styles.dynamicCard
    }

    // Clear wrapper and append the custom element
    const wrapper = wrapperRef.current
    wrapper.innerHTML = ""
    wrapper.appendChild(cardElement)

    // Note: Children are not handled in this implementation
    // Custom element content should be handled by the element itself or through templates

    return () => {
      if (wrapper) {
        wrapper.innerHTML = ""
      }
    }
  }, [keyProp, handles, product, target, className, children])

  return (
    <div ref={wrapperRef} {...props}>
      {/* The custom element will be inserted here */}
    </div>
  )
}
