import type { Campaign as CustomElement } from "@nosto/web-components"

// Documented interface that preserves JSDoc while maintaining type coupling with web components
// Note: init is defined as boolean for better developer experience, even though the web component uses string
type CampaignProps = {
  /** The placement identifier for the campaign. */
  placement: CustomElement["placement"]
  /** The ID of the product to associate with the campaign. */
  productId?: CustomElement["productId"]
  /** The variant ID of the product. */
  variantId?: CustomElement["variantId"]
  /** The ID of the template to use for rendering the campaign. If provided, the campaign will be rendered using this template. */
  template?: CustomElement["template"]
  /** If set to "false", the component will not automatically load the campaign on connection. Defaults to "true". */
  init?: boolean
  /** If true, the component will only load the campaign when it comes into view using IntersectionObserver. Defaults to false. */
  lazy?: CustomElement["lazy"]
}

/**
 * A custom element wrapper that renders a Nosto campaign based on the provided placement and fetched campaign data.
 * This component fetches campaign data from Nosto and injects it into the DOM.
 * It supports both HTML and JSON response modes, allowing for flexible rendering.
 * The placement or id attribute will be used as the identifier of the placement to be fetched.
 */
export default function Campaign({ productId, variantId, ...props }: CampaignProps) {
  return (
    // @ts-expect-error: Custom element types not properly recognized by TypeScript
    <nosto-campaign product-id={productId} variant-id={variantId} {...props} />
  )
}
