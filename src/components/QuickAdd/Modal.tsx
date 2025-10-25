/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCallback, useEffect, useRef, useState } from "preact/hooks"
import type { Product } from "@/types"
import VariantSelector from "@/elements/VariantSelector/VariantSelector"
import styles from "./Modal.module.css"
import Button from "@/elements/Button/Button"
import Icon from "@/elements/Icon/Icon"
import Heading from "@/elements/Heading/Heading"
import ProductImage from "../Product/ProductImage"
import { startViewTransition } from "@/utils/viewTransition"

type Props = {
  product: Product
  show: boolean
  onClose: (e: Event) => void
  onAddToCart: (skuId: string) => void
}

function defaultSkuId(product: Product) {
  if (product.skus?.length === 1) {
    return product.skus[0].id ?? ""
  }
  return ""
}

export default function Modal({ product, show, onClose, onAddToCart }: Props) {
  const [selectedSkuId, setSelectedSkuId] = useState<string>(defaultSkuId(product))
  const dialogRef = useRef<HTMLDialogElement>(null)
  const renderSelector = product.skus && product.skus.length > 1

  useEffect(() => {
    const dialog = dialogRef.current
    startViewTransition(() => {
      if (show) {
        dialog?.showModal()
      } else {
        dialog?.close()
      }
    })
  }, [show])

  const handleVariantChange = useCallback((variant: { id: string }) => {
    console.log("Selected variant:", variant)
    setSelectedSkuId(variant.id)
  }, [])

  const handleAddToCart = useCallback(
    (e: Event) => {
      e.preventDefault()
      if (selectedSkuId) {
        onAddToCart(selectedSkuId)
      }
    },
    [selectedSkuId, onAddToCart]
  )

  const handleOnClick = useCallback(
    (e: MouseEvent) => {
      if (e.target === dialogRef.current) {
        onClose(e)
      } else {
        e.preventDefault()
        e.stopPropagation()
      }
    },
    [onClose]
  )

  // TODO render price and listPrice of selected variant if available
  // TODO add cycling through images when multiple images are available

  return (
    <dialog className={styles.modal} aria-labelledby="modal-title" ref={dialogRef} onClick={handleOnClick}>
      <Button className={styles.close} onClick={onClose}>
        <Icon name="close" circle />
      </Button>
      <div className={styles.content}>
        <div className={styles.columns}>
          <div className={styles.leftColumn}>
            {product.imageUrl && <ProductImage src={product.imageUrl} alt={product.name} className={styles.image} />}
          </div>
          <div className={styles.rightColumn}>
            <Heading>{product.name}</Heading>
            <div aria-label="Price">
              <span>{product.priceText}</span>
              {product.listPrice && product.price && product.listPrice > product.price && (
                <span className={styles.specialPrice}>{product.listPriceText}</span>
              )}
            </div>
            {renderSelector ? (
              <VariantSelector
                handle={product.handle!}
                onVariantChange={handleVariantChange}
                className={styles.swatches}
                preselect
              />
            ) : null}
            <button className={styles.addToCartButton} onClick={handleAddToCart} disabled={!selectedSkuId}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}
