import { DecoratedProduct } from "@nosto/search-js"
import { hitDecorators } from "./config"

export type Product = DecoratedProduct<typeof hitDecorators>

export type Props<T extends HTMLElement> = {
  [K in keyof T as T[K] extends (...args: never[]) => unknown ? never : K extends keyof HTMLElement ? never : K]?: T[K]
}
