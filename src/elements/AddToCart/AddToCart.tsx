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

export default function AddToCart({ type, hit, quantity = 1, children }: Props) {
  const onClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      addToCart(type, hit, quantity)
    },
    [type, hit, quantity]
  )
  return <button onClick={onClick}>{children}</button>
}
