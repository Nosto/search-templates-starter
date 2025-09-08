import { SearchProduct } from "@nosto/nosto-js/client"

type DecoratedProduct = SearchProduct & { handle?: string }

export function handleDecorator(product: SearchProduct): DecoratedProduct {
  if (product.url) {
    const pathname = new URL(product.url).pathname
    return {
      ...product,
      handle: pathname.split("/").pop() || undefined
    }
  }
  return product
}
