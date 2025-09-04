import { SearchProduct } from "@nosto/nosto-js/client"

export function handleDecorator(product: SearchProduct) {
  return {
    ...product,
    handle: product.url?.split("/").pop() || undefined
  } as SearchProduct & { handle?: string }
}
