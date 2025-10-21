import type { Campaign as CustomElement } from "@nosto/web-components"

type CampaignProps = Pick<CustomElement, keyof typeof CustomElement.properties>

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
