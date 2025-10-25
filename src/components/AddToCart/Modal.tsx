import { useCallback, useState } from "preact/hooks"
import type { Product } from "@/types"
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

  return (
    <dialog className={styles.modal} aria-labelledby="modal-title">
      <div className={styles.content}>
        <div className={styles.columns}>
          <div className={styles.leftColumn}>
            {product.imageUrl && <img src={product.imageUrl} alt={product.name} className={styles.image} />}
          </div>
          <div className={styles.rightColumn}>
            <h2 id="modal-title" className={styles.title}>
              {product.name}
            </h2>
            <button onClick={onClose} aria-label="Close modal">
              ×
            </button>
            <div className={styles.variantSection}>
              <VariantSelector handle={product.handle!} onVariantChange={handleVariantChange} />
            </div>
            <button className={styles.addToCartButton} onClick={handleAddToCart} disabled={!selectedSkuId}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}
