import { addToCart, SearchHitWithSku } from "@nosto/search-js"
import { useCallback } from "preact/hooks"
import { SearchTrackOptions } from "@nosto/nosto-js/client"
import { ComponentChildren } from "preact"

type Props = {
  type: SearchTrackOptions
  hit: SearchHitWithSku
  quantity?: number
  children: ComponentChildren
}

/**
 * A wrapper component that handles adding products to cart with proper analytics tracking.
 * Integrates with Nosto's search tracking system to record add-to-cart events.
 * Prevents event bubbling to avoid triggering parent click handlers.
 *
 * @param type - The search tracking context/type for analytics purposes
 * @param hit - The search result product data including SKU information required for cart operations
 * @param quantity - The number of items to add to cart (defaults to 1)
 * @param children - The button content or other clickable elements to wrap
 * @returns A button element that triggers add-to-cart functionality when clicked
 */
export default function AddToCart({ type, hit, quantity = 1, children }: Props) {
  const onClick = useCallback(
    (e: Event) => {
      e.stopPropagation()
      addToCart(type, hit, quantity)
    },
    [type, hit, quantity]
  )
  return <button onClick={onClick}>{children}</button>
}
