type CampaignProps = {
  placement?: string
  [key: string]: unknown
}

/**
 * Campaign component using the nosto-campaign custom element directly.
 * Provides type-safe integration with Nosto's campaign rendering and product recommendation display.
 */
export default function Campaign({ placement, ...props }: CampaignProps) {
  return (
    // @ts-expect-error: Custom element types not properly recognized by TypeScript
    <nosto-campaign placement={placement} {...props} />
  )
}
