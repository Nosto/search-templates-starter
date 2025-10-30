/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCallback, useEffect, useMemo, useRef, useState } from "preact/hooks"
import type { Product } from "@/types"
import Button from "@/elements/Button/Button"
import Icon from "@/elements/Icon/Icon"
import Heading from "@/elements/Heading/Heading"
import ProductImage from "../Product/ProductImage"
import SimpleSelector from "./SimpleSelector"
import VariantSelector from "@/elements/VariantSelector/VariantSelector"
import { shopifyMode } from "@/config"

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
      className="hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-none rounded-none max-w-[800px] w-[90%] max-h-[90vh] overflow-hidden flex-col p-0 m-0 transition-opacity duration-[5s] open:flex open:animate-[fadein_0.3s_ease_forwards] open:backdrop:bg-[rgb(0_0_0/50%)] open:backdrop:animate-[fadein_0.3s_ease_forwards]"
      aria-labelledby="modal-title"
      ref={dialogRef}
      onClick={handleOnClick}
      onCancel={onClose}
    >
      <Button className="absolute top-[4px] right-[4px]" onClick={onClose}>
        <Icon name="close" circle />
      </Button>
      <div className="p-[1rem] overflow-y-auto flex-1">
        <div className="grid grid-cols-2 gap-[1rem] max-[800px]:grid-cols-[1fr_2fr] max-[800px]:[&_.description]:hidden">
          <div className="flex-[0_0_auto]">
            <ProductImage src={data.imageUrl!} alt={product.name} className="w-full h-auto rounded-[4px] block" />
          </div>
          <div className="flex-1 flex flex-col gap-[1rem]">
            <Heading>{product.name}</Heading>
            <div aria-label="Price">
              <span>{data.priceText}</span>
              {product.listPrice && product.price && product.listPrice > product.price && (
                <span className="line-through ml-ns-2">{data.listPriceText}</span>
              )}
            </div>
            {renderShopifySelector ? (
              <VariantSelector
                handle={product.handle!}
                onVariantChange={handleVariantChange}
                className="[--value-active-bg:var(--ns-color-black)] [--value-active-border:var(--ns-color-black)] [--value-padding:var(--ns-space-2)]"
                preselect
                filtered
              />
            ) : null}
            {renderSimpleSelector ? (
              <SimpleSelector product={product} skuId={selectedSkuId} onChange={skuId => setSelectedSkuId(skuId)} />
            ) : null}
            <div className="description">{product.description}</div>
            <button className="bg-ns-black text-white border-none py-[0.75rem] px-[1.5rem] rounded-[6px] font-semibold cursor-pointer transition-[background-color_0.2s] hover:bg-ns-grey-dark disabled:bg-[#d1d5db] disabled:cursor-not-allowed" onClick={handleAddToCart} disabled={!selectedSkuId}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadein {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </dialog>
  )
}
