import { JSX } from "preact/jsx-runtime"
import "@nosto/web-components"

type DynamicCardProps = {
  keyProp?: string
  handles?: string
  product?: string
  target?: string
  className?: string
} & JSX.HTMLAttributes<HTMLElement>

/**
 * DynamicCard component using the nosto-dynamic-card custom element directly.
 * Provides type-safe integration with Nosto's dynamic product card templating (Shopify only).
 */
export default function DynamicCard({ keyProp, handles, product, target, className, ...props }: DynamicCardProps) {
  return (
    // @ts-expect-error: Custom element types not properly recognized by TypeScript
    <nosto-dynamic-card
      key={keyProp}
      handles={handles}
      product={product}
      target={target}
      className={className}
      {...props}
    />
  )
}
