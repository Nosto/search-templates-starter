import { DecoratedProduct } from "@nosto/search-js"
import { hitDecorators } from "./config"

export type Product = DecoratedProduct<typeof hitDecorators>

/**
 * Extracts all non-method properties from a custom element type `T`, excluding any properties inherited from the base `HTMLElement`.
 * This utility type is useful for defining prop types for custom elements without including standard HTMLElement properties or methods.
 */
export type Props<T extends HTMLElement> = {
  [K in keyof T as T[K] extends (...args: never[]) => unknown ? never : K extends keyof HTMLElement ? never : K]?: T[K]
}
