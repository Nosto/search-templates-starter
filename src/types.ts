import { DecoratedProduct } from "@nosto/search-js"
import { hitDecorators } from "./config"

export type Product = DecoratedProduct<typeof hitDecorators>
