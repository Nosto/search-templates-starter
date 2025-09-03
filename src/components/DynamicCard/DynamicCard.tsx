import type { DynamicCard as CustomElement } from "@nosto/web-components"

// Documented interface that preserves JSDoc while maintaining type coupling with web components
type DynamicCardProps = {
  /** The product handle to fetch data for. */
  handle: CustomElement["handle"]
  /** The section to use for rendering the product. section or template is required. */
  section?: CustomElement["section"]
  /** The template to use for rendering the product. section or template is required. */
  template?: CustomElement["template"]
  /** The variant ID to fetch specific variant data. */
  variantId?: CustomElement["variantId"]
  /** If true, the component will display placeholder content while loading. */
  placeholder?: CustomElement["placeholder"]
  /** If true, the component will only fetch data when it comes into view. */
  lazy?: CustomElement["lazy"]
}

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
