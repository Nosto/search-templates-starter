import { useCallback, useState, useRef, useEffect } from "preact/hooks"
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
  const variantSelectorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleVariantChange = (event: CustomEvent) => {
      const { variant } = event.detail
      if (variant?.id) {
        setSelectedSkuId(variant.id)
      }
    }

    const selectorElement = variantSelectorRef.current?.querySelector("nosto-variant-selector")
    if (selectorElement) {
      selectorElement.addEventListener("variantchange", handleVariantChange as EventListener)
      return () => {
        selectorElement.removeEventListener("variantchange", handleVariantChange as EventListener)
      }
    }
  }, [])

  const handleAddToCart = useCallback(() => {
    if (selectedSkuId) {
      onAddToCart(selectedSkuId)
    }
  }, [selectedSkuId, onAddToCart])

  const handleBackdropClick = useCallback(
    (e: Event) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    },
    [onClose]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    },
    [onClose]
  )

  // Create target element for portal if it doesn't exist
  useEffect(() => {
    if (!document.querySelector("#modal-root")) {
      const modalRoot = document.createElement("div")
      modalRoot.id = "modal-root"
      document.body.appendChild(modalRoot)
    }
  }, [])

  return (
    <Portal target="#modal-root">
      <div
        className={styles.backdrop}
        onClick={handleBackdropClick}
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
                <div className={styles.variantSection} ref={variantSelectorRef}>
                  {product.handle || product.productId ? (
                    <VariantSelector handle={product.handle || product.productId} preselect={true} />
                  ) : (
                    <div role="alert" style={{ color: "red", padding: "1em" }}>
                      Unable to display product options. Product identifier is missing.
                    </div>
                  )}
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
