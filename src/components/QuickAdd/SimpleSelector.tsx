/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Product } from "@/types"
import styles from "./SimpleSelector.module.css"
import { cl } from "@nosto/search-js/utils"

type Props = {
  product: Product
  skuId: string | undefined
  onChange: (skuId: string) => void
}

export default function SimpleSelector({ product, skuId, onChange }: Props) {
  return (
    <div className={styles.simpleSelector}>
      {product.skus?.map(sku => (
        <label
          key={sku.id}
          className={cl(styles.simpleOption, skuId === sku.id && styles.active)}
          onClick={() => onChange(sku.id!)}
        >
          {sku.name}
        </label>
      ))}
    </div>
  )
}
