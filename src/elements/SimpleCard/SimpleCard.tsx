import type { SimpleCard as CustomElement } from "@nosto/web-components"

type SimpleCardProps = Pick<CustomElement, "handle" | "alternate" | "brand" | "discount" | "rating">

/**
 * A custom element wrapper that displays a product card using Shopify product data.
 * This component fetches product data from Shopify and renders a card with product image,
 * title, price, and optional brand, discount, and rating information.
 */
export default function SimpleCard(props: SimpleCardProps) {
  return (
    // @ts-expect-error: Custom element types not properly recognized by TypeScript
    <nosto-simple-card {...props} />
  )
}
