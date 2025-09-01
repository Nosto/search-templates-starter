import { JSX } from "preact/jsx-runtime"
import "@nosto/web-components"

interface NostoCampaignElement extends JSX.HTMLAttributes<HTMLElement> {
  placement?: string
  "use-template"?: boolean
  api?: string
}

type CampaignProps = {
  placement?: string
  useTemplate?: boolean
  api?: string
  className?: string
} & Omit<NostoCampaignElement, "className" | "use-template">

/**
 * Campaign component using the nosto-campaign custom element directly.
 * Provides type-safe integration with Nosto's campaign rendering and product recommendation display.
 */
export default function Campaign({ placement, useTemplate, api, className, ...props }: CampaignProps) {
  const elementProps: NostoCampaignElement = {
    placement,
    "use-template": useTemplate,
    api,
    className,
    ...props
  }

  return (
    // @ts-expect-error: Custom element types not properly recognized by TypeScript
    <nosto-campaign {...elementProps} />
  )
}
