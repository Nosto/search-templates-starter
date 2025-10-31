import type { SimpleCard as CustomElement } from "@nosto/web-components"
import { JSX } from "preact"

type SimpleCardProps = Pick<CustomElement, keyof typeof CustomElement.properties> & JSX.IntrinsicElements["span"]

/**
 * A custom element wrapper that displays a product card using Shopify product data.
 *
 * Fetches product data from `/products/<handle>.js` and renders a card with
 * product image, title, price, and optional brand, discount, and rating information.
 */
export default function SimpleCard(props: SimpleCardProps) {
  return <nosto-simple-card {...props} />
}

declare module "preact/jsx-runtime" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "nosto-simple-card": SimpleCardProps
    }
  }
}
