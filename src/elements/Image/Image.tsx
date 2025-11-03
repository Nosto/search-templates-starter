import type { Image as CustomElement } from "@nosto/web-components"
import { JSX } from "preact/jsx-runtime"

type ImageProps = Pick<
  CustomElement,
  | "src"
  | "width"
  | "height"
  | "aspectRatio"
  | "layout"
  | "crop"
  | "alt"
  | "sizes"
  | "breakpoints"
  | "unstyled"
  | "fetchpriority"
> &
  JSX.IntrinsicElements["img"]

/**
 * A custom element wrapper that renders an optimized image using Nosto's image transformation service.
 * This component provides automatic image optimization, responsive sizing, and cropping capabilities.
 * It supports various layout modes and aspect ratio configurations for flexible image display.
 */
export default function Image(props: ImageProps) {
  return <nosto-image {...props} />
}

declare module "preact/jsx-runtime" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "nosto-image": ImageProps
    }
  }
}
