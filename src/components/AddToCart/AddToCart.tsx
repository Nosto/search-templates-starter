import { addToCart } from "@nosto/search-js"
import { SearchTrackOptions } from "@nosto/nosto-js/client"
import { useCallback, useState } from "preact/hooks"
import type { Product } from "@/types"
import Modal from "./Modal"

type Props = {
  product: Product
  type: SearchTrackOptions
  children: preact.ComponentChildren
}

export default function AddToCart({ product, type, children }: Props) {
  const [showModal, setShowModal] = useState(false)

  const handleClick = useCallback(
    (e: Event) => {
      e.stopPropagation()

      // If product has no SKUs or only one SKU, add to cart directly
      const skus = product.skus || []
      if (skus.length <= 1) {
        const skuId = skus[0]?.id || product.productId
        if (skuId && product.productId) {
          addToCart(
            type,
            {
              productId: product.productId,
              url: product.url,
              skuId
            },
            1
          )
        }
      } else {
        // Multiple SKUs - show modal for variant selection
        setShowModal(true)
      }
    },
    [product, type]
  )

  const handleModalClose = useCallback(() => {
    setShowModal(false)
  }, [])

  const handleAddFromModal = useCallback(
    (selectedSkuId: string) => {
      if (product.productId) {
        addToCart(
          type,
          {
            productId: product.productId,
            url: product.url,
            skuId: selectedSkuId
          },
          1
        )
        setShowModal(false)
      }
    },
    [product, type]
  )

  return (
    <>
      <button onClick={handleClick}>{children}</button>
      {showModal && <Modal product={product} onClose={handleModalClose} onAddToCart={handleAddFromModal} />}
    </>
  )
}
