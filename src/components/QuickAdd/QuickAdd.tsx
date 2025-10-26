import { addToCart } from "@nosto/search-js"
import { useCallback, useState } from "preact/hooks"
import { ComponentChildren } from "preact"
import type { Product } from "@/types"
import Modal from "./Modal"
import { useConfig } from "@nosto/search-js/preact/common"

type Props = {
  product: Product
  children: ComponentChildren
  className?: string
}

export default function QuickAdd({ product, children, className }: Props) {
  const [showModal, setShowModal] = useState(false)
  const { pageType } = useConfig()
  const type = pageType === "search" ? "serp" : pageType

  const openModal = useCallback((e: Event) => {
    e.preventDefault()
    setShowModal(true)
  }, [])

  const closeModal = useCallback((e: Event) => {
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
      <button onClick={openModal} className={className}>
        {children}
      </button>
      {showModal ? (
        <Modal product={product} show={showModal} onClose={closeModal} onAddToCart={handleAddToCart} />
      ) : null}
    </>
  )
}
