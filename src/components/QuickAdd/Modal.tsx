/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCallback, useEffect, useMemo, useRef, useState } from "preact/hooks"
import type { Product } from "@/types"
import Button from "@/elements/Button/Button"
import Icon from "@/elements/Icon/Icon"
import Heading from "@/elements/Heading/Heading"
import ProductImage from "../Product/ProductImage"
import SimpleSelector from "./SimpleSelector"

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

  const handleSkuChange = useCallback((skuId: string) => {
    setSelectedSkuId(skuId)
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
      className={
        "fixed left-1/2 top-1/2 m-0 hidden max-h-[90vh] w-[90%] max-w-[800px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-none border-0 bg-white p-0 transition-opacity duration-[5s] ease-[ease] open:flex open:animate-fade-in backdrop:open:animate-fade-in backdrop:open:bg-black/50"
      }
      aria-labelledby="modal-title"
      ref={dialogRef}
      onClick={handleOnClick}
      onCancel={onClose}
    >
      <Button className={"absolute right-1 top-1"} onClick={onClose}>
        <Icon name="close" circle />
      </Button>
      <div className={"flex-1 overflow-y-auto p-4"}>
        <div className={"grid grid-cols-2 gap-4 max-[800px]:grid-cols-[1fr_2fr]"}>
          <div className={"flex-[0_0_auto]"}>
            <ProductImage src={data.imageUrl!} alt={product.name} className={"block h-auto w-full rounded"} />
          </div>
          <div className={"flex flex-1 flex-col gap-4"}>
            <Heading>{product.name}</Heading>
            <div aria-label="Price">
              <span>{data.priceText}</span>
              {product.listPrice && product.price && product.listPrice > product.price && (
                <span className={"ml-[var(--ns-space-2)] line-through"}>{data.listPriceText}</span>
              )}
            </div>
            {hasMultipleSkus ? (
              <SimpleSelector product={product} skuId={selectedSkuId} onChange={handleSkuChange} />
            ) : null}
            <div className={"max-[800px]:hidden"}>{product.description}</div>
            <button
              className={
                "cursor-pointer rounded-[6px] border-0 bg-[var(--ns-color-black)] px-6 py-3 font-semibold text-white transition-colors duration-200 hover:enabled:bg-[var(--ns-color-grey-dark)] disabled:cursor-not-allowed disabled:bg-[#d1d5db]"
              }
              onClick={handleAddToCart}
              disabled={!selectedSkuId}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}
