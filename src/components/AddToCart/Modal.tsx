import { useCallback, useState, useEffect } from "preact/hooks"
import type { Product } from "@/types"
import Portal from "@/elements/Portal/Portal"
import VariantSelector from "@/elements/VariantSelector/VariantSelector"
import styles from "./Modal.module.css"

type Props = {
  product: Product
  onClose: () => void
  onAddToCart: (skuId: string) => void
}

export default function Modal({ product, onClose, onAddToCart }: Props) {
  const [selectedSkuId, setSelectedSkuId] = useState<string>("")

  const handleVariantChange = useCallback((variant: { id: string }) => {
    setSelectedSkuId(variant.id)
  }, [])

  const handleAddToCart = useCallback(() => {
    if (selectedSkuId) {
      onAddToCart(selectedSkuId)
    }
  }, [selectedSkuId, onAddToCart])



  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    },
    [onClose]
  )



  return (
    <Portal target="#modal-root">
      <div
        className={styles.backdrop}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose()
          }
        }}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        data-testid="modal-backdrop"
      >
        <div className={styles.modal} role="dialog" aria-labelledby="modal-title">
          <div className={styles.header}>
            <h2 id="modal-title" className={styles.title}>
              {product.name}
            </h2>
            <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
              ×
            </button>
          </div>

          <div className={styles.content}>
            <div className={styles.columns}>
              <div className={styles.leftColumn}>
                {product.imageUrl && <img src={product.imageUrl} alt={product.name} className={styles.image} />}
              </div>
              <div className={styles.rightColumn}>
                <div className={styles.variantSection}>
                  <VariantSelector
                    handle={product.handle!}
                    preselect={true}
                    onVariantChange={handleVariantChange}
                  />
                </div>
                <button className={styles.addToCartButton} onClick={handleAddToCart} disabled={!selectedSkuId}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}
