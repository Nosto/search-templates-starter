import type { SimpleCard as CustomElement } from "@nosto/web-components"
import { ComponentChildren } from "preact"

type SimpleCardProps = Pick<CustomElement, "handle" | "alternate" | "brand" | "discount" | "rating" | "sizes"> & {
  children?: ComponentChildren
}

/**
 * A custom element wrapper that displays a product card using Shopify product data.
 *
 * This component is designed to be used in a Shopify environment and fetches product data dynamically.
 */
export default function SimpleCard({ children, ...props }: SimpleCardProps) {
  return (
    <>
      {/* @ts-expect-error: Custom element types not properly recognized by TypeScript */}
      <nosto-simple-card {...props} />
      {children}
    </>
  )
}
