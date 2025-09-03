type DynamicCardProps = {
  /** The product handle to fetch data for. */
  handle: string
  /** The section to use for rendering the product. section or template is required. */
  section?: string
  /** The template to use for rendering the product. section or template is required. */
  template?: string
  /** The variant ID to fetch specific variant data. */
  variantId?: string
  /** If true, the component will display placeholder content while loading. */
  placeholder?: boolean
  /** If true, the component will only fetch data when it comes into view. */
  lazy?: boolean
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
