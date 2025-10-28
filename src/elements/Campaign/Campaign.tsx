import { toAttributes } from "@/utils/toAttributes"
import type { Campaign as CustomElement } from "@nosto/web-components"
import type { ComponentChildren } from "preact"

type CampaignProps = Pick<CustomElement, keyof typeof CustomElement.properties> & {
  children?: ComponentChildren
}

/**
 * A custom element wrapper that renders a Nosto campaign based on the provided placement and fetched campaign data.
 * This component fetches campaign data from Nosto and injects it into the DOM.
 * It supports both HTML and JSON response modes, allowing for flexible rendering.
 * The placement or id attribute will be used as the identifier of the placement to be fetched.
 */
export default function Campaign({ children, ...campaignProps }: CampaignProps) {
  return <nosto-campaign {...toAttributes(campaignProps)}>{children}</nosto-campaign>
}

declare module "preact/jsx-runtime" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "nosto-campaign": CampaignProps
    }
  }
}
