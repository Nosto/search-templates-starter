import { addToCart } from "@nosto/search-js"
import { SearchTrackOptions } from "@nosto/nosto-js/client"
import { useCallback, useState } from "preact/hooks"
import { ComponentChildren } from "preact"
import type { Product } from "@/types"
import Modal from "./Modal"

type Props = {
  product: Product
  type: SearchTrackOptions
  children: ComponentChildren
  className?: string
}

export default function AddToCart({ product, type, children, className }: Props) {
  const [showModal, setShowModal] = useState(false)

  const handleClick = useCallback((e: Event) => {
    e.preventDefault()
    setShowModal(true)
  }, [])

  const handleModalClose = useCallback((e: Event) => {
    e.preventDefault()
    setShowModal(false)
  }, [])

  const handleAddToCart = useCallback(
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
      <button onClick={handleClick} className={className}>
        {children}
      </button>
      {showModal ? (
        <Modal product={product} show={showModal} onClose={handleModalClose} onAddToCart={handleAddToCart} />
      ) : null}
    </>
  )
}
