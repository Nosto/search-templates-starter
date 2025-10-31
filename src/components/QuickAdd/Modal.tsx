/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCallback, useEffect, useMemo, useRef, useState } from "preact/hooks"
import type { Product } from "@/types"
import styles from "./Modal.module.css"
import Button from "@/elements/Button/Button"
import Icon from "@/elements/Icon/Icon"
import Heading from "@/elements/Heading/Heading"
import ProductImage from "../Product/ProductImage"
import SimpleSelector from "./SimpleSelector"
import VariantSelector from "@/elements/VariantSelector/VariantSelector"
import { shopifyMode } from "@/config"
import { getProductImageTransitionName } from "@/utils/viewTransition"

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
  const hasMultipleSkus = !!product.skus?.length
  // shopify variant selector based on Product API option data
  const renderShopifySelector = shopifyMode && hasMultipleSkus
  // simple generic variant selector for non-shopify mode
  const renderSimpleSelector = !shopifyMode && hasMultipleSkus
  const viewTransitionName = getProductImageTransitionName(product.productId)

  const data = useMemo(() => {
    if (selectedSkuId) {
      const sku = product.skus?.find(sku => sku.id === selectedSkuId)
      return {
        imageUrl: sku?.imageUrl || product.imageUrl,
        priceText: sku?.priceText || product.priceText,
        // listPriceText property may not exist on all SKU types
        // @ts-expect-error - listPriceText is not in the type definition but may be present at runtime
        listPriceText: sku?.listPriceText || product.listPriceText
      }
    }
    return product
  }, [product, selectedSkuId])

  useEffect(() => {
    if (dialogRef.current?.open && !show) {
      dialogRef.current?.close()
    } else if (!dialogRef.current?.open && show) {
      dialogRef.current?.showModal()
    }
  }, [show])

  const handleVariantChange = useCallback((variant: { id: number }) => {
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

  return (
    <dialog
      className={styles.modal}
      aria-labelledby="modal-title"
      ref={dialogRef}
      onClick={handleOnClick}
      onCancel={onClose}
    >
      <Button className={styles.close} onClick={onClose}>
        <Icon name="close" circle />
      </Button>
      <div className={styles.content}>
        <div className={styles.columns}>
          <div className={styles.leftColumn}>
            <ProductImage
              src={data.imageUrl!}
              alt={product.name}
              className={styles.image}
              style={viewTransitionName ? { viewTransitionName } : undefined}
            />
          </div>
          <div className={styles.rightColumn}>
            <Heading>{product.name}</Heading>
            <div aria-label="Price">
              <span>{data.priceText}</span>
              {product.listPrice && product.price && product.listPrice > product.price && (
                <span className={styles.listPrice}>{data.listPriceText}</span>
              )}
            </div>
            {renderShopifySelector ? (
              <VariantSelector
                handle={product.handle!}
                onVariantChange={handleVariantChange}
                className={styles.swatches}
                preselect
                filtered
              />
            ) : null}
            {renderSimpleSelector ? (
              <SimpleSelector product={product} skuId={selectedSkuId} onChange={skuId => setSelectedSkuId(skuId)} />
            ) : null}
            <div className={styles.description}>{product.description}</div>
            <button className={styles.addToCartButton} onClick={handleAddToCart} disabled={!selectedSkuId}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}
