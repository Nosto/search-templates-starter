import { useCallback, useMemo, useState } from "preact/hooks"
import styles from "./Swatches.module.css"
import VariantSelector, { Variant } from "@/elements/VariantSelector/VariantSelector"
import AddToCart from "@/elements/AddToCart/AddToCart"
import { useConfig } from "@nosto/search-js/preact/common"
import { Product } from "@/types"

type Props = {
  product: Product
  onVariantChange?: (variant: Variant) => void
}

export default function Swatches({ product, onVariantChange }: Props) {
  const { pageType } = useConfig()
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)

  const handleVariantChange = useCallback(
    (variant: Variant) => {
      setSelectedVariant(variant)
      onVariantChange?.(variant)
    },
    [setSelectedVariant, onVariantChange]
  )

  const hit = useMemo(() => {
    return {
      productId: product.productId!,
      url: product.url,
      skuId: selectedVariant ? String(selectedVariant.id) : ""
    }
  }, [product, selectedVariant])

  return (
    <VariantSelector
      handle={product.handle!}
      className={styles.swatches}
      preselect
      onVariantChange={handleVariantChange}
    >
      {selectedVariant ? (
        <AddToCart hit={hit} type={pageType === "search" ? "serp" : pageType}>
          Add to Cart
        </AddToCart>
      ) : null}
    </VariantSelector>
  )
}
