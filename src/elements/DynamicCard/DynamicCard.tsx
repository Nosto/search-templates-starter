import { toAttributes } from "@/utils/toAttributes"
import type { DynamicCard as CustomElement } from "@nosto/web-components"

type DynamicCardProps = Pick<CustomElement, keyof typeof CustomElement.properties>

/**
 * A custom element wrapper that renders a product by fetching the markup from Shopify based on the provided handle and template.
 *
 * This component is designed to be used in a Shopify environment and fetches product data dynamically.
 */
export default function DynamicCard(props: DynamicCardProps) {
  return <nosto-dynamic-card {...toAttributes(props)} />
}

declare module "preact/jsx-runtime" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "nosto-dynamic-card": DynamicCardProps
    }
  }
}
