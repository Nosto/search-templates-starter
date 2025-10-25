/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCallback, useEffect, useMemo, useRef, useState } from "preact/hooks"
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
    return product.skus[0].id
  }
  return undefined
}

export default function Modal({ product, show, onClose, onAddToCart }: Props) {
  const [selectedSkuId, setSelectedSkuId] = useState(defaultSkuId(product))
  const dialogRef = useRef<HTMLDialogElement>(null)
  const renderSelector = show && product.skus && product.skus.length > 1

  const data = useMemo(() => {
    if (selectedSkuId) {
      const sku = product.skus?.find(sku => sku.id === selectedSkuId)
      return {
        imageUrl: sku?.imageUrl || product.imageUrl,
        priceText: sku?.priceText || product.priceText,
        // @ts-expect-error FIXME
        listPriceText: sku?.listPriceText || product.listPriceText
      }
    }
    return product
  }, [product, selectedSkuId])

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
    setSelectedSkuId(String(variant.id))
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

  // TODO add cycling through images when multiple images are available
  // TODO render SKU dropdown for non-Shopify setups

  return (
    <dialog className={styles.modal} aria-labelledby="modal-title" ref={dialogRef} onClick={handleOnClick}>
      <Button className={styles.close} onClick={onClose}>
        <Icon name="close" circle />
      </Button>
      <div className={styles.content}>
        <div className={styles.columns}>
          <div className={styles.leftColumn}>
            {data.imageUrl && <ProductImage src={data.imageUrl} alt={product.name} className={styles.image} />}
          </div>
          <div className={styles.rightColumn}>
            <Heading>{product.name}</Heading>
            <div aria-label="Price">
              <span>{data.priceText}</span>
              {product.listPrice && product.price && product.listPrice > product.price && (
                <span className={styles.specialPrice}>{data.listPriceText}</span>
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
