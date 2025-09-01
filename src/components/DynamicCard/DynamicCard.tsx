import { JSX } from "preact/jsx-runtime"
import "@nosto/web-components"

interface NostoDynamicCardElement extends JSX.HTMLAttributes<HTMLElement> {
  key?: string
  handles?: string
  product?: string
  target?: string
}

type DynamicCardProps = {
  keyProp?: string
  handles?: string
  product?: string
  target?: string
  className?: string
} & Omit<NostoDynamicCardElement, "className" | "key">

/**
 * DynamicCard component using the nosto-dynamic-card custom element directly.
 * Provides type-safe integration with Nosto's dynamic product card templating (Shopify only).
 */
export default function DynamicCard({ keyProp, handles, product, target, className, ...props }: DynamicCardProps) {
  const elementProps: NostoDynamicCardElement = {
    key: keyProp,
    handles,
    product,
    target,
    className,
    ...props
  }

  return (
    // @ts-expect-error: Custom element types not properly recognized by TypeScript
    <nosto-dynamic-card {...elementProps} />
  )
}
