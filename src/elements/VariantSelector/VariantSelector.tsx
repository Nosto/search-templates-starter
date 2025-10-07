import type { VariantSelector as CustomElement } from "@nosto/web-components"

type VariantSelectorProps = Pick<CustomElement, "handle">

/**
 * A custom element wrapper that displays product variant options as clickable pills.
 *
 * Fetches product data from Shopify and renders option rows with clickable value pills.
 * Preselects the first value for each option and highlights the currently selected choices.
 * Emits a custom event when variant selections change.
 */
export default function VariantSelector(props: VariantSelectorProps) {
  return (
    // @ts-expect-error: Custom element types not properly recognized by TypeScript
    <nosto-variant-selector {...props} />
  )
}
