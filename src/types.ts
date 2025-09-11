import { JSX } from "preact/jsx-runtime"
import { DecoratedProduct } from "@nosto/search-js"
import { hitDecorators } from "./config"

export type Element = JSX.IntrinsicElements

export type Product = DecoratedProduct<typeof hitDecorators>
