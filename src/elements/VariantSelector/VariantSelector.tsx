import { useEffect, useRef } from "preact/hooks"
import { toAttributes } from "@/utils/toAttributes"
import type { VariantSelector as CustomElement } from "@nosto/web-components"

type VariantSelectorProps = Pick<CustomElement, keyof typeof CustomElement.properties> & {
  onVariantChange?: (variant: { id: string }) => void
}

/**
 * A custom element wrapper that displays product variant options as clickable pills.
 *
 * Fetches product data from Shopify and renders option rows with clickable value pills.
 * Preselects the first value for each option and highlights the currently selected choices.
 * Emits a custom event when variant selections change.
 */
export default function VariantSelector({ onVariantChange, ...props }: VariantSelectorProps) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!onVariantChange || !elementRef.current) return

    const handleVariantChange = (event: CustomEvent) => {
      const { variant } = event.detail
      if (variant?.id) {
        onVariantChange(variant)
      }
    }

    const element = elementRef.current
    element.addEventListener("variantchange", handleVariantChange as EventListener)

    return () => {
      element.removeEventListener("variantchange", handleVariantChange as EventListener)
    }
  }, [onVariantChange])

  return <nosto-variant-selector ref={elementRef} {...toAttributes(props)} />
}

declare module "preact/jsx-runtime" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "nosto-variant-selector": VariantSelectorProps
    }
  }
}
