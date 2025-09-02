type DynamicCardProps = {
  handle: string
  section?: string
  template?: string
}

/**
 * DynamicCard component using the nosto-dynamic-card custom element directly.
 * Provides type-safe integration with Nosto's dynamic product card templating (Shopify only).
 */
export default function DynamicCard({ handle, section, template, ...props }: DynamicCardProps) {
  return (
    // @ts-expect-error: Custom element types not properly recognized by TypeScript
    <nosto-dynamic-card handle={handle} section={section} template={template} {...props} />
  )
}
