import type { Image as CustomElement } from "@nosto/web-components"

type ImageProps = Pick<CustomElement, "src" | "width" | "height" | "aspectRatio" | "layout" | "crop">

/**
 * A custom element wrapper that renders a Nosto image with responsive capabilities using the unpic library.
 * This component supports Shopify and BigCommerce image URLs with various layout and crop options.
 *
 * Supports layouts: "fixed", "constrained", or "fullWidth"
 * Shopify crop options: "center", "left", "right", "top", or "bottom"
 */
export default function Image({ ...props }: ImageProps) {
  return (
    // @ts-expect-error: Custom element types not properly recognized by TypeScript
    <nosto-image {...props} />
  )
}
