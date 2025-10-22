import { toAttributes } from "@/utils/toAttributes"
import type { VariantSelector as CustomElement } from "@nosto/web-components"
import { JSX } from "preact"
import { useEffect, useRef } from "preact/hooks"

type VariantSelectorProps = Pick<CustomElement, keyof typeof CustomElement.properties> &
  JSX.IntrinsicElements["span"] & { onVariantChange?: (variant: Variant) => void }

export type Variant = {
  id: number
  featuredImage?: string
}

/**
 * A custom element wrapper that displays product variant options as clickable pills.
 *
 * Fetches product data from Shopify and renders option rows with clickable value pills.
 * Preselects the first value for each option and highlights the currently selected choices.
 * Emits a custom event when variant selections change.
 */
export default function VariantSelector({ onVariantChange, ...props }: VariantSelectorProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handler = (event: CustomEvent<{ variant: Variant }>) => {
      onVariantChange?.(event.detail.variant)
    }
    el.addEventListener("variantchange", handler as EventListener)
    return () => el.removeEventListener("variantchange", handler as EventListener)
  }, [onVariantChange])

  return <nosto-variant-selector {...toAttributes(props)} ref={ref} />
}

declare module "preact/jsx-runtime" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "nosto-variant-selector": VariantSelectorProps
    }
  }
}
