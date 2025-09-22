import type { DynamicCard as CustomElement } from "@nosto/web-components"

type DynamicCardProps = Pick<CustomElement, "handle" | "section" | "template" | "variantId" | "placeholder" | "lazy">

/**
 * A custom element wrapper that renders a product by fetching the markup from Shopify based on the provided handle and template.
 *
 * This component is designed to be used in a Shopify environment and fetches product data dynamically.
 */
export default function DynamicCard({ variantId, ...props }: DynamicCardProps) {
  return (
    // @ts-expect-error: Custom element types not properly recognized by TypeScript
    <nosto-dynamic-card variant-id={variantId} {...props} />
  )
}
