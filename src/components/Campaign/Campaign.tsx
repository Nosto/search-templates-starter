type CampaignProps = {
  placement: string
  productId?: string
  variantId?: string
  template?: string
  init?: boolean
  lazy?: boolean
}

/**
 * A custom element wrapper that renders a Nosto campaign based on the provided placement and fetched campaign data.
 * This component fetches campaign data from Nosto and injects it into the DOM.
 * It supports both HTML and JSON response modes, allowing for flexible rendering.
 * The placement or id attribute will be used as the identifier of the placement to be fetched.
 *
 * @property {string} placement (or id) - The placement identifier for the campaign.
 * @property {string} productId - The ID of the product to associate with
 * the campaign.
 * @property {string} [variantId] - The variant ID of the product.
 * @property {string} template - The ID of the template to use for rendering
 * the campaign. If provided, the campaign will be rendered using this template.
 * @property {string} [init] - If set to "false", the component will not
 * automatically load the campaign on connection. Defaults to "true".
 * @property {boolean} [lazy] - If true, the component will only load the campaign
 * when it comes into view using IntersectionObserver. Defaults to false.
 */
export default function Campaign({ productId, variantId, ...props }: CampaignProps) {
  return (
    // @ts-expect-error: Custom element types not properly recognized by TypeScript
    <nosto-campaign product-id={productId} variant-id={variantId} {...props} />
  )
}
