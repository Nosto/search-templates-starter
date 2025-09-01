import { JSX } from "preact/jsx-runtime"
import "@nosto/web-components"

type CampaignProps = {
  placement?: string
  useTemplate?: boolean
  api?: string
  className?: string
} & JSX.HTMLAttributes<HTMLElement>

/**
 * Campaign component using the nosto-campaign custom element directly.
 * Provides type-safe integration with Nosto's campaign rendering and product recommendation display.
 */
export default function Campaign({ placement, useTemplate, api, className, ...props }: CampaignProps) {
  return (
    // @ts-expect-error: Custom element types not properly recognized by TypeScript
    <nosto-campaign placement={placement} use-template={useTemplate} api={api} className={className} {...props} />
  )
}
