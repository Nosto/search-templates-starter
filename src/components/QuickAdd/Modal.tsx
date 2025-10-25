import { useCallback, useEffect, useRef, useState } from "preact/hooks"
import type { Product } from "@/types"
import VariantSelector from "@/elements/VariantSelector/VariantSelector"
import styles from "./Modal.module.css"
import Button from "@/elements/Button/Button"
import Icon from "@/elements/Icon/Icon"

type Props = {
  product: Product
  show: boolean
  onClose: (e: Event) => void
  onAddToCart: (skuId: string) => void
}

export default function Modal({ product, show, onClose, onAddToCart }: Props) {
  const [selectedSkuId, setSelectedSkuId] = useState<string>("")
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (show) {
      dialog?.showModal()
    } else {
      dialog?.close()
    }
  }, [show])

  const handleVariantChange = useCallback((variant: { id: string }) => {
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

  // TODO add dialog level click handler to close on backdrop click

  return (
    <dialog className={styles.modal} aria-labelledby="modal-title" ref={dialogRef}>
      <Button className={styles.close} onClick={onClose}>
        <Icon name="close" circle />
      </Button>
      <div className={styles.content}>
        <div className={styles.columns}>
          <div className={styles.leftColumn}>
            {product.imageUrl && <img src={product.imageUrl} alt={product.name} className={styles.image} />}
          </div>
          <div className={styles.rightColumn}>
            <h2 id="modal-title" className={styles.title}>
              {product.name}
            </h2>
            <div className={styles.variantSection}>
              <VariantSelector handle={product.handle!} onVariantChange={handleVariantChange} />
            </div>
            TODO render price here
            <button className={styles.addToCartButton} onClick={handleAddToCart} disabled={!selectedSkuId}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}
